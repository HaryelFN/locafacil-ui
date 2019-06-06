import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FonePipe } from './pipes/fone.pipe';
import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe.';
import { DisableControlDirective } from './disable-control.directive';
import { SummaryPipe } from './pipes/summary.pipe';
import { Summary2Pipe } from './pipes/summary2.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CpfCnpjPipe,
    FonePipe,
    CapitalizePipe,
    SummaryPipe,
    Summary2Pipe,
    DisableControlDirective
  ],
  exports: [
    CpfCnpjPipe,
    FonePipe,
    CapitalizePipe,
    SummaryPipe,
    Summary2Pipe,
    DisableControlDirective
  ]
})
export class SharedModule { }
