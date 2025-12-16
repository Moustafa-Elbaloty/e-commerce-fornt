import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private router: Router) {}

  /* =======================
     Payment
     ======================= */
  paymentType: 'credit' | 'cash' = 'credit';

  card = {
    number: '',
    expiry: '',
    cvv: ''
  };

  /* =======================
     Shipping
     ======================= */
  shipping = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    governorate: '',
    city: '',
    phone: ''
  };

  /* =======================
     Cart
     ======================= */
  cartItems: any[] = [];
  shippingCost = 15;

  /* =======================
     Governorates
     ======================= */
  egyptGovernorates: string[] = [
    'Cairo','Giza','Alexandria','Qalyubia','Sharqia','Dakahlia','Beheira',
    'Ismailia','Port Said','Suez','Monufia','Gharbia','Kafr El Sheikh',
    'Damietta','Faiyum','Beni Suef','Minya','Asyut','Sohag','Qena',
    'Aswan','Luxor','Red Sea','Matrouh','North Sinai','South Sinai','New Valley'
  ];

  /* =======================
     Init
     ======================= */
  ngOnInit(): void {

    // تحميل بيانات العميل (لو موجودة)
    const savedCustomer = localStorage.getItem('customerInfo');
    if (savedCustomer) {
      this.shipping = JSON.parse(savedCustomer);
    }

    // تحميل الكارت
    const cart = localStorage.getItem('cartItems');
    if (!cart) {
      this.router.navigate(['/cart']);
      return;
    }

    this.cartItems = JSON.parse(cart);
    if (this.cartItems.length === 0) {
      this.router.navigate(['/cart']);
    }
  }

  /* =======================
     Auto Save
     ======================= */
  saveCustomerInfo() {
    localStorage.setItem(
      'customerInfo',
      JSON.stringify(this.shipping)
    );
  }

  /* =======================
     Totals
     ======================= */
  get subtotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }

  get total(): number {
    return this.subtotal + this.shippingCost;
  }

  /* =======================
     INPUT GUARDS
     ======================= */

  // عربي + إنجليزي + مسافة
  allowOnlyLetters(event: KeyboardEvent) {
    const regex = /^[a-zA-Z\u0600-\u06FF\s]$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  // أرقام فقط
  allowOnlyNumbers(event: KeyboardEvent) {
    const key = event.key;

    if (
      key === 'Backspace' ||
      key === 'Tab' ||
      key === 'ArrowLeft' ||
      key === 'ArrowRight'
    ) return;

    if (!/^[0-9]$/.test(key)) {
      event.preventDefault();
    }
  }

  /* =======================
     FORMATTERS
     ======================= */

  // رقم مصري فقط (Hard Limit)
  formatPhone() {
    let value = this.shipping.phone.replace(/\D/g, '');

    // حد أقصى 11 رقم
    value = value.substring(0, 11);

    // لازم يبدأ بـ 01
    if (!value.startsWith('01')) {
      value = '01';
    }

    // شركات مصر فقط
    if (value.length >= 3) {
      const allowed = ['0', '1', '2', '5']; // 010 / 011 / 012 / 015
      if (!allowed.includes(value[2])) {
        value = value.substring(0, 2);
      }
    }

    this.shipping.phone = value;

    // حفظ تلقائي
    this.saveCustomerInfo();
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
    if (v.length >= 3) {
      v = v.slice(0, 2) + '/' + v.slice(2);
    }
    this.card.expiry = v;
  }

  formatCVV() {
    this.card.cvv = this.card.cvv.replace(/\D/g, '').slice(0, 3);
  }

  /* =======================
     Validation
     ======================= */
  isFormValid(): boolean {

    const egyptPhoneRegex = /^(010|011|012|015)\d{8}$/;

    if (
      !this.shipping.firstName ||
      !this.shipping.lastName ||
      !this.shipping.address1 ||
      !this.shipping.address2 ||
      !this.shipping.governorate ||
      !this.shipping.city ||
      !egyptPhoneRegex.test(this.shipping.phone)
    ) {
      return false;
    }

    if (this.paymentType === 'credit') {
      if (
        this.card.number.replace(/\s/g, '').length !== 16 ||
        this.card.expiry.length !== 5 ||
        this.card.cvv.length !== 3
      ) {
        return false;
      }
    }

    return true;
  }

  /* =======================
     Place Order
     ======================= */
  placeOrder() {

    if (!this.isFormValid()) {
      alert('Please enter valid data');
      return;
    }

    // حفظ بيانات العميل
    this.saveCustomerInfo();

    // حفظ الطلب
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
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

    // مسح الكارت
    localStorage.removeItem('cartItems');

    alert('Order placed successfully ✅');
    this.router.navigate(['/']);
  }
}
