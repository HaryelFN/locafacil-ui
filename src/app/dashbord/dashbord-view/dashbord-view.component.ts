import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as moment from 'moment';

import { MessageService } from 'primeng/components/common/messageservice';

import { AuthService } from 'src/app/seguranca/auth.service';
import { AluguelService } from '../../alugueis/aluguel.service';
import { ImovelService } from '../../imoveis/imovel.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Aluguel, Contrato } from '../../core/models';
import { ContratoService } from '../../contratos/contrato.service';
import { DashbordService } from './dashbord.service';

@Component({
  selector: 'app-dashbord-view',
  templateUrl: './dashbord-view.component.html',
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
export class DashbordViewComponent implements OnInit {

  livre = 0;
  ocupado = 0;

  dataImoveis: any;
  dataRendimentos: any;

  displayDialog: boolean;
  listAlugueis: Aluguel[];
  listContrato: Contrato[];
  selectedAluguel: Aluguel;

  constructor(
    public auth: AuthService,
    private service: DashbordService,
    private aluguelService: AluguelService,
    private imovelService: ImovelService,
    private contratoService: ContratoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getStatusImoveis();
    this.getCaixaMes();
    this.getAlugueisVencidos();
    this.getContratosVencidos();
  }

  getStatusImoveis() {
    this.imovelService.qtdImoveis().then(i => {
      this.livre = i.livre;
      this.ocupado = i.ocupado;
      this.dataImoveis = {
        labels: ['Livres', 'Ocupados'],
        datasets: [
          {
            data: [this.livre, this.ocupado],
            backgroundColor: [
              '#2EAB6F',
              '#36A2EB'
            ],
            hoverBackgroundColor: [
              '#78C9A2',
              '#36A2EB'
            ]
          }]
      };
    });
  }

  getCaixaMes() {
    this.service.getTotalMesReceita().then(list => {
      this.dataRendimentos = list;
      this.dataRendimentos = {
        labels: this.dataRendimentos.map(dado => dado.nomeMes),
        datasets: [
          {
            label: 'Receita',
            fill: false,
            borderColor: '#4bc0c0',
            data: this.dataRendimentos.map(dado => dado.total)
          }
        ]
      };
    }).catch(erro => this.errorHandler.handle(erro));
  }

  onDialogHide() {
    this.displayDialog = false;
    this.selectedAluguel = null;
  }

  openDialog(obj: Aluguel) {
    this.aluguelService.findById(obj.id).then(aux => {

      if (obj.status === 'A Vencer') {
        aux.desconto = aux.valor * (10 / 100);
      } else {
        aux.desconto = 0;
      }

      aux.total = (aux.valor - aux.desconto);
      aux.dtPagamento = moment(moment(), 'YYYY-MM-DD').toDate();
      this.selectedAluguel = aux;
      this.displayDialog = true;
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

  receber(obj: Aluguel) {
    this.aluguelService.receber(obj)
      .then(a => {
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: 'Aluguel recebido.' });
        // this.findAlugueisByContrato();
        this.getCaixaMes();
        this.onDialogHide();
        this.openPDF(a.id);
        this.getAlugueisVencidos();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private getAlugueisVencidos() {
    this.aluguelService.vencidos().then(list => {
      this.listAlugueis = list;
    }).catch(erro => this.errorHandler.handle(erro));
  }

  private getContratosVencidos(): any {
    this.contratoService.vencidos().then(list => {
      this.listContrato = list;
    }).catch(erro => this.errorHandler.handle(erro));
  }

  private openPDF(id: number) {
    this.aluguelService.gerarRecibo(id).subscribe((data) => {
      const file = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.setTimeout(window.open(fileURL), 5000);
    });
  }
}
