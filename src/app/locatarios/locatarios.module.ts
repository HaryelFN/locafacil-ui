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

import { LocatarioCadastroComponent } from './locatario-cadastro/locatario-cadastro.component';
import { LocatarioPesquisaComponent } from './locatario-pesquisa/locatario-pesquisa.component';
import { LocatariosRoutingModule } from './locatarios-routing.module';
import { SharedModule } from '../shared/shared.module';

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
    LocatariosRoutingModule,
    NgxViacepModule
  ],
  declarations: [LocatarioCadastroComponent, LocatarioPesquisaComponent]
})
export class LocatariosModule { }
