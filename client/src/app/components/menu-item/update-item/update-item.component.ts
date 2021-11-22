import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router,ActivatedRoute } from '@angular/router'
import {HotelService} from '../../../services/hotel.service'
import {MenuService} from '../../../services/menu.service'
import { Location } from '@angular/common'

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {

  hotelId;
  itemId
  public menu : [];
  name : string
  desc : string
  price : string

  constructor(private location: Location,private _menuService : MenuService,private fb: FormBuilder,private router: Router, private route : ActivatedRoute,private _hotelservice : HotelService) { }

  ngOnInit(): void {
    this.hotelId=this._hotelservice.getHotelId();
    this.itemId=this.route.snapshot.paramMap.get("id");

    this._menuService.getMenu(this.itemId,this.hotelId)
      .subscribe((data) => {
        this.menu = data;
        this.name = data.name;
        this.desc = data.desc;
        this.price = data.price;
      },
        error => {
          console.error('error', error)
        }
      )

  }

  addItem = this.fb.group({
    name: ['', [Validators.required]],
    desc: ['', [Validators.required,]],
    price: ['', [Validators.required]],
  })


  itemsubmit(){
    this._menuService.updateMenu(this.addItem.value,this.itemId,this.hotelId)
    .subscribe(
      response=>{
        console.log('Success!', response);
        this.location.back();
      },
      error=>{
        console.error('Error!', error)
      }
    )
  }

}