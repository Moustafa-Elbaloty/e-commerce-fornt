import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ===== Public Pages =====
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

  { path: 'products', component: ProductsPageComponent },
  { path: 'products/:id', component: ProductDetailsComponent },

  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'myorders', component: MyordersComponent },
  { path: 'payment-result', component: PaymentResultComponent },

  {
    path: 'adminPanal',
    component: AdminPanalComponent,
    canActivate: [AdminGuard], // إضافة الحماية
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },

  // ===== Admin Panel =====
  {
    path: 'adminPanal',
    component: AdminPanalComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // ===== Vendor =====
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
