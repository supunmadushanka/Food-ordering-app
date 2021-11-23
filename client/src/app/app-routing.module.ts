import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { AddItemComponent } from './components/add-item/add-item.component';
import { UpdateHotelCardComponent } from './components/hotel-card/update-hotel-card/update-hotel-card.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AddHotelComponent } from './components/hotels/add-hotel/add-hotel.component';
import { UpdateItemComponent } from './components/menu-item/update-item/update-item.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DriverComponent } from './components/driver/driver.component';

const routes: Routes = [
  { path:'', redirectTo: '/login', pathMatch: 'full'},
  { path:'register', component: RegisterComponent },
  { path:'login', component: LoginComponent },
  { path:'additem', component: AddItemComponent },
  { path:'forgetpw', component: ForgotPasswordComponent },
  { path:'review', component: ReviewsComponent },
  { path:'addhotel', component: AddHotelComponent },
  { path:'profile', component: ProfileComponent },
  { path:'driver', component: DriverComponent },
  { path:'updateitem/:id', component: UpdateItemComponent },
  { path:'updatehotelcard', component: UpdateHotelCardComponent },
  { path: 'hotels', component: HotelsComponent, canActivate: [AuthGuard] },
  { path: 'hotels/:id', component: HotelComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
