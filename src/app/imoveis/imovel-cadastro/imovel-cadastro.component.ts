import { Component, OnInit, ViewEncapsulation, ViewChild, NgZone } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Router } from '../../../../node_modules/@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { AuthService } from '../../seguranca/auth.service';
import { ImovelService } from '../imovel.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NgxViacepService, Endereco, ErroCep } from '@brunoc/ngx-viacep';

import { Foto } from '../../core/models';
import { LocadorService } from 'src/app/locadores/locador.service';

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  pais?: string;
  cep?: string;
  uf?: string;
  cidade?: string;
  bairro?: string;
  logradouro?: string;
  referencia?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-imovel-cadastro',
  templateUrl: './imovel-cadastro.component.html',
  styles: [`
  agm-map {
    height: 300px;
  }

  a {
    color: darkblue;
  }
  `],
  encapsulation: ViewEncapsulation.None
})
export class ImovelCadastroComponent implements OnInit {

  @ViewChild(AgmMap) map: AgmMap;

  full_address: string;
  geocoder: any;

  public location: Location = {
    lat: -16.616454,
    lng: -49.252347,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 5
  };

  pt: any;
  date_now: number;
  minDate: Date;
  maxDate: Date;

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

  tiposImovel = [
    { label: 'Apartamento', value: 'Apartamento' },
    { label: 'Casa', value: 'Casa' },
    { label: 'Comércio', value: 'Comércio' }
  ];

  formulario: FormGroup;
  submitted = false;

  proprietariosOptions: any[];

  openGallery = false;
  loadingUpload = false;
  options: any;
  images: any[];

