import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class VendorGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user?.role === 'vendor') {
      return true;
    }

    // لو مش Vendor نرجعه للـ login
    this.router.navigate(['/login']);
    return false;
  }
}
