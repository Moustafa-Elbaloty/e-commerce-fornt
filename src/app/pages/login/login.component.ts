import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { auth, googleProvider, facebookProvider } from '../../firebase.config';
import { signInWithPopup } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('container') container!: ElementRef;

  // -----------------------------
  // Forms Data
  // -----------------------------
  registerData = {
    name: '',
    email: '',
    password: '',
    isVendor: false,
    storeName: '',
    address: '',
    phone: ''
  };

  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // ======================================================
  // Google Login
  // ======================================================
  loginWithGoogle(event?: Event) {
    event?.preventDefault();

    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const firebaseUser = result.user;
        const token = await firebaseUser.getIdToken();

        const userData = {
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL,
          phone: firebaseUser.phoneNumber,
          address: ''
        };

        // ✅ خزن user + token في AuthService
        this.authService.socialLogin(userData, token);

        this.router.navigate(['/']);
      })
      .catch((error) => {
        alert('Google login failed: ' + error.message);
      });
  }

  // ======================================================
  // Facebook Login
  // ======================================================
  loginWithFacebook(event?: Event) {
    event?.preventDefault();

    signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        const firebaseUser = result.user;
        const token = await firebaseUser.getIdToken();

        const userData = {
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          avatar: firebaseUser.photoURL,
          phone: firebaseUser.phoneNumber,
          address: ''
        };

        // ✅ خزن user + token
        this.authService.socialLogin(userData, token);

        this.router.navigate(['/']);
      })
      .catch((error) => {
        alert('Facebook login failed: ' + error.message);
      });
  }

  // ======================================================
  // Manual Register
  // ======================================================
  register() {
    if (!this.registerData.name || !this.registerData.email || !this.registerData.password) {
      alert('Please fill all required fields');
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: () => {
        alert('Registration successful!');
        this.showLogin();
      },
      error: (err) => {
        alert(err.error?.message || 'Registration failed');
      }
    });
  }

  // ======================================================
  // Manual Login
  // ======================================================
  login() {
    if (!this.loginData.email || !this.loginData.password) {
      alert('Please fill all fields');
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: () => {
        alert('Login successful!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert(err.error?.message || 'Login failed');
      }
    });
  }

  // ======================================================
  // UI Switching
  // ======================================================
  showLogin() {
    this.container.nativeElement.classList.remove('active');
  }

  showRegister() {
    this.container.nativeElement.classList.add('active');
  }
}
