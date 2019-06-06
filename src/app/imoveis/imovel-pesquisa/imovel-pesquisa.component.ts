import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as moment from 'moment';

import { SelectItem } from '../../../../node_modules/primeng/components/common/selectitem';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/components/common/messageservice';

import { Imovel, DespesaImovel, DespesaImovelNewDTO, Contrato } from '../../core/models';
import { ImovelService } from '../imovel.service';

@Component({
  selector: 'app-imovel-pesquisa',
  templateUrl: './imovel-pesquisa.component.html',
  styles: [`
  .col-acoes-header3 {
    width: 140px;
  }

  .col-acoes3 {
    width: 50px;
    margin-right: .50em;
  }

  .col-data-center {
    text-align: center;
  }
`],
  encapsulation: ViewEncapsulation.None
})
export class ImovelPesquisaComponent implements OnInit {

  pt: any;
  date_now: number;
  minDate: Date;
  maxDate: Date;

  formulario: FormGroup;
  submitted = false;

  listObj: Imovel[];
  sortOptions: SelectItem[];

  idImovel: number;

  dialogDespesas: boolean;
  dialogDespesa: boolean;
  listDespesas: DespesaImovel[];
  editDespesa: boolean;

  auxDespesa = {
    descricao: '',
    data: '',
    valor: 0,
    idImovel: 0
  };

  dialogContratos: boolean;
  listContratos: Contrato[];

  constructor(
    private service: ImovelService,
    private errorHandler: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private confirmation: ConfirmationService,
    private messageService: MessageService, ) { }

  ngOnInit() {

    this.configCalendar();
    this.configForm();

    this.sortOptions = [
      { label: 'Todos', value: '' },
      { label: 'Livre', value: 'livre' },
      { label: 'Ocupado', value: 'ocupado' }
    ];

    this.getAll();
  }

  private getAll() {
    this.service.findAll()
      .then(response => {
        this.listObj = response;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  openDialogDespesas(id: number) {
    this.service.getDespesasByIdImovel(id).then(list => {
      this.idImovel = id;
      this.listDespesas = list;
      this.dialogDespesas = true;
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

  onDialogHideDespesas() {
    this.idImovel = null;
    this.dialogDespesas = false;
    this.listDespesas = [];
  }

  openDespesa(obj: DespesaImovel) {
    this.editDespesa = true;
    this.formulario.patchValue(obj);
    this.formulario.disable();
    this.dialogDespesa = true;
  }

  onDialogHideDespesa() {
    this.formulario.reset();
    this.dialogDespesa = false;
  }

  onAddDespesa() {
    this.editDespesa = false;
    this.formulario.reset();
    this.formulario.enable();
    this.dialogDespesa = true;
  }

  openDialogContratos(id: number) {
    this.service.getContratosByIdImovel(id).then(list => {
      this.listContratos = list;
      this.dialogContratos = true;
    })
      .catch(erro => this.errorHandler.handle(erro));
  }

  onDialogHideContratos() {
    this.idImovel = null;
    this.dialogContratos = false;
    this.listContratos = [];
  }

  saveDespesa() {
    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    } else {

      this.auxDespesa.descricao = this.formulario.get('descricao').value;
      this.auxDespesa.data = this.formulario.get('data').value;
      this.auxDespesa.valor = this.formulario.get('valor').value;
      this.auxDespesa.idImovel = this.idImovel;

      this.service.saveDepesa(this.auxDespesa)
        .then(() => {
          this.dialogDespesa = false;
          this.openDialogDespesas(this.idImovel);
          this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: 'Despesa cadastrada.' });
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
  }

  onRemoveDespesa(id: number) {
    this.service.deleteDespesa(id)
      .then(() => {
        this.dialogDespesa = false;
        this.service.getDespesasByIdImovel(this.idImovel).then(list => {
          this.listDespesas = list;
        })
          .catch(erro => this.errorHandler.handle(erro));

        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: 'Despesa removida.' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  configForm() {
    this.formulario = this.formBuilder.group({
      id: [],
      data: [new Date(), Validators.required],
      valor: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  get f() {
    return this.formulario.controls;
  }

  calcDiff(inicio: Date, fim: Date): number {
    return moment(fim).diff(moment(inicio), 'months');
  }

  private configCalendar() {
    this.minDate = new Date();

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }

}
