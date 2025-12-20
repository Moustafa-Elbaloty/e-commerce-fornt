import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];
  loading = false;
  error = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // ===============================
  // Load All Orders (Admin)
  // ===============================
  loadOrders(): void {
    this.loading = true;
    this.error = '';

    this.adminService.getAllOrders().subscribe({
      next: (res: any) => {
        console.log('ADMIN ORDERS RESPONSE:', res);

        if (Array.isArray(res)) {
          this.orders = res;
        }
        else if (res?.data && Array.isArray(res.data)) {
          this.orders = res.data;
        }
        else if (res?.orders && Array.isArray(res.orders)) {
          this.orders = res.orders;
        }
        else {
          this.orders = [];
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('LOAD ORDERS ERROR:', err);
        this.error = 'Failed to load orders';
        this.loading = false;
      }
    });
  }

  // ===============================
  // Update Order Status
  // ===============================
  changeStatus(orderId: string, status: string): void {
    this.adminService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        const order = this.orders.find(o => o._id === orderId);
        if (order) order.orderStatus = status;
      },
      error: () => {
        alert('Failed to update order status');
      }
    });
  }

}
