import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MessageService } from '../../../../node_modules/primeng/components/common/messageservice';
import { ConfirmationService } from '../../../../node_modules/primeng/components/common/confirmationservice';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { AuthService } from '../../seguranca/auth.service';
import { FiadoresService } from '../fiadores.service';
import { Pessoa } from 'src/app/core/models';

@Component({
  selector: 'app-fiador-pesquisa',
  templateUrl: './fiador-pesquisa.component.html',
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
  }
`],
  encapsulation: ViewEncapsulation.None
})
export class FiadorPesquisaComponent implements OnInit {

  listObj: Pessoa[];

  constructor(
    private auth: AuthService,
    private service: FiadoresService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getAll();
  }

  confirmDelete(obj: Pessoa) {
    this.confirmation.confirm({
      message: 'Excluir fiador?',
      accept: () => {
        this.delete(obj);
      }
    });
  }

  private getAll() {
    this.service.findAll()
      .then(response => {
        this.listObj = response;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private delete(obj: Pessoa) {
    this.service.delete(obj.id)
      .then(() => {
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: 'Fiador excluido.' });
        this.getAll();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
