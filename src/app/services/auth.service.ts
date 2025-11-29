import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  // 🧍‍♂️ تسجيل مستخدم جديد
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // 🔑 تسجيل الدخول
  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

}
