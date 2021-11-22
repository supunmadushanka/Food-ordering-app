import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { ProfileService } from '../../services/profile.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user = [];
  username : string
  email :string

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _profileservice: ProfileService) { }

  ngOnInit(): void {
    this._profileservice.getUser(this._profileservice.getUserId())
      .subscribe((data) => {
        this.user = data;
        this.username = data.username
        this.email = data.email
      },
        error => {
          console.error('error', error)
        }
      )
  }

  profile = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]]
  })

  itemsubmit() {
    /*
    this._hotelservice.addItem(this.addItem.value,this.hotelId)
    .subscribe(
      response=>{
        console.log('Success!', response);
        //this.router.navigate(['/']);
      },
      error=>{
        console.error('Error!', error)
      }
    )*/
  }

}
