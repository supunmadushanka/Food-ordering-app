import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router,ActivatedRoute } from '@angular/router'
import {HotelService} from '../../services/hotel.service'

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  hotelId : string;

  constructor(private fb: FormBuilder,private router: Router, private route : ActivatedRoute,private _hotelservice : HotelService ) { }

  ngOnInit(): void {
    this.hotelId=this._hotelservice.getHotelId();
    alert(this.hotelId);
  }

  addItem = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    desc: ['', [Validators.required,]],
    price: ['', [Validators.required]],
  })

  randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  itemsubmit(){
    this.addItem.value.id = this.randomIntFromInterval(1, 1000);
    alert(this.addItem.value.id)
    this._hotelservice.addItem(this.addItem.value,this.hotelId)
    .subscribe(
      response=>{
        console.log('Success!', response);
        //this.router.navigate(['/']);
      },
      error=>{
        console.error('Error!', error)
      }
    )
  }

}
