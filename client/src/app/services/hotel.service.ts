import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { IHotel } from '../models/hotel';
import { catchError } from 'rxjs/operators';
import { ICartItem } from '../models/cart-item';
import { environment } from 'src/environments/environment';
import { IOrder } from '../models/order';
//import {  } from '../../../../server/uploads';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private url: string = (environment.baseURL) ? `${environment.baseURL}api/hotels` : 'api/hotels';
  private urlhotel: string = (environment.baseURL) ? `${environment.baseURL}api/hotel` : 'api/hotel';
  private orderURL: string = (environment.baseURL) ? `${environment.baseURL}api/order` : 'api/order';
  private cartSave: string = (environment.baseURL) ? `${environment.baseURL}api/savecart` : 'api/savecart';
  private cartDelete : string = (environment.baseURL) ? `${environment.baseURL}api/deletecart` : 'api/deletecart';
  private cartGet: string = (environment.baseURL) ? `${environment.baseURL}api/getcart` : 'api/getcart';
  private itemURL: string = (environment.baseURL) ? `${environment.baseURL}api/addItem` : 'api/addItem';
  private hotelDelete: string = (environment.baseURL) ? `${environment.baseURL}api/deleteHotel` : 'api/deleteHotel';
  private hotelUpdate: string = (environment.baseURL) ? `${environment.baseURL}api/updateHotel` : 'api/updateHotel';
  private hotelAdd: string = (environment.baseURL) ? `${environment.baseURL}api/addHotel` : 'api/addHotel';
  private imageUpdate: string = (environment.baseURL) ? `${environment.baseURL}api/updateImage` : 'api/updateImage';
  private orderDelete: string = (environment.baseURL) ? `${environment.baseURL}api/orderDelete` : 'api/orderDelete';

  public hasUserName = false;
  public userName = '';
  public email = '';
  public userId = '';
  public cartItems = [];
  public orderHistory = [];
  public _id;
  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }

  orderHistoryChange: Subject<any> = new Subject<any>();

  userNameChange: Subject<string> = new Subject<string>();

  emailChange: Subject<string> = new Subject<string>();

  userIdChange: Subject<string> = new Subject<string>();

  cartItemsChange: Subject<ICartItem[]> = new Subject<ICartItem[]>();

  constructor(private httpClient: HttpClient) {
    this.cartItemsChange.subscribe((value: ICartItem[]) => {
      this.cartItems.push(value);
    });
    this.userNameChange.subscribe((name) => {
      this.userName = name;
    });
    this.emailChange.subscribe((email) => {
      this.email = email;
    });
    this.userIdChange.subscribe((userId) => {
      this.userId = userId;
    });
    this.orderHistoryChange.subscribe((orderHist) => {
      this.orderHistory = orderHist;
    })
  }

  public getHotels = (): Observable<IHotel[]> => {
    return this.httpClient.get<IHotel[]>(this.url).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public getHotel = (hotelId: string): Observable<IHotel> => {
    console.log(hotelId)
    return this.httpClient.get<IHotel>(`${this.url}/${hotelId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public getHotelById = (hotelId: string): Observable<IHotel> => {
    console.log(hotelId)
    return this.httpClient.get<IHotel>(`${this.urlhotel}/${hotelId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public addItem = (item, hotelId): Observable<any> => {
    return this.httpClient.post<any>(`${this.itemURL}/${hotelId}`, item).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public deleteHotel = (hotelId): Observable<any> => {
    return this.httpClient.delete<any>(`${this.hotelDelete}/${hotelId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public deleteOrder = (orderId,userId): Observable<any> => {
    return this.httpClient.delete<any>(`${this.orderDelete}/${userId}/${orderId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public updateHotel = (hotelId,formData): Observable<any> => {
    return this.httpClient.put<any>(`${this.hotelUpdate}/${hotelId}`,formData).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public updateImage = (updateHotel,hotelId): Observable<any> => {
    return this.httpClient.put<any>(`${this.imageUpdate}/${hotelId}`,updateHotel).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public addHotel = (model): Observable<any> => {
    return this.httpClient.post<any>(this.hotelAdd, model).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public saveOrder = (orders, userId): Observable<any> => {
    this.clearAllCartItems();
    return this.httpClient.post<any>(`${this.orderURL}/${userId}`, orders).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public saveCart = (orders, userId): Observable<any> => {
    this.clearAllCartItems();
    return this.httpClient.post<any>(`${this.cartSave}/${userId}`, orders).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public getOrders = (userId): Observable<IOrder[]> => {
    return this.httpClient.get<IOrder[]>(`${this.orderURL}/${userId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public getCart = (userId): Observable<any> => {
    return this.httpClient.get<any>(`${this.cartGet}/${userId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public deleteCart = (userId): Observable<any> => {
    return this.httpClient.delete<any>(`${this.cartDelete}/${userId}`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public setHotelId(_id){
    localStorage.setItem('hotel_id', _id);
  }

  public getHotelId(){
    return localStorage.getItem('hotel_id');
  }

  public getUserId(){
    return localStorage.getItem('order-my-food-userId');
  }

  public setUserName = (name) => {
    this.userNameChange.next(name);
  }

  public setEmail = (email) => {
    this.emailChange.next(email);
  }

  public setUserId = (userId) => {
    this.userIdChange.next(userId);
  }

  public setCartItem = (item) => {
    this.cartItemsChange.next(item);
  }

  public setOrderHistory = (orderHist) => {
    this.orderHistoryChange.next(orderHist)
  }
  public setCartSaved = (cart) => {
    this.cartItemsChange.next(cart)
  }

  public removeCartItem = (item) => {
    this.cartItems = this.cartItems.filter((menu) => menu.id != item.id);
  }

  public clearAllCartItems = () => {
    this.cartItems = [];
  }

}
