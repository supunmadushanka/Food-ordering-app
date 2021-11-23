import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }

  private driverAdd: string = (environment.baseURL) ? `${environment.baseURL}api/addriver` : 'api/addriver';
  private driverGet: string = (environment.baseURL) ? `${environment.baseURL}api/getdrivers` : 'api/getdrivers';
  private driverDelete: string = (environment.baseURL) ? `${environment.baseURL}api/deletedriver` : 'api/deletedriver';

  constructor(private httpClient: HttpClient) { }

  public addDriver = (model): Observable<any> => {
    return this.httpClient.post<any>(this.driverAdd, model).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public getDrivers = (): Observable<any> => {
    return this.httpClient.get<any>(this.driverGet).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public deleteDriver = (driverId): Observable<any> => {
    return this.httpClient.delete<any>(`${this.driverDelete}/${driverId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }
}
