import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MessageService } from '../../../../node_modules/primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { AuthService } from '../../seguranca/auth.service';
import { ProcuradorService } from '../procurador.service';
import { Pessoa } from '../../core/models';

@Component({
  selector: 'app-procurador-pesquisa',
  templateUrl: './procurador-pesquisa.component.html',
  styles: [`
  .col-acoes-header2 {
    width: 100px;
  }

  .col-acoes2 {
    width: 100px;
    text-align: center;
  }

  .col-data-center {
    text-align: center;
  }
`],
  encapsulation: ViewEncapsulation.None
})
export class ProcuradorPesquisaComponent implements OnInit {

  name: string;
  listObj: Pessoa[];

  constructor(
    public auth: AuthService,
    private service: ProcuradorService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService) { }

  ngOnInit() {
    this.name = 'Procurador';
    this.getAll();
  }

  confirmDelete(obj: Pessoa) {
    this.confirmation.confirm({
      message: `Excluir ${this.name} ?`,
      accept: () => {
        this.delete(obj);
      }
    });
  }

  private getAll() {
    this.service.findAll()
      .then(resultado => {
        this.listObj = resultado;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private delete(obj: Pessoa) {
    this.service.delete(obj.id)
      .then(() => {
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: `${this.name} excluido.` });
        this.getAll();
      })
      .catch(erro => {
        this.errorHandler.handle(erro);
      });
  }
}
