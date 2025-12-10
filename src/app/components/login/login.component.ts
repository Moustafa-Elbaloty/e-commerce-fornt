import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { auth, googleProvider } from '../../firebase.config';
import { signInWithPopup } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('container') container!: ElementRef;

  registerData = { name: '', email: '', password: '' };
  loginData = { email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  // ---------------------------------------
  // Google Login
  // ---------------------------------------
  loginWithGoogle() {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken();

        localStorage.setItem('token', token);

        this.router.navigate(['/']);
      })
      .catch((error) => console.error("Google Login Error:", error));
  }

  // ---------------------------------------
  // Manual Register
  // ---------------------------------------
  register() {
    if (!this.registerData.name || !this.registerData.email || !this.registerData.password) {
      alert('Please fill all fields');
      return;
    }

    this.auth.register(this.registerData).subscribe({
      next: (res: any) => {
        alert('Registration successful!');
        this.showLogin();
      },
      error: (err: any) => {
        alert(err.error?.message || 'Registration failed');
      }
    });
  }

  // ---------------------------------------
  // Manual Login
  // ---------------------------------------
  login() {
    if (!this.loginData.email || !this.loginData.password) {
      alert('Please fill all fields');
      return;
    }

    this.auth.login(this.loginData).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        alert('Login successful!');
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        alert(err.error?.message || 'Login failed');
      }
    });
  }

  // ---------------------------------------
  // UI Switching
  // ---------------------------------------
  showLogin() {
    this.container.nativeElement.classList.remove('active');
  }

  showRegister() {
    this.container.nativeElement.classList.add('active');
  }
}
