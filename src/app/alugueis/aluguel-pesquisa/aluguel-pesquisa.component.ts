import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageService } from 'primeng/components/common/messageservice';

import * as moment from 'moment';

import { AluguelService } from '../aluguel.service';
import { Aluguel } from '../../core/models';
import { ContratoService } from '../../contratos/contrato.service';

@Component({
  selector: 'app-aluguel-pesquisa',
  templateUrl: './aluguel-pesquisa.component.html',
  styles: [`
  .col-acoes-header {
    width: 50px;
  }

  .col-acoes {
    width: 50px;
    margin-right: .50em;
  }

  .col-data-body {
    text-align: center;
  }

  .col-right-body {
    text-align: right;
  }
`],
  encapsulation: ViewEncapsulation.None
})
export class AluguelPesquisaComponent implements OnInit {

  contratosOptions: any[];
  idContrato: any;

  @ViewChild('tabela') grid;

  displayDialog: boolean;
  listObj: Aluguel[];
  selectedObj: Aluguel;

  constructor(
    private contratoService: ContratoService,
    private aluguelService: AluguelService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService
  ) {
    this.listObj = [];
  }

  ngOnInit() {
    this.findAllContrato();
  }

  findAlugueisByContrato() {
    this.aluguelService.findByLocatario(this.idContrato).then(lista => {
      this.listObj = this.setStatus(lista);
    }).catch(erro => this.errorHandler.handle(erro));
  }

  findAllContrato() {
    this.contratoService.findAll().then(lista => {
      // tslint:disable-next-line:max-line-length
      this.contratosOptions = lista.map(c => ({ label: `${c.locatario1.nome}`, find: `${c.locatario1.cpf} ${c.locatario1.nome} ${c.imovel.logradouro} ${c.imovel.bairro}`, value: c.id }));
    }).catch(erro => this.errorHandler.handle(erro));
  }

  setStatus(list: Aluguel[]): Aluguel[] {
    list.forEach(o => {
      if (o.dtPagamento) {
        o.status = 'Liquidado';
        o.color = '#1CAA12';
      } else {
        if (moment(moment(o.dtVencimento).format('YYYY-MM-DD')).isBefore(moment().subtract(1, 'days').format('YYYY-MM-DD'))) {
          o.status = 'Devedor';
          o.color = '#FF0000';
        } else {
          o.status = 'A Vencer';
          o.color = '#0A4C78';
        }
      }
    });
    return list;
  }

  openDialog(obj: Aluguel) {
    this.aluguelService.findById(obj.id).then(aux => {

      if (obj.status === 'A Vencer') {
        if (aux.desconto !== aux.valor) {
          aux.desconto = aux.valor * (10 / 100);
        }
      } else {
        aux.desconto = 0;
      }

      aux.total = (aux.valor - aux.desconto);
      aux.dtPagamento = moment(moment(), 'YYYY-MM-DD').toDate();

      this.selectedObj = aux;
      this.displayDialog = true;
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

  receber(obj: Aluguel) {
    console.log(obj);
    this.aluguelService.receber(obj)
      .then(a => {
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: 'Aluguel recebido.' });
        this.findAlugueisByContrato();
        this.onDialogHide();
        this.openPDF(a.id);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  onDialogHide() {
    this.displayDialog = false;
    this.selectedObj = null;
  }

  private openPDF(id: number) {
    this.aluguelService.gerarRecibo(id).subscribe((data) => {
      const file = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.setTimeout(window.open(fileURL), 5000);
    });
  }
}
