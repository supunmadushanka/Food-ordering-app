import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, Validators ,FormGroup} from '@angular/forms'
import { Router,ActivatedRoute } from '@angular/router'
import {HotelService} from '../../../services/hotel.service'

@Component({
  selector: 'app-update-hotel-card',
  templateUrl: './update-hotel-card.component.html',
  styleUrls: ['./update-hotel-card.component.scss']
})
export class UpdateHotelCardComponent implements OnInit {

  hotelId
  images
  public hotel : any = [];
  name :string
  address :string
  cuisines : string

  constructor(private fb: FormBuilder,private router: Router, private route : ActivatedRoute,private _hotelservice : HotelService) { }

  ngOnInit(): void {
    this.hotelId=this._hotelservice.getHotelId();
    this._hotelservice.getHotelById(this.hotelId)
      .subscribe((data) => {
        this.hotel = data;
        this.name = data.name;
        this.address = data.address;
        this.cuisines = data.cuisines;
      },
        error => {
          console.error('error', error)
        }
      )
  }

  updateHotel = this.fb.group({
    name: [''],
    address: [''],
    cuisines: ['']
  })

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }


  imageSubmit(hotelId){
    const formData = new FormData();
    formData.append('file', this.images);

    this._hotelservice.updateImage(formData,hotelId)
    .subscribe(
      response=>{
        console.log('Success!', response);
        this.router.navigate(['/hotels']);
      },
      error=>{
        console.error('Error!', error)
      }
    )

  }

  itemsubmit(){
    this.hotelId=this._hotelservice.getHotelId();
    this.imageSubmit(this.hotelId);
    this._hotelservice.updateHotel(this.hotelId,this.updateHotel.value)
    .subscribe(
      response=>{
        console.log('Success!', response);
        this.router.navigate(['/hotels']);
      },
      error=>{
        console.error('Error!', error)
      }
    )
  }

}
