import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { ProcuradorPesquisaComponent } from './procurador-pesquisa/procurador-pesquisa.component';
import { ProcuradorCadastroComponent } from './procurador-cadastro/procurador-cadastro.component';


const routes: Routes = [
  {
    path: '',
    component: ProcuradorPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_PROCURADOR'] }
  },
  {
    path: 'novo',
    component: ProcuradorCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PROCURADOR'] }
  },
  {
    path: ':id',
    component: ProcuradorCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_PROCURADOR'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProcuradoresRoutingModule { }
