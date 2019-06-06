import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { MessageService } from '../../../../node_modules/primeng/components/common/messageservice';
import { ConfirmationService } from '../../../../node_modules/primeng/components/common/confirmationservice';
import { SelectItem } from 'primeng/components/common/selectitem';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { AuthService } from '../../seguranca/auth.service';
import { LocatarioService } from '../locatario.service';
import { Pessoa } from 'src/app/core/models';

@Component({
  selector: 'app-locatario-pesquisa',
  templateUrl: './locatario-pesquisa.component.html',
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
export class LocatarioPesquisaComponent implements OnInit {

  listObj: Pessoa[];
  // sortOptions: SelectItem[];

  constructor(
    private auth: AuthService,
    private service: LocatarioService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit() {
    // this.sortOptions = [
    //   { label: 'Todos', value: '' },
    //   { label: 'Sim', value: 'Sim' },
    //   { label: 'Não', value: 'Não' }
    // ];

    this.getAll();
  }

  confirmDelete(obj: Pessoa) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
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
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: 'Locatario excluido.' });
        this.getAll();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
