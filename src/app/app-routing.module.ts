import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AdminPanalComponent } from './components/admin-panal/admin-panal.component';
import { AdminGuard } from '../app/guard/admin.guard'; // استيراد الـ Guard


const routes: Routes = [
  { path: '', component: HomeComponent },      // الصفحة الرئيسية
  { path: 'login', component: LoginComponent } ,// صفحة اللوجن
  { path: 'profile', component: ProfileComponent },
  { path: 'cart', component: CartComponent },
  {path: 'checkout', component: CheckoutComponent}
  { 
    path: 'adminPanal', 
    component: AdminPanalComponent,
    canActivate: [AdminGuard] // إضافة الحماية
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
