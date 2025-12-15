import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isOpen = false;
  isUserMenuOpen = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    private elementRef: ElementRef   
  ) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  toggleUserMenu(event: MouseEvent) {   
    event.stopPropagation();            
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.auth.logout();
  this.isUserMenuOpen = false; 
  }

  @HostListener('document:click', ['$event'])
  closeUserMenu(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isUserMenuOpen = false;
    }
  }
}
