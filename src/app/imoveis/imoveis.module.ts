import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SpinnerModule } from 'primeng/spinner';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { LightboxModule } from 'primeng/lightbox';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from '../../../node_modules/primeng/components/tooltip/tooltip';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from '../../../node_modules/primeng/components/dialog/dialog';
import { CalendarModule } from 'primeng/calendar';

// tslint:disable-next-line:quotemark
import { CurrencyMaskModule } from "ng2-currency-mask";
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { AgmCoreModule } from '@agm/core';

import { SharedModule } from '../shared/shared.module';
import { ImoveisRoutingModule } from 'src/app/imoveis/imoveis-routing.module';
import { ImovelPesquisaComponent } from './imovel-pesquisa/imovel-pesquisa.component';
import { ImovelCadastroComponent } from 'src/app/imoveis/imovel-cadastro/imovel-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ToastModule,
    TableModule,
    InputTextModule,
    SpinnerModule,
    InputMaskModule,
    ButtonModule,
    DataViewModule,
    DropdownModule,
    PanelModule,
    DropdownModule,
    LightboxModule,
    MessageModule,
    FileUploadModule,
    ProgressSpinnerModule,
    TooltipModule,
    FieldsetModule,
    DialogModule,
    CalendarModule,

    CurrencyMaskModule,
    NgxViacepModule,
    AgmCoreModule,

    SharedModule,
    ImoveisRoutingModule
  ],
  declarations: [
    ImovelPesquisaComponent,
    ImovelCadastroComponent
  ]
})
export class ImoveisModule { }
