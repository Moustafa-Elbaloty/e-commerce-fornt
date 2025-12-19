import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ مهم جدًا
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PromoComponent } from './components/promo/promo.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { MyordersComponent } from './pages/myorders/myorders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HeroComponent,
    ProductsComponent,
    CategoriesComponent,
    PromoComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    CartComponent,
    CheckoutComponent,
    ChangePasswordComponent,
    ProductsPageComponent, // ✅
    MyordersComponent      // ✅
  ],
  imports: [
    BrowserModule,
    CommonModule,   // ✅ يحل ngClass و number pipe
    AppRoutingModule,
    HttpClientModule,
    FormsModule     // ✅ يحل ngModel
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
