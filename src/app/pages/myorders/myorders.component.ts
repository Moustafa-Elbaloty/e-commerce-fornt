import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  orders: Order[] = [];

  ngOnInit(): void {
    this.loadOrders();
  }

  /* ================= Load Orders ================= */
  loadOrders(): void {
    const storedOrders = localStorage.getItem('orders');

    if (!storedOrders) {
      this.orders = [];
      return;
    }

    const parsed = JSON.parse(storedOrders);

    this.orders = parsed.map((order: any) => ({
      id: order.id,
      date: order.date,
      status: order.status || 'pending',
      items: order.items || [],
      subtotal: Number(order.subtotal) || 0,
      total: Number(order.total) || 0
    })).reverse();
  }

  /* ================= Helpers ================= */

  formatDate(date: string): string {
    return new Date(date).toDateString();
  }

  totalItems(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }

  itemTotal(item: OrderItem): number {
    return item.price * item.qty;
  }
}

/* ================= Interfaces ================= */

interface Order {
  id: number;
  date: string;
  status: 'pending' | 'delivered' | 'canceled';
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
