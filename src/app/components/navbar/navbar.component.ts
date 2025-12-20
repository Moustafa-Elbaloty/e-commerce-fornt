import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isOpen = false;
  isUserMenuOpen = false;

  isAdmin$!: Observable<boolean>; // إضافة observable للـ admin
  isVendor$!: Observable<boolean>;

  constructor(
    public auth: AuthService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.isAdmin$ = this.auth.isAdmin$; // الاشتراك في admin status
    this.isVendor$ = this.auth.isVendor$;
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  toggleUserMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.auth.logout();
    window.location.href = '/';
  }

  @HostListener('document:click', ['$event'])
  closeUserMenu(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isUserMenuOpen = false;
    }
  }
}
