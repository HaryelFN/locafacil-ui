import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

import { MenuItem } from 'primeng/components/common/menuitem';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import * as moment from 'moment';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { ImovelService } from '../../imoveis/imovel.service';
import { LocadorService } from '../../locadores/locador.service';
import { ProcuradorService } from '../../procuradores/procurador.service';
import { ContratoService } from '../contrato.service';
import { AuthService } from '../../seguranca/auth.service';
import { LocatarioService } from 'src/app/locatarios/locatario.service';
import { FiadoresService } from 'src/app/fiadores/fiadores.service';
import { Contrato, Pessoa } from 'src/app/core/models';
import { AluguelService } from 'src/app/alugueis/aluguel.service';

@Component({
  selector: 'app-contrato-cadastro',
  templateUrl: './contrato-cadastro.component.html',
  styles: [`
        .ui-steps .ui-steps-item {
            width: 25%;
        }

        .ui-steps.steps-custom {
            margin-bottom: 30px;
        }

        .ui-steps.steps-custom .ui-steps-item .ui-menuitem-link {
            height: 10px;
            padding: 0 1em;
        }

        .ui-steps.steps-custom .ui-steps-item .ui-steps-number {
            background-color: #0081c2;
            color: #FFFFFF;
            display: inline-block;
            width: 36px;
            border-radius: 50%;
            margin-top: -14px;
            margin-bottom: 10px;
        }

        .ui-steps.steps-custom .ui-steps-item .ui-steps-title {
            color: #555555;
        }
    `],
  encapsulation: ViewEncapsulation.None
})
export class ContratoCadastroComponent implements OnInit {

  aux = {
    dataInicio: '',
    dataFim: '',
    duracao: 0,
    diaVencimento: '',
    valorAluguel: 0,
    agregarIptu: '',
    // valorIptu: 0,
    caucao: '',
    valorCaucao: 0,
    obs: '',
    situacao: '',
    idImovel: 0,
    idLocador: 0,
    idProcurador: 0,
    idLocatario1: 0,
    idLocatario2: 0,
    idFiador: 0
  };

  itemsMenu: MenuItem[];
  activeIndex = 1;

  pt: any;
  date_now: number;
  minDate: Date;
  maxDate: Date;

  disableFiador = false;
  closeFiador: boolean;

  formulario: FormGroup;
  submitted = false;

  loadingUpload = false;
  displayDialog: boolean;
  contratoSelected: Contrato;

  imoveisOptions: any[];
  locatariosOptions: any[];
  fiadoresOptions: any[];
  locadoresOptions: any[];
  procuradoresOptions: any[];

  auxInicio = '';
  auxDuracao = '';
  auxFim = '';
  auxDiaVencimento = '';
  auxValor = '';

  auxIptu = 0;
  resultIptu = 0;

  valueCaucao = 0;

  duracaoOptions = [
    { label: '12 Meses', value: '12' },
    { label: '24 Meses', value: '24' },
    { label: '36 Meses', value: '36' },
    { label: '60 Meses', value: '60' }
  ];

  constructor(
    private auth: AuthService,
    private service: ContratoService,
    private aluguelService: AluguelService,
    private imovelService: ImovelService,
    private locatarioService: LocatarioService,
    private fiadorService: FiadoresService,
    private locadorService: LocadorService,
    private procuradorService: ProcuradorService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {

    this.configCalendar();
    this.configForm();

    this.closeFiador = true;

    this.loadImoveisLivres();
    this.loadLocatarios();
    this.loadFiadores();
    this.loadLocadores();
    this.loadProcuradores();

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.loadContrato(id);
      this.loadImoveis();
      this.formulario.disable();
    }
  }

