import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router,ActivatedRoute } from '@angular/router'
import {HotelService} from '../../../services/hotel.service'
import {MenuService} from '../../../services/menu.service'

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {

  hotelId;
  itemId

  constructor(private _menuService : MenuService,private fb: FormBuilder,private router: Router, private route : ActivatedRoute,private _hotelservice : HotelService) { }

  ngOnInit(): void {
    this.hotelId=this._hotelservice.getHotelId();
    this.itemId=this.route.snapshot.paramMap.get("id");
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
      },
      error=>{
        console.error('Error!', error)
      }
    )
  }

}
