import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {HotelService} from '../../services/hotel.service'

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss']
})
export class HotelCardComponent implements OnInit {

  @Input() public hotelId;
  @Input() public Id;
  @Input() public hotelName;
  @Input() public hotelThumbnail;
  @Input() public hotelImage;
  @Input() public cuisines;
  @Input() public rating;
  @Input() public review;

  public math = Math;
  image

  constructor(private _hotelService : HotelService,private router: Router) { }

  ngOnInit(): void {
  }

  deleteHotel(){
    this._hotelService.deleteHotel(this.hotelId)
    .subscribe(
      response=>{
        console.log('Success!', response);
        window.location.reload();
      },
      error=>{
        console.error('Error!', error)
      }
    )
  }

  updateHotel(){
    this.router.navigate(['/updatehotelcard']);
    this._hotelService.setHotelId(this.hotelId);
  }

  goToHotel() {
    this.router.navigate(['/hotels', this.Id])
  }

}
