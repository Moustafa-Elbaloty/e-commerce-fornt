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

 
  register() {
    if (!this.registerData.name || !this.registerData.email || !this.registerData.password) {
      alert('Please fill all required fields');
      return;
    }

    if (this.registerData.isVendor) {
      if (!this.registerData.storeName || !this.vendorFiles.idCard || !this.vendorFiles.commercialRegister) {
        alert('Vendor must upload required documents');
        return;
      }
    }

    const formData = new FormData();

    Object.keys(this.registerData).forEach(key => {
      formData.append(key, this.registerData[key]);
    });

    if (this.registerData.isVendor) {
      formData.append('idCard', this.vendorFiles.idCard as File);
      formData.append('commercialRegister', this.vendorFiles.commercialRegister as File);
    }

    this.authService.register(formData).subscribe({
      next: () => {
        alert('Registration successful, waiting for review');
        this.showLogin();
      },
      error: (err) => {
        alert(err.error?.message || 'Registration failed');
      }
    });
  }


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

  onFileChange(event: Event, type: 'idCard' | 'commercialRegister') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.vendorFiles[type] = input.files[0];
    }
  }


  showLogin() {
    this.container.nativeElement.classList.remove('active');
  }

  showRegister() {
    this.container.nativeElement.classList.add('active');
  }
}