import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  vendors: any[] = [];
  loading = false;
  error = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadPendingVendors();
  }

  loadPendingVendors(): void {
    this.loading = true;
    this.error = '';

    this.adminService.getPendingVendors().subscribe({
      next: (res) => {
        this.vendors = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load pending vendors';
        this.loading = false;
      }
    });
  }

  approveVendor(vendor: any): void {
    if (!confirm(`Approve ${vendor.name}?`)) return;

    this.adminService.approveVendor(vendor._id).subscribe(() => {
      this.vendors = this.vendors.filter(v => v._id !== vendor._id);
    });
  }

  rejectVendor(vendor: any): void {
    if (!confirm(`Reject ${vendor.name}?`)) return;

    this.adminService.rejectVendor(vendor._id).subscribe(() => {
      this.vendors = this.vendors.filter(v => v._id !== vendor._id);
    });
  }
}