  constructor(
    private auth: AuthService,
    private imovelService: ImovelService,
    private locadorService: LocadorService,
    private viacep: NgxViacepService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private confirmation: ConfirmationService,
    private router: Router,
    public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper
  ) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
    this.images = [];
    this.configCalendar();
    this.configForm();
    this.loadProprietarios();
    this.location.marker.draggable = true;

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadObj(id);
    }
  }

  get edit() {
    return Boolean(this.formulario.get('id').value);
  }

  get f() {
    return this.formulario.controls;
  }

  loadObj(id: number) {
    this.imovelService.findById(id)
      .then(obj => {
        this.formulario.patchValue(obj);

        if (typeof google !== 'undefined') {
          this.updateOnMap(this.formulario);
        }

        obj.fotos.forEach(f => {
          this.addFoto(f.id, f.anexo, f.urlAnexo);
          this.images.push({
            source: f.urlAnexo,
            thumbnail: this.getThumbnail(f.urlAnexo), title: ''
          });
          this.openGallery = true;
        });

        obj.despesas.forEach(d => {
          this.addDespesa(d.id, d.descricao, d.data, d.valor);
        });

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  loadProprietarios() {
    this.locadorService.findAll().then(lista => {
      this.proprietariosOptions = lista.map(l => ({ label: l.nome, value: l.id }));
    }).catch(erro => this.errorHandler.handle(erro));
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
    this.imovelService.save(this.formulario.value)
      .then(() => {
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: 'Imóvel adicionado.' });
        this.formulario.reset();
        this.openGallery = false;
        this.images = [];
        this.submitted = false;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  updateObj() {
    this.imovelService.update(this.formulario.value)
      .then(obj => {
        this.formulario.patchValue(obj);
        this.messageService.add({ key: 'toast', severity: 'success', summary: 'Sucesso', detail: 'Imóvel atualizado.' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmDelete() {
    this.confirmation.confirm({
      message: 'Excluir Imóvel?',
      accept: () => {
        this.delete();
      }
    });
  }

  delete() {
    this.imovelService.delete(this.formulario.get('id').value)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Locatário excluído.' });
        this.formulario.reset();
        this.router.navigate(['/imoveis']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  configForm() {
    this.formulario = this.formBuilder.group({
      id: [],
      cep: [''],
      uf: ['', Validators.required],
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: [''],
      complemento: [''],
      situacao: ['livre', Validators.required],
      proprietario: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      tipoImovel: ['', Validators.required],
      qtdQuarto: [null],
      qtdSuite: [null],
      qtdBanheiro: [1, Validators.required],
      qtdSala: [null],
      qtdGaragem: [null],
      areaTerreno: [null],
      areaConstruida: [null],
      valorAluguel: ['', Validators.required],
      valorCondominio: [''],
      valorIptu: ['', Validators.required],
      acessorios: [''],
      fotos: this.formBuilder.array([]),
      despesas: this.formBuilder.array([])
    });
  }

  // IMAGE:
  onUpload(event) {
    this.openGallery = true;
    this.loadingUpload = false;
    const fotos: Foto[] = JSON.parse(event.xhr.response);

    fotos.forEach(f => {

      this.addFoto(f.id, f.anexo, f.urlAnexo);

      this.images.push({
        source: f.urlAnexo,
        thumbnail: this.getThumbnail(f.urlAnexo), title: ''
      });
    });
  }

  beforeUploadFile(event) {
    this.auth.obterNovoAccessToken();
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.loadingUpload = true;
  }

  erroUpload(event) {
    this.messageService.add({ key: 'toast', severity: 'error', summary: 'Error', detail: 'Erro ao tentar enviar anexo.' });
  }

  removeAnexo() {
    this.confirmation.confirm({
      message: 'Remover fotos do imóvel?',
      accept: () => {
        while (this.fotos().length !== 0) {
          this.fotos().removeAt(0);
          this.images = [];
          this.openGallery = false;
        }
        this.imovelService.deleteAnexo(this.formulario.get('id').value)
          .then(() => {
            this.messageService.add({ severity: 'success', detail: 'Anexos excluídos.' });
          })
          .catch(erro => this.errorHandler.handle(erro));
      }
    });
  }

  get urlUploadFile() {
    return this.imovelService.urlUploadAnexo();
  }

  fotos(): FormArray {
    return this.formulario.get('fotos') as FormArray;
  }

  createFoto(): FormGroup {
    return this.formBuilder.group({
      id: '',
      anexo: '',
      urlAnexo: ''
    });
  }

  addFoto(id: number, anexo: string, urlAnexo: string) {
    const foto = this.createFoto();

    foto.get('id').setValue(id);
    foto.get('anexo').setValue(anexo);
    foto.get('urlAnexo').setValue(urlAnexo);
    this.fotos().push(foto);
  }

  despesas(): FormArray {
    return this.formulario.get('despesas') as FormArray;
  }

  createDespesa(): FormGroup {
    return this.formBuilder.group({
      id: '',
      descricao: '',
      data: '',
      valor: ''
    });
  }

  addDespesa(id: number, descricao: string, data: Date, valor: number) {
    const despesa = this.createDespesa();
    despesa.get('id').setValue(id);
    despesa.get('descricao').setValue(descricao);
    despesa.get('data').setValue(data);
    despesa.get('valor').setValue(valor);
    this.despesas().push(despesa);
  }


  private getThumbnail(url: string): string {
    let retorno = '';
    if (url) {
      const aux = url.split('/');
      const i = aux.length - 2;

      aux[i] = aux[i] + '/resized';

      aux.forEach(a => {
        retorno += a + '/';
      });
    }
    return retorno.slice(0, retorno.length - 1);
  }

  // CONFIG CALENDAR
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

  // MAPS
  searchCep() {
    this.viacep.buscarPorCep(this.formulario.get('cep').value).then((endereco: Endereco) => {
      this.formulario.get('uf').setValue(endereco.uf);
      this.formulario.get('cidade').setValue(endereco.localidade);
      this.formulario.get('bairro').setValue(endereco.bairro);
      this.formulario.get('logradouro').setValue(endereco.logradouro);
      this.formulario.get('complemento').setValue(endereco.complemento);

      this.updateOnMap(this.formulario);

    }).catch((error: ErroCep) => {
      console.log(error.message);
    });
  }

  updateOnMap(form: FormGroup) {
    this.full_address = form.get('logradouro').value || '';
    if (form.get('bairro').value) { this.full_address = this.full_address + '' + form.get('bairro').value; }
    if (form.get('cidade').value) { this.full_address = this.full_address + '' + form.get('cidade').value; }
    if (form.get('uf').value) { this.full_address = this.full_address + '' + form.get('uf').value; }

    this.findLocation(this.full_address);
  }

  myClick(event: Event) {
    if (event.isTrusted) {
      this.updateOnMap(this.formulario);
    }
  }

  findLocation(address) {
    if (!this.geocoder) { this.geocoder = new google.maps.Geocoder(); }
    this.geocoder.geocode({
      'address': address
    }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        for (let i = 0; i < results[0].address_components.length; i++) {
          const types = results[0].address_components[i].types;
          if (types.indexOf('locality') !== -1) {
            this.location.cidade = results[0].address_components[i].long_name;
          }
          if (types.indexOf('country') !== -1) {
            this.location.pais = results[0].address_components[i].long_name;
          }
          if (types.indexOf('postal_code') !== -1) {
            this.location.cep = results[0].address_components[i].long_name;
          }
          if (types.indexOf('administrative_area_level_1') !== -1) {
            this.location.uf = results[0].address_components[i].long_name;
          }
        }
        if (results[0].geometry.location) {
          this.location.lat = results[0].geometry.location.lat();
          this.location.lng = results[0].geometry.location.lng();
          this.location.marker.lat = results[0].geometry.location.lat();
          this.location.marker.lng = results[0].geometry.location.lng();
          this.location.marker.draggable = true;
          this.location.viewport = results[0].geometry.viewport;
        }

        this.map.triggerResize();
      } else {
        alert('Sorry, this search produced no results.');
      }
    });
  }
}
