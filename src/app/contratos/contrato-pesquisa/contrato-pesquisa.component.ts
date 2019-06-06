import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { ContratoService } from '../contrato.service';
import { Contrato } from '../../core/models';

@Component({
  selector: 'app-contrato-pesquisa',
  templateUrl: './contrato-pesquisa.component.html',
  styles: [`
  .col-data-header {
    width: 130px;
  }

  .col-data-body {
    text-align: center;
  }

  .col-valor-header {
    width: 140px;
  }

  .col-valor-body {
    text-align: right;
  }

  .col-acoes-header3 {
    width: 150px;
  }

  .col-acoes3 {
    text-align: center;
  }
`],
  encapsulation: ViewEncapsulation.None
})
export class ContratoPesquisaComponent implements OnInit {

  listObj: Contrato[];

  constructor(
    private service: ContratoService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getAll();
  }

  onDownContrato(codigo: number) {
    this.service.downDocContrato(codigo).subscribe((data) => {
      const file = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  private getAll() {
    this.service.findAll()
      .then(response => {
        this.listObj = response;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
