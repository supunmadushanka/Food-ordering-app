import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user = [];
  username: string
  email: string

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
    username: [''],
    email: ['']
  })

  itemsubmit() {
    this._profileservice.updateUser(this._profileservice.getUserId(), this.profile.value)
      .subscribe(
        response => {
          console.log('Success!', response);
          localStorage.setItem('order-my-food-username', this.profile.value.username);
          localStorage.setItem('order-my-food-email',this.profile.value.email);
          this.Success();
        },
        error => {
          console.error('Error!', error)
        }
      )
  }

  Success = () => {
    Swal.fire({
      icon: 'success',
      title: 'Updated successfully',
      html: 'Redirecting to the profile...',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      willOpen: () => {
      }
    }).then((result) => { })
  }

}
