import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }

  private reviewAdd: string = (environment.baseURL) ? `${environment.baseURL}api/addreview` : 'api/addreview';
  private reviewsGet: string = (environment.baseURL) ? `${environment.baseURL}api/getreview` : 'api/getreview';
  private reviewsDelete: string = (environment.baseURL) ? `${environment.baseURL}api/deleteReview` : 'api/deleteReview';

  constructor(private httpClient: HttpClient) { }

  public addReview = (model): Observable<any> => {
    return this.httpClient.post<any>(this.reviewAdd, model).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public getReviews = (hotelId: string): Observable<any> => {
    return this.httpClient.get<any>(`${this.reviewsGet}/${hotelId}`).pipe(
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
}
