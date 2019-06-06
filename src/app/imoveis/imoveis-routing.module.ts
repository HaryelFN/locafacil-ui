import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { ImovelPesquisaComponent } from './imovel-pesquisa/imovel-pesquisa.component';
import { ImovelCadastroComponent } from './imovel-cadastro/imovel-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: ImovelPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_IMOVEL'] }
  },
  {
    path: 'novo',
    component: ImovelCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_IMOVEL'] }
  },
  {
    path: ':id',
    component: ImovelCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_IMOVEL'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ImoveisRoutingModule { }