  detectmob() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    } else {
      return false;
    }
  }

  configForm() {
    this.formulario = this.formBuilder.group({
      id: [null],
      dataInicio: [new Date(), Validators.required],
      dataFim: [, Validators.required],
      duracao: ['', Validators.required],
      diaVencimento: ['', Validators.required],
      valorAluguel: ['', Validators.required],
      agregarIptu: ['F'],
      caucao: ['F'],
      obs: [null],
      situacao: [''],
      imovel: this.formBuilder.group({
        id: [null, Validators.required],
        logradouro: []
      }),
      locatario1: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      locatario2: this.formBuilder.group({
        id: [null],
        nome: []
      }),
      fiador: this.formBuilder.group({
        id: [null],
        nome: []
      }),
      locador: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      procurador: this.formBuilder.group({
        id: [null],
        nome: []
      })
    });
  }

  get edit() {
    return Boolean(this.formulario.get('id').value);
  }

  get f() {
    return this.formulario.controls;
  }

  salvar() {
    if (this.edit) {
      this.onConfirmDelete();
    } else {
      this.submitted = true;
      if (this.formulario.invalid) {
        console.log('invalid');
        return;
      } else {
        this.adicionarContrato();
      }
    }
  }

  private adicionarContrato() {

    this.locatarioIsEnd();

    this.formulario.get('situacao').setValue('A');
    this.aux.dataInicio = this.formulario.get('dataInicio').value;
    this.aux.dataFim = this.formulario.get('dataFim').value;
    this.aux.duracao = this.formulario.get('duracao').value;
    this.aux.diaVencimento = this.formulario.get('diaVencimento').value;
    this.aux.valorAluguel = this.formulario.get('valorAluguel').value;
    this.aux.agregarIptu = this.formulario.get('agregarIptu').value;
    this.aux.caucao = this.formulario.get('caucao').value;

    // if (this.aux.agregarIptu === 'V') {
    //   this.aux.valorIptu = this.resultIptu;
    // }

    if (this.aux.caucao === 'V') {
      this.aux.valorCaucao = this.valueCaucao;
    }

    this.aux.obs = this.formulario.get('obs').value;
    this.aux.situacao = this.formulario.get('situacao').value;

    this.aux.idImovel = this.formulario.get('imovel.id').value;
    this.aux.idLocador = this.formulario.get('locador.id').value;
    this.aux.idProcurador = this.formulario.get('procurador.id').value;
    this.aux.idLocatario1 = this.formulario.get('locatario1.id').value;
    this.aux.idLocatario2 = this.formulario.get('locatario2.id').value;
    this.aux.idFiador = this.formulario.get('fiador.id').value;

    this.service.save(this.aux)
      .then(c => {
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: 'Contrato adicionado.' });
        this.formulario.reset();
        this.submitted = false;
        this.closeFiador = true;
        this.router.navigate(['/contratos']);
        this.openPDF(c.id);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  onRenovar() {
    this.submitted = true;
    this.formulario.get('situacao').setValue('A');
    this.service.update(this.formulario.value)
      .then(c => {
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: 'Contrato renovado.' });
        this.formulario.reset();
        this.submitted = false;
        this.closeFiador = true;
        this.router.navigate(['/contratos']);
        this.openPDF(c.id);
        this.loadContrato(c.id);
        this.displayDialog = false;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  onConfirmDelete() {
    this.confirmation.confirm({
      // tslint:disable-next-line:max-line-length
      message: 'Atenção ao exluir esse contrato, todo o histórico de alugueis relacionados ao mesmo, serão excluidos!. Tem certeza que deseja excluir?',
      accept: () => {
        this.delete();
      }
    });
  }

  private delete() {
    this.service.delete(this.formulario.get('id').value)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Contrato excluído com sucesso!' });
        this.router.navigate(['/contratos']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  private openPDF(id: number) {
    this.service.downDocContrato(id).subscribe((data) => {
      const file = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  loadContrato(id: number) {
    this.service.findById(id)
      .then(obj => {
        this.formulario.get('id').setValue(obj.id);
        this.formulario.get('dataInicio').setValue(obj.dataInicio);
        this.formulario.get('dataFim').setValue(obj.dataFim);
        this.formulario.get('duracao').setValue(obj.duracao);
        this.formulario.get('valorAluguel').setValue(obj.valorAluguel);
        this.formulario.get('diaVencimento').setValue(obj.diaVencimento);

        this.formulario.get('agregarIptu').setValue(obj.agregarIptu);
        // if (obj.agregarIptu === 'V') {
        // this.imovelService.findById(obj.imovel.id).then(i => {
        //   this.resultIptu = (i.valorIptu / 12);
        // });
        // this.resultIptu = obj.valorIptu;
        // }

        this.formulario.get('caucao').setValue(obj.caucao);
        if (obj.caucao === 'V') {
          this.valueCaucao = obj.valorCaucao;
        }

        this.formulario.get('obs').setValue(obj.obs);

        this.formulario.get('imovel.id').setValue(obj.imovel.id);
        this.formulario.get('imovel.logradouro').setValue(obj.imovel.logradouro);

        this.formulario.get('locatario1.id').setValue(obj.locatario1.id);
        this.formulario.get('locatario1.nome').setValue(obj.locatario1.nome);

        if (obj.locatario2) {
          this.formulario.get('locatario2.id').setValue(obj.locatario2.id);
          this.formulario.get('locatario2.nome').setValue(obj.locatario2.nome);
        }

        if (obj.fiador) {
          this.closeFiador = false;
          this.formulario.get('fiador.id').setValue(obj.fiador.id);
          this.formulario.get('fiador.nome').setValue(obj.fiador.nome);
        }

        this.formulario.get('locador.id').setValue(obj.locador.id);
        this.formulario.get('locador.nome').setValue(obj.locador.nome);

        if (obj.procurador) {
          this.formulario.get('procurador.id').setValue(obj.procurador.id);
          this.formulario.get('procurador.nome').setValue(obj.procurador.nome);
        }

      }).catch(erro => this.errorHandler.handle(erro));
  }

  loadImoveis() {
    this.imovelService.findAll().then(lista => {
      this.imoveisOptions = lista.map(imovel => ({ label: imovel.logradouro, value: imovel.id }));
    }).catch(erro => this.errorHandler.handle(erro));
  }

  loadImoveisLivres() {
    this.imovelService.findBySituacao('livre').then(lista => {
      this.imoveisOptions = lista.map(imovel => ({ label: imovel.logradouro, value: imovel.id }));
    }).catch(erro => this.errorHandler.handle(erro));
  }

  loadLocatarios() {
    this.locatarioService.findAll().then(lista => {
      this.locatariosOptions = lista.map(l => ({ label: `${l.nome}`, find: `${l.cpf} ${l.nome}`, value: l.id }));
    }).catch(erro => this.errorHandler.handle(erro));
  }

  loadFiadores() {
    this.fiadorService.findAll().then(lista => {
      this.fiadoresOptions = lista.map(f => ({ label: `${f.nome}`, find: `${f.cpf} ${f.nome}`, value: f.id }));
    }).catch(erro => this.errorHandler.handle(erro));
  }

  loadLocadores() {
    this.locadorService.findAll().then(lista => {
      this.locadoresOptions = lista.map(l => ({ label: l.nome, value: l.id }));
    }).catch(erro => this.errorHandler.handle(erro));
  }

  loadProcuradores() {
    this.procuradorService.findAll().then(lista => {
      this.procuradoresOptions = lista.map(p => ({ label: p.nome, value: p.id }));
    }).catch(erro => this.errorHandler.handle(erro));
  }

  findAluguel() {
    this.imovelService.findById(this.formulario.get('imovel.id').value).then(i => {
      this.formulario.get('valorAluguel').setValue(i.valorAluguel);
      this.auxIptu = i.valorIptu;
      this.formulario.get('locador.id').setValue(i.proprietario.id);
    }).catch(erro => this.errorHandler.handle(erro));
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

  calData(event: Event) {
    const qtdMes = this.formulario.get('duracao').value;
    const fim = moment(this.formulario.get('dataInicio').value).add(qtdMes, 'M');
    this.formulario.get('dataFim').setValue(new Date(fim.calendar()));

    const diaVencimento = moment(this.formulario.get('dataInicio').value).add(1, 'M');
    this.formulario.get('diaVencimento').setValue(new Date(diaVencimento.calendar()));

    this.minDate = moment(this.formulario.get('dataInicio').value).toDate();
    this.maxDate = moment(this.formulario.get('dataInicio').value).add(1, 'M').toDate();
  }

  calcIPTU() {
    this.resultIptu = this.auxIptu / 12;
  }

  calcCaucao() {
    this.valueCaucao = 0;
    this.valueCaucao = (this.formulario.get('valorAluguel').value - (this.formulario.get('valorAluguel').value * (10 / 100))) * 3;
  }

  isContrato() {
    this.locatarioService.isContrato(this.formulario.get('locatario1.id').value).then(r => {
      this.messageService.add({
        key: 'toast', severity: 'warn', summary: 'Atenção',
        detail: `Locatário já possui um contrato. imóvel situado na ${r.logradouro}, ${r.bairro}, ${r.uf}.`
      });
    });
  }

  showBtn(): boolean {
    let aux = false;
    if (this.formulario.get('id').value !== null) {
      aux = moment(this.formulario.get('dataFim').value).isBefore(new Date);
    }
    return aux;
  }

  locatarioIsEnd() {
    let auxLocatario: Pessoa;
    this.locatarioService.findById(this.formulario.get('locatario1.id').value)
      .then(l => {
        auxLocatario = l;

        if (auxLocatario.logradouro === null) {
          this.imovelService.findById(this.formulario.get('imovel.id').value)
            .then(i => {
              auxLocatario.cep = i.cep;
              auxLocatario.uf = i.uf;
              auxLocatario.cidade = i.cidade;
              auxLocatario.bairro = i.bairro;
              auxLocatario.logradouro = i.logradouro;
              auxLocatario.numero = i.numero;
              auxLocatario.complemento = i.complemento;

              this.locatarioService.update(auxLocatario)
                .then(() => {
                  console.log('Endereço locatário atualizado com sucesso.');
                })
                .catch(erro => this.errorHandler.handle(erro));

            })
            .catch(erro => this.errorHandler.handle(erro));
        }

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  backupDataForm() {
    this.auxInicio = this.formulario.get('dataInicio').value;
    this.auxDuracao = this.formulario.get('duracao').value;
    this.auxFim = this.formulario.get('dataFim').value;
    this.auxDiaVencimento = this.formulario.get('diaVencimento').value;

    this.formulario.get('dataInicio').setValue('');
    this.formulario.get('duracao').setValue('');
    this.formulario.get('dataFim').setValue('');
    this.formulario.get('diaVencimento').setValue('');
  }

  restoreDataForm() {
    this.formulario.get('dataInicio').setValue(this.auxInicio);
    this.formulario.get('duracao').setValue(this.auxDuracao);
    this.formulario.get('dataFim').setValue(this.auxFim);
    this.formulario.get('valorAluguel').setValue(this.auxValor);
    this.formulario.get('diaVencimento').setValue(this.auxDiaVencimento);
  }

  onDialogHide() {
    this.displayDialog = false;
    this.restoreDataForm();
    this.formulario.disable();
    this.contratoSelected = null;
  }

  openDialog() {
    this.aluguelService.qtdVencidosByContrato(this.formulario.get('id').value).then(n => {
      if (n === 0) {
        this.service.findById(this.formulario.get('id').value).then(c => {
          this.contratoSelected = c;
          this.backupDataForm();
          this.formulario.enable();
          this.displayDialog = true;
        })
          .catch(erro => this.errorHandler.handle(erro));
      } else {
        // tslint:disable-next-line:max-line-length
        this.messageService.add({ key: 'toast', severity: 'warn', summary: 'Atenção', detail: 'Existem aluguéis em aberto neste contrato. Impossibilitando a renovação.' });
      }

    }).catch(erro => this.errorHandler.handle(erro));
  }
}
