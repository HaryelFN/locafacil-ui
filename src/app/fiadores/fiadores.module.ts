import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';

import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { SharedModule } from '../shared/shared.module';

import { FiadoresRoutingModule } from './fiadores-routing.module';
import { FiadorCadastroComponent } from './fiador-cadastro/fiador-cadastro.component';
import { FiadorPesquisaComponent } from './fiador-pesquisa/fiador-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputTextModule,
    InputMaskModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    DropdownModule,

    SharedModule,
    FiadoresRoutingModule,
    NgxViacepModule
  ],
  declarations: [FiadorCadastroComponent, FiadorPesquisaComponent]
})
export class FiadoresModule { }
