import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
  { path: 'dashbord', loadChildren: './dashbord/dashbord.module#DashbordModule' },
  { path: 'alugueis', loadChildren: './alugueis/alugueis.module#AlugueisModule' },
  { path: 'repasses', loadChildren: './repasses/repasses.module#RepassesModule' },
  { path: 'contratos', loadChildren: './contratos/contratos.module#ContratosModule' },
  { path: 'locatarios', loadChildren: './locatarios/locatarios.module#LocatariosModule' },
  { path: 'fiadores', loadChildren: './fiadores/fiadores.module#FiadoresModule' },
  { path: 'imoveis', loadChildren: './imoveis/imoveis.module#ImoveisModule' },
  { path: 'locadores', loadChildren: './locadores/locadores.module#LocadoresModule' },
  { path: 'procuradores', loadChildren: './procuradores/procuradores.module#ProcuradoresModule' },

  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
