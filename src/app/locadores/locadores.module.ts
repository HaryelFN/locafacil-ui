import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from '../../../node_modules/primeng/components/selectbutton/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { RadioButtonModule } from 'primeng/radiobutton';

import { NgxViacepModule } from '@brunoc/ngx-viacep';

import { LocadorPesquisaComponent } from './locador-pesquisa/locador-pesquisa.component';
import { LocadorCadastroComponent } from './locador-cadastro/locador-cadastro.component';
import { LocadoresRoutingModule } from './locadores-routing.module';
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
    ChipsModule,
    SplitButtonModule,
    SelectButtonModule,
    DropdownModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule,

    SharedModule,
    LocadoresRoutingModule,
    NgxViacepModule
  ],
  declarations: [
    LocadorPesquisaComponent,
    LocadorCadastroComponent
  ]
})
export class LocadoresModule { }
