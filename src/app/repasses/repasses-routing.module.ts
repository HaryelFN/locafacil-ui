import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { RepassePesquisaComponent } from './repasse-pesquisa/repasse-pesquisa.component';


const routes: Routes = [
  {
    path: '',
    component: RepassePesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_REPASSE'] }
  }
  // {
  //   path: 'novo',
  //   component: ProcuradorCadastroComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: ['ROLE_CADASTRAR_PROCURADOR'] }
  // },
  // {
  //   path: ':id',
  //   component: ProcuradorCadastroComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: ['ROLE_CADASTRAR_PROCURADOR'] }
  // }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RepassesRoutingModule { }
