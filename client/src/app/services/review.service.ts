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

  constructor(private httpClient: HttpClient) { }

  public addReview = (model): Observable<any> => {
    return this.httpClient.post<any>(this.reviewAdd, model).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
}
