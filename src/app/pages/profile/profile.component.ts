import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any = null;
  loading = false;
  error: string | null = null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.auth.getUserDashboard().subscribe({
      next: (res) => {
        this.profile = res.data.user;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load profile';
        this.loading = false;
        console.error(err);
      }
    });
  }
saveChanges() {
  const payload = {
    name: this.profile.name,
    phone: this.profile.phone,
    addresses: this.profile.address
      ? [
          {
            street: this.profile.address,
            isDefault: true
          }
        ]
      : []
  };

  this.auth.updateProfile(payload).subscribe({
    next: (res) => {
      // تحديث البيانات المعروضة
      this.profile = res.user;

      // تحديث localStorage
      localStorage.setItem('user', JSON.stringify(res.user));

      alert('Profile updated successfully');
    },
    error: (err) => {
      console.error(err);
      alert('Failed to update profile');
    }
  });
}

}
