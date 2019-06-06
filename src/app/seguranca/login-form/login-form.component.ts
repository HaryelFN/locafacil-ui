import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { AuthService } from '../auth.service';
import { TopBarComponent } from '../../core/topbar/topbar.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  constructor(
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
      .then(() => {
        this.router.navigate(['/dashbord']);
      })
      .catch(erro => {
        console.log('error', erro);
        this.errorHandler.handle(erro);
      });
  }

}
