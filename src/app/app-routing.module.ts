import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AdminPanalComponent } from './components/admin-panal/admin-panal.component';
import { MyordersComponent } from './pages/myorders/myorders.component';
import { AdminGuard } from '../app/guard/admin.guard'; // استيراد الـ Guard
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // الصفحة الرئيسية
  { path: 'login', component: LoginComponent }, // صفحة اللوجن
  { path: 'profile', component: ProfileComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'myorders', component: MyordersComponent },
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
  { path: 'products', component: ProductsPageComponent },

  { path: 'products/:id', component: ProductDetailsComponent },

  {
    path: 'vendor',
    loadChildren: () =>
      import('./vendor/vendor.module').then((m) => m.VendorModule),
  },

  { path: 'products', component: ProductsPageComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
