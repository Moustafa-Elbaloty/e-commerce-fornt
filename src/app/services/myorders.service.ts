import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyordersService {

  private baseUrl = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // 🟢 Get my orders
  getMyOrders(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/myorders`,
      this.getAuthHeaders()
    );
  }

  // 🟢 Retry payment (Paymob)
  retryPayment(orderId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/${orderId}/retry-payment`,
      {},
      this.getAuthHeaders()
    );
  }
}
