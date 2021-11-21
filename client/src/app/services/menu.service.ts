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

  constructor(private httpClient: HttpClient) { }

  public addMenu = (model): Observable<any> => {
    return this.httpClient.post<any>(this.menuAdd, model).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public deleteMenu = (menuId): Observable<any> => {
    return this.httpClient.delete<any>(`${this.menuDelete}/${menuId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public updateMenu = (menuId,formData): Observable<any> => {
    return this.httpClient.put<any>(`${this.menuUpdate}/${menuId}`,formData).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
}
