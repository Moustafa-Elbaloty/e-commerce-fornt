import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats = {
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0
  };

  loading = false;
  error = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;

    this.adminService.getDashboardStats().subscribe({
      next: (res: any) => {
        this.stats.totalUsers = res.totalUsers || 0;
        this.stats.totalOrders = res.totalOrders || 0;
        this.stats.totalProducts = res.totalProducts || 0;
        this.stats.totalRevenue = res.totalRevenue || 0;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load dashboard stats';
        this.loading = false;
      }
    });
  }
}
