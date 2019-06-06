import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from '../../../node_modules/primeng/components/table/table';
import { TooltipModule } from '../../../node_modules/primeng/components/tooltip/tooltip';
import { ButtonModule } from '../../../node_modules/primeng/components/button/button';
import { InputTextModule } from '../../../node_modules/primeng/components/inputtext/inputtext';
import { InputMaskModule } from '../../../node_modules/primeng/components/inputmask/inputmask';
import { ChipsModule } from '../../../node_modules/primeng/components/chips/chips';
import { SplitButtonModule } from '../../../node_modules/primeng/components/splitbutton/splitbutton';
import { SelectButtonModule } from '../../../node_modules/primeng/components/selectbutton/selectbutton';
import { DropdownModule } from '../../../node_modules/primeng/components/dropdown/dropdown';
import { PanelModule } from '../../../node_modules/primeng/components/panel/panel';
import { DialogModule } from '../../../node_modules/primeng/components/dialog/dialog';
import { CalendarModule } from 'primeng/calendar';
import { SpinnerModule } from 'primeng/spinner';
import { MultiSelectModule } from '../../../node_modules/primeng/primeng';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FieldsetModule } from 'primeng/fieldset';

// tslint:disable-next-line:quotemark
import { CurrencyMaskModule } from "ng2-currency-mask";

import { ContratoCadastroComponent } from './contrato-cadastro/contrato-cadastro.component';
import { ContratoPesquisaComponent } from './contrato-pesquisa/contrato-pesquisa.component';
import { ContratosRoutingModule } from './contratos-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    TooltipModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    ChipsModule,
    SplitButtonModule,
    SelectButtonModule,
    DropdownModule,
    PanelModule,
    DialogModule,
    MultiSelectModule,
    CalendarModule,
    SpinnerModule,
    RadioButtonModule,
    FileUploadModule,
    ProgressSpinnerModule,
    FieldsetModule,

    CurrencyMaskModule,

    SharedModule,
    ContratosRoutingModule
  ],
  declarations: [
    ContratoCadastroComponent,
    ContratoPesquisaComponent,
  ]
})
export class ContratosModule { }
