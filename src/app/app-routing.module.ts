import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ===== Pages =====
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { MyordersComponent } from './pages/myorders/myorders.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { PaymentResultComponent } from './pages/payment-result/payment-result.component';

const routes: Routes = [
  // ===== Public =====
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  // ===== Products =====
  { path: 'products', component: ProductsPageComponent },
  { path: 'products/:id', component: ProductDetailsComponent },

  // ===== User =====
  { path: 'profile', component: ProfileComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'myorders', component: MyordersComponent },
  { path: 'change-password', component: ChangePasswordComponent },

  // ===== Payment =====
  { path: 'payment-result', component: PaymentResultComponent },

  // ===== Vendor (Lazy Loading) =====
  {
    path: 'vendor',
    loadChildren: () =>
      import('./vendor/vendor.module').then((m) => m.VendorModule),
  },

  // ===== Fallback =====
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
