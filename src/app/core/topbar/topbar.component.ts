import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

import { MenuItem } from '../../../../node_modules/primeng/components/common/menuitem';

import { AppComponent } from '../../app.component';
import { ErrorHandlerService } from '../error-handler.service';
import { LogoutService } from '../../seguranca/logout.service';
import { AuthService } from '../../seguranca/auth.service';
import { User } from '../models';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopBarComponent implements OnInit {

  usuario: any;
  displayDialog: boolean;

  items: MenuItem[];

  constructor(
    public app: AppComponent,
    private auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit() {
    this.items = [{
      label: 'Usuário',
      items: [
        {
          label: 'Perfil', icon: 'fa fa-user', command: (event) => {
            this.exibirPerfil();
          }
        },
        {
          label: 'Sair', icon: 'fa fa-sign-out', command: (event) => {
            this.logout();
          }
        }
      ]
    }];
  }

  exibirPerfil() {
    this.usuario = this.auth.jwtPayload;
    this.displayDialog = true;
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  onDialogHide() {
    this.usuario = null;
  }

  exibindoTopBar() {
    return this.router.url !== '/login';
  }
}
