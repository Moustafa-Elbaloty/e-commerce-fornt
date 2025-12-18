import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private router: Router) {}

  submitted = false;
  formError = '';

  paymentType: 'credit' | 'cash' = 'credit';

  card = {
    number: '',
    expiry: '',
    cvv: ''
  };

  shipping = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    governorate: '',
    city: '',
    phone: ''
  };

  cartItems: any[] = [];
  shippingCost = 15;

  egyptGovernorates: string[] = [
    'Cairo','Giza','Alexandria','Qalyubia','Sharqia','Dakahlia','Beheira',
    'Ismailia','Port Said','Suez','Monufia','Gharbia','Kafr El Sheikh',
    'Damietta','Faiyum','Beni Suef','Minya','Asyut','Sohag','Qena',
    'Aswan','Luxor','Red Sea','Matrouh','North Sinai','South Sinai','New Valley'
  ];

  ngOnInit(): void {
    const cart = localStorage.getItem('cartItems');
    if (!cart) {
      this.router.navigate(['/cart']);
      return;
    }
    this.cartItems = JSON.parse(cart);
  }

  /* ================= Helpers ================= */
  isEmpty(v: string): boolean {
    return !v || v.trim() === '';
  }

  invalidPhone(): boolean {
    return !/^(010|011|012|015)\d{8}$/.test(this.shipping.phone);
  }

  invalidCardNumber(): boolean {
    return this.card.number.replace(/\s/g, '').length !== 16;
  }

  invalidExpiry(): boolean {
    return this.card.expiry.length !== 5;
  }

  invalidCVV(): boolean {
    return this.card.cvv.length !== 3;
  }

  /* ================= Formatters ================= */
  formatPhone() {
    this.shipping.phone = this.shipping.phone.replace(/\D/g, '').slice(0, 11);
  }

  formatCardNumber() {
    this.card.number = this.card.number
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  formatExpiry() {
    let v = this.card.expiry.replace(/\D/g, '').slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    this.card.expiry = v;
  }

  formatCVV() {
    this.card.cvv = this.card.cvv.replace(/\D/g, '').slice(0, 3);
  }

  /* ================= Totals ================= */
  get subtotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }

  get total(): number {
    return this.subtotal + this.shippingCost;
  }

  /* ================= Submit ================= */
  placeOrder() {
    this.submitted = true;
    this.formError = '';

    // Validation
    if (
      this.isEmpty(this.shipping.firstName) ||
      this.isEmpty(this.shipping.lastName) ||
      this.isEmpty(this.shipping.address1) ||
      this.isEmpty(this.shipping.address2) ||
      this.isEmpty(this.shipping.governorate) ||
      this.isEmpty(this.shipping.city) ||
      this.invalidPhone()
    ) {
      this.formError = 'Please fill all shipping details correctly';
      return;
    }

    if (this.paymentType === 'credit') {
      if (
        this.invalidCardNumber() ||
        this.invalidExpiry() ||
        this.invalidCVV()
      ) {
        this.formError = 'Please enter valid card details';
        return;
      }
    }

    /* ================= SAVE ORDER ================= */

    const newOrder = {
      id: Date.now(),                 // Order ID
      date: new Date().toISOString(), // Order Date
      status: 'pending',              // pending | delivered | canceled
      customer: this.shipping,
      paymentType: this.paymentType,
      items: this.cartItems,
      subtotal: this.subtotal,
      shippingCost: this.shippingCost,
      total: this.total
    };

    const storedOrders = localStorage.getItem('orders');
    const orders = storedOrders ? JSON.parse(storedOrders) : [];

    orders.push(newOrder);

    localStorage.setItem('orders', JSON.stringify(orders));

    /* ================= CLEAN UP ================= */
    localStorage.removeItem('cartItems');

    alert('Order placed successfully ✅');
    this.router.navigate(['/orders']); // صفحة My Orders
  }
}
