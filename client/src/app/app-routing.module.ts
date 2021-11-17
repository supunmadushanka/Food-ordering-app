import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { AddItemComponent } from './components/add-item/add-item.component';
import { UpdateHotelCardComponent } from './components/hotel-card/update-hotel-card/update-hotel-card.component';

const routes: Routes = [
  { path:'', redirectTo: '/login', pathMatch: 'full'},
  { path:'register', component: RegisterComponent },
  { path:'login', component: LoginComponent },
  { path:'additem', component: AddItemComponent },
  { path:'updatehotelcard', component: UpdateHotelCardComponent },
  { path: 'hotels', component: HotelsComponent, canActivate: [AuthGuard] },
  { path: 'hotels/:id', component: HotelComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
