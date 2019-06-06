import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AluguelPesquisaComponent } from './aluguel-pesquisa/aluguel-pesquisa.component';
import { AuthGuard } from './../seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AluguelPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_ALUGUEL'] }
  },
  {
    path: 'novo',
    component: AluguelPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ALUGUEL'] }
  },
  {
    path: ':codigo',
    component: AluguelPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ALUGUEL'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AlugueisRoutingModule { }
