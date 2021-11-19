import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }

  private User: string = (environment.baseURL) ? `${environment.baseURL}api/getuser` : 'api/getuser';

  constructor(private httpClient: HttpClient) { }

  public getUser = (userId: string): Observable<any> => {
    return this.httpClient.get<any>(`${this.User}/${userId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
}
