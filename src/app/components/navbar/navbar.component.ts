import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // ================= UI =================
  isOpen = false;
  isUserMenuOpen = false;

  // ================= Auth =================
  isAdmin$!: Observable<boolean>; // إضافة observable للـ admin
  isVendor$!: Observable<boolean>;

  // ================= Search =================
  searchTerm: string = '';

  constructor(
    public auth: AuthService,
    private router: Router,
    private productService: ProductService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.isAdmin$ = this.auth.isAdmin$;
    this.isVendor$ = this.auth.isVendor$;
  }

  // ================= Menu =================
  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  toggleUserMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  closeUserMenu(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isUserMenuOpen = false;
    }
  }

  // ================= Auth =================
  logout() {
    this.auth.logout();
    window.location.href = '/';
  }

  // ================= Search =================
  onSearch() {
    // لو مش في صفحة products → روح لها
    if (!this.router.url.startsWith('/products')) {
      this.router.navigate(['/products']);
    }

    // نفّذ البحث
    this.productService.searchProducts(this.searchTerm);
  }

  clearSearch() {
    this.searchTerm = '';
    this.productService.loadProducts({ page: 1, limit: 12 });
  }
}
