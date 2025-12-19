import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  submitted = false;
  formError = '';
  loading = false;

  // 🔵 paymob أو cash
  paymentType: 'paymob' | 'cash' = 'cash';

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
  subtotal = 0;
  shippingCost = 15;
  total = 0;

  egyptGovernorates: string[] = [
    'Cairo','Giza','Alexandria','Qalyubia','Sharqia','Dakahlia','Beheira',
    'Ismailia','Port Said','Suez','Monufia','Gharbia','Kafr El Sheikh',
    'Damietta','Faiyum','Beni Suef','Minya','Asyut','Sohag','Qena',
    'Aswan','Luxor','Red Sea','Matrouh','North Sinai','South Sinai','New Valley'
  ];

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  /* ================= Load Cart ================= */

  loadCart() {
    this.loading = true;

    this.cartService.getCart().subscribe({
      next: (res: any) => {
        this.cartItems = res.items || [];
        this.subtotal = Number(res.totalPrice) || 0;
        this.total = this.subtotal + this.shippingCost;
        this.loading = false;

        if (this.cartItems.length === 0) {
          this.router.navigate(['/cart']);
        }
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/cart']);
      }
    });
  }

  /* ================= Guards ================= */

  allowOnlyLetters(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    if (
      !(charCode >= 65 && charCode <= 90) &&
      !(charCode >= 97 && charCode <= 122) &&
      !(charCode >= 1536 && charCode <= 1791) &&
      charCode !== 32
    ) {
      event.preventDefault();
    }
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.which || event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  cleanName(field: 'firstName' | 'lastName' | 'city') {
    this.shipping[field] =
      this.shipping[field].replace(/[^A-Za-zء-ي\s]/g, '');
  }

  /* ================= Validators ================= */

  isEmpty(v: string): boolean {
    return !v || v.trim() === '';
  }

  invalidPhone(): boolean {
    return !/^(010|011|012|015)\d{8}$/.test(this.shipping.phone);
  }

  /* ================= Formatters ================= */

  formatPhone() {
    this.shipping.phone =
      this.shipping.phone.replace(/\D/g, '').slice(0, 11);
  }

  /* ================= Submit ================= */

  placeOrder() {
    this.submitted = true;
    this.formError = '';

    // 🔴 Shipping Validation
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

    // ✅ مفيش أي Card Validation
    // - Paymob: iframe
    // - Cash: no card at all

    const payload = {
      items: this.cartItems.map(item => ({
        product: item.product?._id || item.product,
        quantity: item.quantity,
        price: item.price
      })),
      shipping: this.shipping,
      paymentMethod: this.paymentType, // paymob | cash
      subtotal: this.subtotal,
      shippingCost: this.shippingCost,
      totalPrice: this.total
    };

    this.checkoutService.createOrder(payload).subscribe({
      next: (res: any) => {

        // 🟢 Paymob → Redirect
        if (this.paymentType === 'paymob' && res?.iframeUrl) {
          window.location.href = res.iframeUrl;
          return;
        }

        // 🟢 Cash
        alert('Order placed successfully ✅');
        this.router.navigate(['/orders']);
      },
      error: (err: any) => {
        console.error(err);
        this.formError = err?.error?.message || 'Something went wrong';
      }
    });
  }

  getImage(image?: string): string {
    return image ? 'http://localhost:5000/' + image : 'assets/no-image.png';
  }
}
