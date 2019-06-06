import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SelectItem } from 'primeng/components/common/selectitem';
import * as moment from 'moment';

import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { AuthService } from 'src/app/seguranca/auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { RepasseService } from '../repasse.service';
import { Repasse } from 'src/app/core/models';

@Component({
  selector: 'app-repasse-pesquisa',
  templateUrl: './repasse-pesquisa.component.html',
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
export class RepassePesquisaComponent implements OnInit {

  selectedObj = {
    id: 0,
    dtEntrada: null,
    dtPagamento: null,
    despesa: 0,
    info_despesa: '',
    receita: 0,
    info_receita: '',
    referente: ''
  };

  name: string;
  displayDialog: boolean;
  listObj: Repasse[];
  sortOptions: SelectItem[];

  constructor(
    private auth: AuthService,
    private service: RepasseService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService) { }

  ngOnInit() {

    this.sortOptions = [
      { label: 'Todos', value: '' },
      { label: 'Receber', value: null },
      { label: 'Recebido', value: !null }
    ];


    this.name = 'Procurador';
    this.getAll();
  }

  private getAll() {
    this.service.findAll()
      .then(resultado => {
        this.listObj = resultado;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  openDialog(obj: Repasse) {
    this.service.findById(obj.id).then(aux => {

      this.selectedObj.id = aux.id;
      this.selectedObj.dtEntrada = aux.dtEntrada;
      this.selectedObj.dtPagamento = aux.dtPagamento;
      this.selectedObj.despesa = aux.despesa;
      this.selectedObj.info_despesa = aux.info_despesa;
      this.selectedObj.receita = aux.receita;
      this.selectedObj.info_receita = aux.info_receita;
      this.selectedObj.referente = aux.referente;

      this.displayDialog = true;
    }).catch(erro => this.errorHandler.handle(erro));
  }

  onDialogHide() {
    this.selectedObj = {
      id: 0,
      dtEntrada: null,
      dtPagamento: null,
      despesa: 0,
      info_despesa: '',
      receita: 0,
      info_receita: '',
      referente: ''
    };

    this.displayDialog = false;
  }

  receber(obj: Repasse) {
    obj.dtPagamento = moment(moment(), 'YYYY-MM-DD').toDate();
    this.service.update(obj).then(r => {
      this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: `Repasse recebido` });
      this.displayDialog = false;
      this.getAll();
    }).catch(erro => this.errorHandler.handle(erro));
  }
}
