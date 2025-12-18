import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:5000/api/cart';

  constructor(private http: HttpClient) {}

  getCart() {
    return this.http.get<any>(this.apiUrl);
  }

  addToCart(productId: string, quantity: number = 1) {
    return this.http.post<any>(`${this.apiUrl}/add`, {
      productId,
      quantity
    });
  }

  updateItem(productId: string, quantity: number) {
    return this.http.put<any>(
      `${this.apiUrl}/update/${productId}`,
      { quantity }
    );
  }

  removeItem(productId: string) {
    return this.http.delete<any>(
      `${this.apiUrl}/remove/${productId}`
    );
  }
}
