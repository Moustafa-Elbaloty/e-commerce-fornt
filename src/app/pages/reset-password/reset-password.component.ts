import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  password = '';
  confirmPassword = '';
  loading = false;
  error: string | null = null;
  success: string | null = null;
  token!: string;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {
    this.token = this.route.snapshot.params['token'];
  }

submit() {
  this.error = null;
  this.success = null;

  if (this.password !== this.confirmPassword) {
    this.error = 'Passwords do not match';
    return;
  }

  if (this.password.length < 8) {
    this.error = 'Password must be at least 8 characters';
    return;
  }

  this.loading = true;

  this.auth.resetPassword(this.token, this.password).subscribe({
    next: (res) => {
      this.loading = false;
      this.success = (res as any).message || 'Password reset successfully';

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    },
    error: (err) => {
      this.loading = false;
      this.error = err.error?.message || 'Something went wrong';
    }
  });
}


}