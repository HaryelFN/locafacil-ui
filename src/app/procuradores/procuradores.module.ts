import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from '../../../node_modules/primeng/components/selectbutton/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';

import { ProcuradorCadastroComponent } from './procurador-cadastro/procurador-cadastro.component';
import { ProcuradorPesquisaComponent } from './procurador-pesquisa/procurador-pesquisa.component';
import { ProcuradoresRoutingModule } from './procuradores-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxViacepModule } from '@brunoc/ngx-viacep';


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
    DropdownModule,
    ToastModule,
    RadioButtonModule,

    SharedModule,
    ProcuradoresRoutingModule,
    NgxViacepModule
  ],
  declarations: [
    ProcuradorPesquisaComponent,
    ProcuradorCadastroComponent
  ]
})
export class ProcuradoresModule { }
