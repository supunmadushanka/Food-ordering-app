import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators ,FormGroup} from '@angular/forms'
import { Router,ActivatedRoute } from '@angular/router'
import {HotelService} from '../../../services/hotel.service'

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss']
})
export class AddHotelComponent implements OnInit {

  images

  constructor(private formBuilder: FormBuilder,private fb: FormBuilder,private router: Router, private route : ActivatedRoute,private _hotelservice : HotelService) { }

  ngOnInit(): void {
  }

  addHotel = this.fb.group({
    id: [''],
    name: ['',[Validators.required]],
    address: ['', [Validators.required]],
    cuisines: ['', [Validators.required]],
    rating: [''],
    reviews: ['']
  })

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  imageSubmit(hotelId){
    const formData = new FormData();
    formData.append('file', this.images);

    this._hotelservice.updateImage(formData,hotelId)
    .subscribe(
      response=>{
        console.log('Success!', response);
      },
      error=>{
        console.error('Error!', error)
      }
    )

  }

  hotelsubmit(){
    this.addHotel.value.rating = '4.0';
    this.addHotel.value.reviews = '500';
    this.addHotel.value.id = this.randomIntFromInterval(1, 100000);
    console.log(this.addHotel.value);
    this._hotelservice.addHotel(this.addHotel.value)
    .subscribe(
      response=>{
        console.log('Success!', response);
        this.addHotel.reset();
        this.imageSubmit(response._id);
        this.router.navigate(['/hotels']);
      },
      error=>{
        console.error('Error!', error)
      }
    )
  }

}
