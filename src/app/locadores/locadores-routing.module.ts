import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { LocadorPesquisaComponent } from './locador-pesquisa/locador-pesquisa.component';
import { LocadorCadastroComponent } from './locador-cadastro/locador-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: LocadorPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LOCADOR'] }
  },
  {
    path: 'novo',
    component: LocadorCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LOCADOR'] }
  },
  {
    path: ':id',
    component: LocadorCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LOCADOR'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LocadoresRoutingModule { }
