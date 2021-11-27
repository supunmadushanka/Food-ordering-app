import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service'
import { UserService } from '../../services/user.service'
import { ReviewService } from '../../services/review.service'
import { FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  userId
  hotelId
  username: any
  public user = [];
  public reviews = [];
  updatedReview
  reviewId
  review

  customError = (statusText, statusMessage) => {
    return {
      statusText: statusText,
      message: statusMessage
    }
  }

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private _hotelService: HotelService
    , private _userService: UserService, private _reviewService: ReviewService) { }

  ngOnInit(): void {
    this.userId = this._hotelService.getUserId();
    this.hotelId = this._hotelService.getHotelId();

    this._userService.getUser(this._hotelService.getUserId())
      .subscribe((data) => {
        this.user = data;
        this.username = data.username;
      },
        error => {
          console.error('error', error)
        }
      )

    this._reviewService.getReviews(this._hotelService.getHotelId())
      .subscribe((data) => {
        this.reviews = data;
        console.log(data)
      },
        error => {
          console.error('error', error)
        }
      )

  }

  addReview = this.fb.group({
    review: [''],
    hotelId: ['', [Validators.required]],
    userId: ['', [Validators.required,]],
    userName: ['', [Validators.required]],
  })

  reviewsubmit() {
    this.addReview.value.userId = this.userId;
    this.addReview.value.userName = this.username;
    this.addReview.value.hotelId = this.hotelId;

    this._reviewService.addReview(this.addReview.value)
      .subscribe(
        response => {
          console.log('success', response);
          this.addReview.reset();
          this.ngOnInit();
        },
        error => {
          console.error('error', error)
        }
      )
  }

  reviewDelete(reviewId) {
    this._reviewService.deleteReview(reviewId)
      .subscribe(
        response => {
          console.log('success', response);
          this.ngOnInit();
        },
        error => {
          console.error('error', error)
        }
      )
  }

  whenClick(reviewId,review) {
    this.reviewId = reviewId;
    this.review = review;
    this.openLoginModal();
  }

  openLoginModal = async () => {
    await Swal.fire({
      title: 'Update the review',
      html:
        '<input id="review" type="text" class="swal2-input" value="'+this.review+'">',
      focusConfirm: false,
      confirmButtonColor: '#1838c5',
      allowOutsideClick: true,
      allowEscapeKey: true,
      preConfirm: () => {
        this.updatedReview = {
          review: (document.getElementById('review') as HTMLInputElement).value
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.close();
        this._reviewService.updateReview(this.reviewId,this.updatedReview).subscribe(
          (res) => {
            console.log('success',res)
            this.ngOnInit();
          },
          error=>{
            console.error('error',error)
          }
        )

      }
    })
  }
}