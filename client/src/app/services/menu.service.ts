import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }

  private menuAdd: string = (environment.baseURL) ? `${environment.baseURL}api/addmenu` : 'api/addmenu';
  private menuDelete: string = (environment.baseURL) ? `${environment.baseURL}api/deleteMenu` : 'api/deleteMenu';
  private menuUpdate: string = (environment.baseURL) ? `${environment.baseURL}api/updateMenu` : 'api/updateMenu';
  private menuGet: string = (environment.baseURL) ? `${environment.baseURL}api/getmenu` : 'api/getmenu';

  constructor(private httpClient: HttpClient) { }

  public addMenu = (model): Observable<any> => {
    return this.httpClient.post<any>(this.menuAdd, model).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public getMenu = (menuId,hotelId): Observable<any> => {
    return this.httpClient.get<any>(`${this.menuGet}/${menuId}/${hotelId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public deleteMenu = (menuId,hotelId): Observable<any> => {
    return this.httpClient.delete<any>(`${this.menuDelete}/${menuId}/${hotelId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public updateMenu = (formData,itemId,hotelId): Observable<any> => {
    return this.httpClient.put<any>(`${this.menuUpdate}/${itemId}/${hotelId}`,formData).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
}