// import { CanActivateFn } from '@angular/router';

// export const adminGuard: CanActivateFn = (route, state) => {
//   return true;
// };
// guards/admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      // إعادة توجيه للـ home أو صفحة unauthorized
      alert('You do not have permission to access this page');
      return this.router.createUrlTree(['/']);
    }
  }
}