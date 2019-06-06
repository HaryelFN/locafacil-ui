import { Component, OnInit } from '@angular/core';

import { Router } from '../../node_modules/@angular/router';
import { AuthService } from './seguranca/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  mobileMenuActive: boolean;

  constructor(
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    if (this.auth.isAccessTokenInvalido) {
      this.router.navigate(['/dashbord']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onMobileMenuButton(event) {
    this.mobileMenuActive = !this.mobileMenuActive;
    event.preventDefault();
  }

  hideMobileMenu(event) {
    this.mobileMenuActive = false;
    event.preventDefault();
  }

  exibindoSibeBar() {
    return this.router.url !== '/login';
  }
}
