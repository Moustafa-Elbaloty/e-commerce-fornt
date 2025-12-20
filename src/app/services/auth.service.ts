import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';
  private user: any = null;

  // Admin
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  // Vendor
  private isVendorSubject = new BehaviorSubject<boolean>(false);
  isVendor$ = this.isVendorSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
    this.updateRoles();
  }

  // ================= AUTH =================
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data).pipe(
      tap((res) => {
        if (res?.token && res?.user) {
          this.setSession(res.user, res.token);
        }
      })
    );
  }

  socialLogin(user: any, token: string) {
    this.setSession(user, token);
  }

  // ================= SESSION =================
  private setSession(user: any, token: string) {
    this.user = user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.updateRoles(); // ✅ مهم جدًا
  }

  private loadUserFromStorage() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  // ================= USER =================
  getUser() {
    return this.user;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // ================= ROLES =================
  isAdmin(): boolean {
    return this.user?.role === 'admin' || this.user?.isAdmin === true;
  }

  isVendor(): boolean {
    return this.user?.role === 'vendor';
  }

  private updateRoles() {
    this.isAdminSubject.next(this.isAdmin());
    this.isVendorSubject.next(this.isVendor());
  }

  // ================= API =================
  getUserDashboard() {
    return this.http.get<any>('http://localhost:5000/api/users/dashboard');
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put('http://localhost:5000/api/users/update', data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(
      'http://localhost:5000/api/auth/change-password',
      data
    );
  }

  forgotPassword(email: string) {
    return this.http.post('http://localhost:5000/api/auth/forgot-password', {
      email,
    });
  }

  resetPassword(token: string, password: string) {
    return this.http.put(
      `http://localhost:5000/api/auth/reset-password/${token}`,
      { password }
    );
  }

  // ================= LOGOUT =================
  logout() {
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAdminSubject.next(false);
    this.isVendorSubject.next(false);
  }
}
