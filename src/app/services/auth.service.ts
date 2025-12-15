import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5000/api/auth';
  private user: any = null;

  constructor(private http: HttpClient) {}

  // ===== Register =====
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // ===== Login =====
  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data).pipe(
      tap((res) => {
        if (res?.token && res?.user) {
          this.setSession(res.user, res.token);
        }
      })
    );
  }

  // ===== Session Handling =====
  private setSession(user: any, token: string) {
    this.user = user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    if (!this.user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
    return this.user;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
