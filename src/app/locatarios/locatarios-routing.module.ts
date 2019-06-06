import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { LocatarioPesquisaComponent } from './locatario-pesquisa/locatario-pesquisa.component';
import { LocatarioCadastroComponent } from './locatario-cadastro/locatario-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: LocatarioPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LOCATARIO'] }
  },
  {
    path: 'novo',
    component: LocatarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LOCATARIO'] }
  },
  {
    path: ':id',
    component: LocatarioCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LOCATARIO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LocatariosRoutingModule { }
