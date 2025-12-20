import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Interceptor
import { AuthInterceptor } from './interceptors/auth.interceptor';

// Components (Layout)
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PromoComponent } from './components/promo/promo.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { MyordersComponent } from './pages/myorders/myorders.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { PaymentResultComponent } from './pages/payment-result/payment-result.component';

// Admin
import { AdminPanalComponent } from './components/admin-panal/admin-panal.component';

@NgModule({
  declarations: [
    AppComponent,

    // layout
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    CategoriesComponent,
    PromoComponent,

    // pages
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    CartComponent,
    CheckoutComponent,
    ChangePasswordComponent,
    ProductsPageComponent,
    MyordersComponent,
    ProductDetailsComponent,
    PaymentResultComponent,

    // admin
    AdminPanalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,      // ngIf, ngFor, pipes
    FormsModule,       // ngModel
    HttpClientModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
