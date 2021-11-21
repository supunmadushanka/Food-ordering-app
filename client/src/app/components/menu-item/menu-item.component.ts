import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuService } from '../../services/menu.service'
import { FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { HotelService } from '../../services/hotel.service'
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() public hotel;

  @Output() addToMyCartEvent = new EventEmitter();

  constructor(private _hotelService: HotelService,private _menuService : MenuService,private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  addToMyCart = (menu) => {
    this.addToMyCartEvent.emit(menu);
  }

  ngOnInit(): void {
  }

  deleteItem(id){
    this._menuService.deleteMenu(id,this._hotelService.getHotelId())
      .subscribe(
        response => {
          console.log('success', response);
          window.location.reload();
        },
        error => {
          console.error('error', error)
        }
      )
  }

}
