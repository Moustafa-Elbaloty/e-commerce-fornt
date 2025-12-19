import { Component, OnInit } from '@angular/core';
import { MyordersService } from '../../services/myorders.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  orders: Order[] = [];
  loading = false;
  error = '';
  retryLoadingId: string | null = null; // 👈 عشان نمنع الدبل كليك

  constructor(private myordersService: MyordersService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  /* ================= Load Orders ================= */
  loadOrders(): void {
    this.loading = true;
    this.error = '';

    this.myordersService.getMyOrders().subscribe({
      next: (res: any) => {
        const ordersData = res.data || [];

        this.orders = ordersData.map((order: any) => ({
          id: order._id,
          date: order.createdAt,
          status: order.orderStatus,
          paymentStatus: order.paymentStatus,
          paymentMethod: order.paymentMethod,
          items: order.items.map((item: any) => ({
            name: item.product?.name || 'Product',
            price: item.price,
            qty: item.quantity,
            image: item.product?.image || ''
          })),
          subtotal: order.totalPrice,
          total: order.totalPrice
        })).reverse();

        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load orders';
        this.loading = false;
      }
    });
  }

  /* ================= Retry Payment ================= */
  retryPayment(orderId: string) {
    this.retryLoadingId = orderId;

    this.myordersService.retryPayment(orderId).subscribe({
      next: (res: any) => {
        this.retryLoadingId = null;

        if (res?.iframeUrl) {
          window.location.href = res.iframeUrl;
        }
      },
      error: (err) => {
        this.retryLoadingId = null;
        console.error(err);
        alert(err?.error?.message || 'Failed to retry payment');
      }
    });
  }

  /* ================= Helpers ================= */
  formatDate(date: string): string {
    return new Date(date).toDateString();
  }

  totalItems(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }

  getImage(image?: string): string {
    if (!image) return 'assets/no-image.png';
    if (image.startsWith('http')) return image;
    return `http://localhost:5000/${image}`;
  }
}

/* ================= Interfaces ================= */

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: 'cash' | 'stripe' | 'paypal' | 'paymob';
  items: OrderItem[];
  subtotal: number;
  total: number;
}

interface OrderItem {
  name: string;
  price: number;
  qty: number;
  image: string;
}
