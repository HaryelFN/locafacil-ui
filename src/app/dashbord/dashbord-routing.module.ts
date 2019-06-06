import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from './../seguranca/auth.guard';
import { DashbordViewComponent } from './dashbord-view/dashbord-view.component';

const routes: Routes = [
  {
    path: '',
    component: DashbordViewComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LOCADOR'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashbordRoutingModule { }
