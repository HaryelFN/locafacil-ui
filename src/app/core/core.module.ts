import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/components/common/messageservice';
import { MenuModule } from '../../../node_modules/primeng/components/menu/menu';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { ErrorHandlerService } from './error-handler.service';
import { MoneyHttp } from '../seguranca/money-http';

import { TopBarComponent } from './topbar/topbar.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { AuthService } from '../seguranca/auth.service';
import { DashbordService } from '../dashbord/dashbord-view/dashbord.service';
import { ImovelService } from '../imoveis/imovel.service';
import { LocadorService } from '../locadores/locador.service';
import { ContratoService } from '../contratos/contrato.service';
import { ProcuradorService } from '../procuradores/procurador.service';
import { AluguelService } from '../alugueis/aluguel.service';
import { LocatarioService } from '../locatarios/locatario.service';
import { RepasseService } from '../repasses/repasse.service';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,

    ToastModule,
    ConfirmDialogModule,
    ButtonModule,
    DialogModule,
    MenuModule
  ],
  declarations: [
    TopBarComponent,
    SideBarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    ToastModule,
    ConfirmDialogModule,
    ButtonModule,
    TopBarComponent,
    SideBarComponent
  ],
  providers: [
    DashbordService,
    AluguelService,
    RepasseService,
    ContratoService,
    ImovelService,
    LocadorService,
    ProcuradorService,
    LocatarioService,

    ErrorHandlerService,
    AuthService,
    MoneyHttp,

    ConfirmationService,
    MessageService,
    JwtHelperService,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
