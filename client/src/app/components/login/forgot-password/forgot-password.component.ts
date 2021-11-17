import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router,ActivatedRoute } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private _authService: AuthService,private fb: FormBuilder,private router: Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
  }

  changeEmail = this.fb.group({
    email: ['', [Validators.required,Validators.email]],
    password : ['']
  })

  customError = (statusText, statusMessage) => {
    return {
      statusText: statusText,
      message: statusMessage
    }
  }

  getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  changePassword(){
    this.changeEmail.value.password = this.getRandomString(10);
    this._authService.passwordChange(this.changeEmail.value)
    .subscribe(
      responce=>{
        console.log('success',responce);
        this.redirectToHomePage();
      },
      error=>{
        console.error('error',error)
        const err = this.customError("Email doesn't exist!", "Please enter valid email");
        this.showError(err)
      }
    )
  }

  redirectToHomePage = () => {
    Swal.fire({
      icon: 'success',
      title: 'Successfully send',
      html: 'Redirecting to the login screen...',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    }).then((result) => {
      this.router.navigate(['/login']);
     })
  }

  showError = (error) => {
    Swal.fire({
      icon: 'error',
      title: error.statusText,
      text: error.message,
      showConfirmButton: true,
      confirmButtonText: "Try Again",
      confirmButtonColor: '#9c27b0',
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
      }
    })
  }

}
