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

// ===== Admin Layout =====
import { AdminPanalComponent } from './pages/admin-panal/admin-panal.component';

// ===== Admin Pages =====
import { DashboardComponent } from './pages/admin-panal/pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/admin-panal/pages/users/users.component';
import { ProductsComponent } from './pages/admin-panal/pages/products/products.component';
import { OrdersComponent } from './pages/admin-panal/pages/orders/orders.component';

// ===== Guards =====
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guard/admin.guard';

const routes: Routes = [
  // ===== Public =====
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  { path: 'products', component: ProductsPageComponent },
  { path: 'products/:id', component: ProductDetailsComponent },

  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'myorders', component: MyordersComponent, canActivate: [AuthGuard] },
  { path: 'payment-result', component: PaymentResultComponent },

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
