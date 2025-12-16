import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

formData = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
};

loading = false;
error: string | null = null;
success: string | null = null;


  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  submit() { 
  this.loading = true;
  this.error = null;
  this.success = null;

  this.auth.changePassword(this.formData).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);

      this.loading = false;
      this.success = 'Password updated successfully';

      setTimeout(() => {
        this.router.navigate(['/profile']);
      }, 1500);
    },
    error: (err) => {
      this.loading = false;
      this.error = err.error?.message || 'Something went wrong';
    }
  });
}

}
