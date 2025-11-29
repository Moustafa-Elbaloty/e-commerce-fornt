import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'project5';

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const container = this.el.nativeElement.querySelector('#container');
    const registerBtn = this.el.nativeElement.querySelector('#register');
    const loginBtn = this.el.nativeElement.querySelector('#login');

    registerBtn.addEventListener('click', () => {
      container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
      container.classList.remove('active');
    });
  }
}
