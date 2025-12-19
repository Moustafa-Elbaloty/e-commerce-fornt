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

  constructor(private myordersService: MyordersService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  /* ================= Load Orders ================= */
  loadOrders(): void {
    this.loading = true;
    this.error = '';

    this.myordersService.getMyOrders().subscribe({
      next: (res: any[]) => {
        this.orders = res.map(order => ({
          id: order._id,
          date: order.createdAt,
          status: order.orderStatus,
          items: order.items.map((item: any) => ({
            name: item.product?.name,
            price: item.price,
            qty: item.quantity,
            image: item.product?.image
          })),
          subtotal: order.totalPrice,
          total: order.totalPrice
        })).reverse();

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load orders';
        this.loading = false;
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
}

/* ================= Interfaces ================= */

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
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
