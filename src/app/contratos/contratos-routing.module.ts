import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContratoPesquisaComponent } from './contrato-pesquisa/contrato-pesquisa.component';
import { ContratoCadastroComponent } from './contrato-cadastro/contrato-cadastro.component';
import { AuthGuard } from './../seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ContratoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CONTRATO'] }
  },
  {
    path: 'novo',
    component: ContratoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CONTRATO'] }
  },
  {
    path: ':id',
    component: ContratoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CONTRATO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ContratosRoutingModule { }
