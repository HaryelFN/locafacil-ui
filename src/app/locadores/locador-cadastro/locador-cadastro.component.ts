import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';

import { MessageService } from '../../../../node_modules/primeng/components/common/messageservice';
import { NgxViacepService, Endereco, ErroCep } from '@brunoc/ngx-viacep';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { LocadorService } from '../locador.service';
import { Valid } from 'src/app/shared/validators/valid';

@Component({
  selector: 'app-locador-cadastro',
  templateUrl: './locador-cadastro.component.html'
})
export class LocadorCadastroComponent implements OnInit {

  ufs = [
    { label: 'AC', value: 'AC' },
    { label: 'AL', value: 'AL' },
    { label: 'AP', value: 'AP' },
    { label: 'AM', value: 'AM' },
    { label: 'BA', value: 'BA' },
    { label: 'CE', value: 'CE' },
    { label: 'DF', value: 'DF' },
    { label: 'ES', value: 'ES' },
    { label: 'GO', value: 'GO' },
    { label: 'MA', value: 'MA' },
    { label: 'MT', value: 'MT' },
    { label: 'MS', value: 'MS' },
    { label: 'MG', value: 'MG' },
    { label: 'PA', value: 'PA' },
    { label: 'PB', value: 'PB' },
    { label: 'PR', value: 'PR' },
    { label: 'PE', value: 'PE' },
    { label: 'PI', value: 'PI' },
    { label: 'RJ', value: 'RJ' },
    { label: 'RN', value: 'RN' },
    { label: 'RS', value: 'RS' },
    { label: 'RO', value: 'RO' },
    { label: 'RR', value: 'RR' },
    { label: 'SC', value: 'SC' },
    { label: 'SP', value: 'SP' },
    { label: 'SE', value: 'SE' },
    { label: 'TO', value: 'TO' }
  ];

  sexo = [
    { label: 'Masculino', value: 'M' },
    { label: 'Feminino', value: 'F' },
  ];

  estadosCivis = [
    { label: 'Solteiro(a) ', value: 'Solteiro(a)' },
    { label: 'Casado(a)', value: 'Casado(a)' },
    { label: 'Separado(a)', value: 'Separado(a)' },
    { label: 'Divorciado(a)', value: 'Divorciado(a)' },
    { label: 'Viúvo(a)', value: 'Viúvo(a)' }
  ];

  title: string;
  submitted = false;
  formulario: FormGroup;

  constructor(
    private service: LocadorService,
    private messageService: MessageService,
    private viaCep: NgxViacepService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.title = 'Locador';
    this.configForm();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadObj(id);
    }
  }

  configForm() {
    this.formulario = this.formBuilder.group({
      id: [],
      sexo: [null, Validators.required],
      nome: [null, [Validators.required, Validators.min(3)]],
      rg: [null, Validators.required],
      cpf: [null, Validators.required],
      nacionalidade: [null, Validators.required],
      estadoCivil: [null, Validators.required],
      profissao: [null, Validators.required],
      telefone: [null, Validators.required],
      email: [null],
      cep: [''],
      uf: ['', Validators.required],
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: [],
      complemento: []
    });
  }

  get edit() {
    return Boolean(this.formulario.get('id').value);
  }

  get f() {
    return this.formulario.controls;
  }

  loadObj(id: number) {
    this.service.findById(id)
      .then(obj => {
        this.formulario.patchValue(obj);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  onSave() {
    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    } else {
      if (this.edit) {
        this.updateObj();
      } else {
        this.addObj();
      }
    }
  }

  addObj() {
    this.service.save(this.formulario.value)
      .then(() => {
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: `${this.title} adicionado.` });
        this.formulario.reset();
        this.submitted = false;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  updateObj() {
    this.service.update(this.formulario.value)
      .then(obj => {
        this.formulario.patchValue(obj);
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: `${this.title} atualizado.` });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  isCpf() {
    if (!Valid.isCpf(this.formulario.get('cpf').value)) {
      this.messageService.add({ key: 'toast', severity: 'warn', summary: 'Atenção', detail: 'CPF Inválido!' });
      this.formulario.get('cpf').setValue(null);
    }
  }

  removeChars() {
    this.formulario.get('cpf').setValue(this.formulario.get('cpf').value.replace(/[^\d]+/g, ''));
  }

  searchCep() {
    this.viaCep.buscarPorCep(this.formulario.get('cep').value).then((endereco: Endereco) => {
      this.formulario.get('uf').setValue(endereco.uf);
      this.formulario.get('cidade').setValue(endereco.localidade);
      this.formulario.get('bairro').setValue(endereco.bairro);
      this.formulario.get('logradouro').setValue(endereco.logradouro);
      this.formulario.get('complemento').setValue(endereco.complemento);
    }).catch((error: ErroCep) => {
      console.log(error.message);
    });
  }
}
