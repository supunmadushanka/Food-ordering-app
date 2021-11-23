import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'ngx-avatar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AddItemComponent } from './components/add-item/add-item.component';
import { UpdateHotelCardComponent } from './components/hotel-card/update-hotel-card/update-hotel-card.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AddHotelComponent } from './components/hotels/add-hotel/add-hotel.component';
import { UpdateItemComponent } from './components/menu-item/update-item/update-item.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DriverComponent } from './components/driver/driver.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HotelsComponent,
    HotelCardComponent,
    HotelComponent,
    DropdownComponent,
    CartItemComponent,
    MenuItemComponent,
    SearchBarComponent,
    RegisterComponent,
    LoginComponent,
    AddItemComponent,
    UpdateHotelCardComponent,
    ForgotPasswordComponent,
    ReviewsComponent,
    AddHotelComponent,
    UpdateItemComponent,
    ProfileComponent,
    DriverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AvatarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatSidenavModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
