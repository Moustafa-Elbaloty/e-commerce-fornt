import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5000/api/auth';
  private user: any = null;

    // إضافة BehaviorSubject للـ admin status
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminSubject.asObservable();

  constructor(private http: HttpClient) {
    // تحديث حالة الأدمن عند تشغيل الـ service
    this.checkAdminStatus();
  }


  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }


  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data).pipe(
      tap((res) => {
        if (res?.token && res?.user) {
          this.setSession(res.user, res.token);
          this.checkAdminStatus(); // تحديث حالة الأدمن بعد اللوجن
        }
      })
    );
  }


  socialLogin(user: any, token: string) {
    this.setSession(user, token);
    this.checkAdminStatus(); // تحديث حالة الأدمن بعد اللوجن
  }

 
  private setSession(user: any, token: string) {
    this.user = user;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
getUserDashboard() {
  return this.http.get<any>(
    'http://localhost:5000/api/users/dashboard'
  );
}
updateProfile(data: any): Observable<any> {
  return this.http.put(
    'http://localhost:5000/api/users/update',
    data
  );
}

changePassword(data: any): Observable<any> {
  return this.http.put(
    'http://localhost:5000/api/auth/change-password',
    data
  );
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

    // Method جديد للتحقق من الأدمن
  isAdmin(): boolean {
    const user = this.getUser();
    // تحقق من role أو isAdmin حسب structure الـ user object اللي جاي من الـ backend
    return user?.role === 'admin' || user?.isAdmin === true;
  }

  // تحديث حالة الأدمن في الـ BehaviorSubject
  private checkAdminStatus() {
    this.isAdminSubject.next(this.isAdmin());
  }


  logout() {
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAdminSubject.next(false); // reset admin status
  }
}
