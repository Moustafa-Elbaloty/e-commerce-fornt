import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyordersService {

  private baseUrl = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) {}

  // 🟢 Get logged user orders
  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/myorders`);
  }
}
