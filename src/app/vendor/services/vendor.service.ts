import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private apiUrl = 'http://localhost:5000/api/vendor';

  constructor(private http: HttpClient) {}

  // =========================
  // Vendor profile
  // =========================
  getVendorProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  updateVendor(data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, data);
  }

  deleteVendor(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`);
  }

  // =========================
  // Vendor products
  // =========================

  private API = 'http://localhost:5000/api/vendor';
  getVendorProducts(): Observable<any> {
    return this.http.get(`${this.API}/products`);
    
  }
  // =========================
  // Dashboard
  // =========================
  getVendorDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`);
  }

  private API_URL = 'http://localhost:5000/api/products';

  createProduct(data: FormData) {
    return this.http.post(`${this.API_URL}/addProduct`, data);
  }
}
