import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email = '';
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private auth: AuthService) {}
submit() {
  this.loading = true;
  this.error = null;
  this.success = null;

  this.auth.forgotPassword(this.email).subscribe({
    next: (res) => {
      this.loading = false;
      this.success = (res as any).message || 'Reset link sent to your email';
    },
    error: (err) => {
      this.loading = false;
      this.error = err.error?.message || 'Something went wrong';
    }
  });
}

}