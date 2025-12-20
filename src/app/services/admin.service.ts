import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  // ===============================
  // Helper: Auth Headers
  // ===============================
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ===============================
  // Dashboard Stats
  // GET /api/admin/stats
  // ===============================
  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`, {
      headers: this.getHeaders()
    });
  }

  // ===============================
  // Users
  // GET /api/admin/users
  // ===============================
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`, {
      headers: this.getHeaders()
    });
  }

  // PUT /api/admin/updateUser/:id
  blockUser(userId: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/updateUser/${userId}`,
      { isBlocked: true },
      { headers: this.getHeaders() }
    );
  }

  // PUT /api/admin/updateUser/:id
  unblockUser(userId: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/updateUser/${userId}`,
      { isBlocked: false },
      { headers: this.getHeaders() }
    );
  }

  // ===============================
  // Orders
  // GET /api/admin/orders
  // ===============================
  getAllOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders`, {
      headers: this.getHeaders()
    });
  }

  // PUT /api/admin/orders/:id
  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/orders/${orderId}`,
      { status },
      { headers: this.getHeaders() }
    );
  }

  // ===============================
  // Products
  // GET /api/admin/products
  // ===============================
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`, {
      headers: this.getHeaders()
    });
  }

  // DELETE /api/admin/products/:id
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/products/${productId}`,
      { headers: this.getHeaders() }
    );
  }
}
