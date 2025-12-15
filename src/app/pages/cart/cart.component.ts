import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  shipping = 15;
  cartItems: any[] = [];

  ngOnInit(): void {
    this.initCart();
  }

  /* =======================
     Init Cart with Demo Data
     ======================= */
  initCart() {
    const cart = localStorage.getItem('cart');

    if (!cart) {
      // عناصر تجريبية
      this.cartItems = [
        {
          id: 1,
          name: 'Vortex Quantum Phone X',
          price: 999.99,
          qty: 1,
          image: 'https://i.imgur.com/8Q8oX0M.png'
        },
        {
          id: 2,
          name: 'Aether Flow Headphones',
          price: 199.99,
          qty: 2,
          image: 'https://i.imgur.com/G5qWwN5.png'
        },
        {
          id: 3,
          name: 'Chrono Smart Speaker',
          price: 129.99,
          qty: 1,
          image: 'https://i.imgur.com/0i9gT6B.png'
        },
        {
          id: 4,
          name: 'NovaCharge Portable Charger',
          price: 49.99,
          qty: 3,
          image: 'https://i.imgur.com/q1W5oJ4.png'
        }
      ];

      this.saveCart();
    } else {
      this.cartItems = JSON.parse(cart);
    }
  }

  /* =======================
     LocalStorage
     ======================= */
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  /* =======================
     Cart Actions
     ======================= */
  increase(item: any) {
    item.qty++;
    this.saveCart();
  }

  decrease(item: any) {
    if (item.qty > 1) {
      item.qty--;
      this.saveCart();
    }
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.saveCart();
  }

  /* =======================
     Totals
     ======================= */
  get subtotal() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }

  get total() {
    return this.subtotal + this.shipping;
  }
}
