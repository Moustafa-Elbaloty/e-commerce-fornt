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

  // =====================================
  // Register & Login Data
  // =====================================
  registerData: any = {
    name: '',
    email: '',
    password: '',
    phone: '',
    isVendor: false,
    storeName: ''
  };

  loginData = {
    email: '',
    password: ''
  };

  // =====================================
  // Vendor Files
  // =====================================
  vendorFiles: {
    idCard: File | null;
    commercialRegister: File | null;
  } = {
    idCard: null,
    commercialRegister: null
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
          avatar: firebaseUser.photoURL
        };

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
          avatar: firebaseUser.photoURL
        };

        this.authService.socialLogin(userData, token);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        alert('Facebook login failed: ' + error.message);
      });
  }

  // ======================================================
  // Register
  // ======================================================
  register() {
    // basic validation
    if (!this.registerData.name || !this.registerData.email || !this.registerData.password || !this.registerData.phone) {
      alert('Please fill all required fields');
      return;
    }

    /**
     * ============================
     * 🟢 User Register (JSON)
     * ============================
     */
    if (!this.registerData.isVendor) {
      const payload = {
        name: this.registerData.name,
        email: this.registerData.email,
        password: this.registerData.password,
        phone: this.registerData.phone
      };

      this.authService.register(payload).subscribe({
        next: () => {
          alert('Registration successful, check your email');
          this.showLogin();
        },
        error: (err) => {
          alert(err.error?.message || 'Registration failed');
        }
      });

      return;
    }

    /**
     * ============================
     * 🟡 Vendor Register (FormData)
     * ============================
     */
    if (!this.registerData.storeName || !this.vendorFiles.idCard || !this.vendorFiles.commercialRegister) {
      alert('Vendor must upload required documents');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.registerData.name);
    formData.append('email', this.registerData.email);
    formData.append('password', this.registerData.password);
    formData.append('phone', this.registerData.phone);
    formData.append('storeName', this.registerData.storeName);

    formData.append('idCard', this.vendorFiles.idCard);
    formData.append('commercialRegister', this.vendorFiles.commercialRegister);

    this.authService.register(formData).subscribe({
      next: () => {
        alert('Vendor registration successful, waiting for review');
        this.showLogin();
      },
      error: (err) => {
        alert(err.error?.message || 'Registration failed');
      }
    });
  }

  // ======================================================
  // Login
  // ======================================================
  login() {
    if (!this.loginData.email || !this.loginData.password) {
      alert('Please fill all fields');
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert(err.error?.message || 'Login failed');
      }
    });
  }

  // ======================================================
  // File Change
  // ======================================================
  onFileChange(event: Event, type: 'idCard' | 'commercialRegister') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.vendorFiles[type] = input.files[0];
    }
  }

  // ======================================================
  // UI Helpers
  // ======================================================
  showLogin() {
    this.container.nativeElement.classList.remove('active');
  }

  showRegister() {
    this.container.nativeElement.classList.add('active');
  }
}
