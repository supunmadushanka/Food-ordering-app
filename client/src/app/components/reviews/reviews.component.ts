import { Component, OnInit } from '@angular/core';
import {HotelService} from '../../services/hotel.service'

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  userId
  hotelId

  constructor(private _hotelService : HotelService) { }

  ngOnInit(): void {
    this.userId=this._hotelService.getUserId();
    this.hotelId=this._hotelService.getHotelId();
  }

}
