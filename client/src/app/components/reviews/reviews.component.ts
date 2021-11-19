import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service'
import { UserService } from '../../services/user.service'
import { ReviewService } from '../../services/review.service'
import { FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

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
    review: ['', [Validators.required]],
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
          console.log('success', response)
        },
        error => {
          console.error('error', error)
        }
      )
  }


}
