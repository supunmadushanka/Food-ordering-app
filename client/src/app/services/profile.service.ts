import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }

  private reviewAdd: string = (environment.baseURL) ? `${environment.baseURL}api/addreview` : 'api/addreview';
  private userGet: string = (environment.baseURL) ? `${environment.baseURL}api/getuser` : 'api/getuser';
  private reviewsDelete: string = (environment.baseURL) ? `${environment.baseURL}api/deleteReview` : 'api/deleteReview';
  private userUpdate: string = (environment.baseURL) ? `${environment.baseURL}api/updateUser` : 'api/updateUser';

  constructor(private httpClient: HttpClient) { }

  public addReview = (model): Observable<any> => {
    return this.httpClient.post<any>(this.reviewAdd, model).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public getUser = (userId: string): Observable<any> => {
    return this.httpClient.get<any>(`${this.userGet}/${userId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public deleteReview = (reviewId): Observable<any> => {
    return this.httpClient.delete<any>(`${this.reviewsDelete}/${reviewId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public updateUser = (userId,formData): Observable<any> => {
    return this.httpClient.put<any>(`${this.userUpdate}/${userId}`,formData).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public getUserId(){
    return localStorage.getItem('order-my-food-userId');
  }
}
