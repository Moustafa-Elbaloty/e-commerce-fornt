import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  shipping = 15;

  cartItems: any[] = [];
  totalPrice = 0;
  totalItems = 0;
  loading = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  /* =======================
     Load Cart From Backend
     ======================= */
  loadCart() {
    this.loading = true;

    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartItems = res.items || [];
        this.totalPrice = Number(res.totalPrice) || 0;
        this.totalItems = res.totalItems || 0;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  /* =======================
     Cart Actions
     ======================= */
  increase(item: any) {
    this.cartService
      .updateItem(item.product._id, item.quantity + 1)
      .subscribe(() => this.loadCart());
  }

  decrease(item: any) {
    if (item.quantity === 1) return;

    this.cartService
      .updateItem(item.product._id, item.quantity - 1)
      .subscribe(() => this.loadCart());
  }

  removeItem(productId: string) {
    this.cartService
      .removeItem(productId)
      .subscribe(() => this.loadCart());
  }

  /* =======================
     Totals
     ======================= */
  get subtotal() {
    return this.totalPrice;
  }

  get total() {
    return this.subtotal + this.shipping;
  }
}
