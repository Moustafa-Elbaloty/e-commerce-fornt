import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  loading = false;
  error = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = '';

    this.adminService.getAllUsers().subscribe({
      next: (res: any[]) => {
        this.users = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }

  blockUser(user: any): void {
    if (user.role === 'admin') return;

    const confirmBlock = confirm(`Are you sure you want to block ${user.name}?`);
    if (!confirmBlock) return;

    this.adminService.blockUser(user._id).subscribe({
      next: () => {
        user.isBlocked = true;
      },
      error: () => {
        alert('Failed to block user');
      }
    });
  }

  unblockUser(user: any): void {
    const confirmUnblock = confirm(`Unblock ${user.name}?`);
    if (!confirmUnblock) return;

    this.adminService.unblockUser(user._id).subscribe({
      next: () => {
        user.isBlocked = false;
      },
      error: () => {
        alert('Failed to unblock user');
      }
    });
  }
}
