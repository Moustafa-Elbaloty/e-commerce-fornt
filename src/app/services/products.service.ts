import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = 'http://localhost:5000/api/products';

  // 🔄 shared products state (for search + listing)
  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ===============================
  // Get products (pagination + filter + search)
  // ===============================
  getProducts(options?: {
    page?: number;
    limit?: number;
    category?: string | null;
    minPrice?: number;
    maxPrice?: number;
    brand?: string;
    q?: string; // 🔍 search
  }) {
    let params = new HttpParams();

    if (options?.page) params = params.set('page', options.page);
    if (options?.limit) params = params.set('limit', options.limit);
    if (options?.category) params = params.set('category', options.category);
    if (options?.minPrice !== undefined)
      params = params.set('minPrice', options.minPrice);
    if (options?.maxPrice !== undefined)
      params = params.set('maxPrice', options.maxPrice);
    if (options?.brand) params = params.set('brand', options.brand);
    if (options?.q) params = params.set('q', options.q); // 🔥

    return this.http.get<any>(this.API_URL, { params });
  }

  // ===============================
  // Load products & update state
  // ===============================
  loadProducts(options?: any) {
    this.getProducts(options).subscribe((res) => {
      this.productsSubject.next(res.products);
    });
  }

  // ===============================
  // Search shortcut
  // ===============================
  searchProducts(query: string) {
    if (!query.trim()) {
      this.loadProducts({ page: 1, limit: 12 });
    } else {
      this.loadProducts({ q: query, page: 1, limit: 12 });
    }
  }

  // ===============================
  // Single product
  // ===============================
  getProductById(id: string) {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }
}
