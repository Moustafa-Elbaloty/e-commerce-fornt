import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // يجب أن تتأكد من وجود هذا المتغير والدالة في الكومبوننت
isOpen: boolean = false; 

toggleMenu() {
  this.isOpen = !this.isOpen; 
}
}
