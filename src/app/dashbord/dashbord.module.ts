import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from '../../../node_modules/primeng/components/tooltip/tooltip';
import { DialogModule } from '../../../node_modules/primeng/components/dialog/dialog';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { DashbordViewComponent } from './dashbord-view/dashbord-view.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    ChartModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    DialogModule,
    SharedModule,

    DashbordRoutingModule
  ],
  declarations: [DashbordViewComponent]
})
export class DashbordModule { }
