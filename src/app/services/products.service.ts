import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(
    page = 1,
    limit = 12,
    category?: string | null,
    minPrice?: number,
    maxPrice?: number,
    rating?: number,
    brand?: string
  ) {
    let params = new HttpParams().set('page', page).set('limit', limit);

    if (category) params = params.set('category', category);
    if (minPrice !== undefined) params = params.set('minPrice', minPrice);
    if (maxPrice !== undefined) params = params.set('maxPrice', maxPrice);
    if (rating !== undefined) params = params.set('rating', rating);
    if (brand) params = params.set('brand', brand);

    return this.http.get<any>(this.API_URL, { params });
  }

  getProductById(id: string) {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  // ===============================
  // CREATE PRODUCT (Vendor)
  // ===============================
  createProduct(formData: FormData) {
    return this.http.post<any>(`${this.API_URL}`, formData);
  }
}
