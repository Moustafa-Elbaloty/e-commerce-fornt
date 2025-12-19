import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
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
  getVendorProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  // =========================
  // Dashboard
  // =========================
  getVendorDashboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`);
  }

  createProduct(formData: FormData) {
  return this.http.post('http://localhost:5000/api/products', formData);
}

}
