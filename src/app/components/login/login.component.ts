import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerData = { name: '', email: '', password: '' };
  loginData = { email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // 🔄 أكواد التحريك بين الـ forms
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (registerBtn && loginBtn && container) {
      registerBtn.addEventListener('click', () => container.classList.add('active'));
      loginBtn.addEventListener('click', () => container.classList.remove('active'));
    }
  }

  // ✅ دالة التسجيل
  register() {
    if (!this.registerData.name || !this.registerData.email || !this.registerData.password) {
      alert('Please fill all fields');
      return;
    }

    this.auth.register(this.registerData).subscribe({
      next: (res: any) => {
        console.log('✅ Registered:', res);
        alert('Registration successful!');
        this.showLogin();
      },
      error: (err: any) => {
        console.error('❌ Register error:', err);
        alert(err.error?.message || 'Registration failed');
      }
    });
  }

  // ✅ دالة تسجيل الدخول
  login() {
    if (!this.loginData.email || !this.loginData.password) {
      alert('Please fill all fields');
      return;
    }

    this.auth.login(this.loginData).subscribe({
      next: (res: any) => {
        console.log('✅ Login:', res);
        localStorage.setItem('token', res.token);
        alert('Login successful!');
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.error('❌ Login error:', err);
        alert(err.error?.message || 'Login failed');
      }
    });
  }

  showLogin() {
    const container = document.getElementById('container');
    if (container) container.classList.remove('active');
  }

  showRegister() {
    const container = document.getElementById('container');
    if (container) container.classList.add('active');
  }
}
