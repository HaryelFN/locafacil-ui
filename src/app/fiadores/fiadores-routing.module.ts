import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { FiadorPesquisaComponent } from './fiador-pesquisa/fiador-pesquisa.component';
import { FiadorCadastroComponent } from './fiador-cadastro/fiador-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: FiadorPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_FIADOR'] }
  },
  {
    path: 'novo',
    component: FiadorCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_FIADOR'] }
  },
  {
    path: ':id',
    component: FiadorCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_FIADOR'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FiadoresRoutingModule { }
