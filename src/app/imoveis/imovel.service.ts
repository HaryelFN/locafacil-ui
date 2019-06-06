import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from '../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';
import { Imovel, QtdImoveis, DespesaImovel, DespesaImovelNewDTO, Contrato } from '../core/models';

@Injectable()
export class ImovelService {

  private geocoder: any;

  basePath: string;

  constructor(private http: MoneyHttp) {
    this.basePath = `${environment.apiUrl}/imoveis`;
  }

  urlUploadAnexo(): string {
    return `${this.basePath}/fotos`;
  }

  deleteAnexo(id: number): Promise<void> {
    return this.http.delete(`${this.basePath}/fotos/${id}`)
      .toPromise()
      .then(() => null);
  }

  findAll(): Promise<Imovel[]> {
    return this.http.get<any>(this.basePath).toPromise();
  }

  findById(id: number): Promise<Imovel> {
    return this.http.get<Imovel>(`${this.basePath}/${id}`)
      .toPromise()
      .then(response => {
        const obj = response;
        return obj;
      });
  }

  findBySituacao(situacao: string): Promise<Imovel[]> {
    return this.http.get<Imovel[]>(`${this.basePath}/situacao/${situacao}`).toPromise();
  }

  qtdImoveis(): Promise<QtdImoveis> {
    return this.http.get<any>(`${this.basePath}/qtdimoveis`).toPromise();
  }

  getDespesasByIdImovel(idImovel: number): Promise<DespesaImovel[]> {
    return this.http.get<DespesaImovel[]>(`${environment.apiUrl}/despesas_imovel/imovel/${idImovel}`)
      .toPromise()
      .then(list => {
        const obj = list;
        this.stringToDate(obj);
        return obj;
      });
  }

  saveDepesa(obj: any): Promise<any> {
    return this.http.post<any>(`${environment.apiUrl}/despesas_imovel`, obj).toPromise();
  }

  deleteDespesa(id: number): Promise<void> {
    return this.http.delete(`${environment.apiUrl}/despesas_imovel/${id}`)
      .toPromise()
      .then(() => null);
  }

  getContratosByIdImovel(idImovel: number): Promise<Contrato[]> {
    return this.http.get<Contrato[]>(`${environment.apiUrl}/contratos/findByIdImovel/${idImovel}`)
      .toPromise()
      .then(list => {
        const obj = list;
        this.stringToDate2(obj);
        return obj;
      });
  }

  save(obj: Imovel): Promise<Imovel> {
    return this.http.post<Imovel>(this.basePath, obj).toPromise();
  }

  update(obj: Imovel): Promise<Imovel> {
    return this.http.put<Imovel>(`${this.basePath}/${obj.id}`, obj)
      .toPromise()
      .then(response => {
        const objChanged = response;
        return objChanged;
      });
  }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.basePath}/${id}`)
      .toPromise()
      .then(() => null);
  }

  private stringToDate(list: DespesaImovel[]) {
    for (const obj of list) {
      obj.data = moment(obj.data, 'YYYY-MM-DD').toDate();
    }
  }

  private stringToDate2(list: Contrato[]) {
    for (const obj of list) {
      obj.dataInicio = moment(obj.dataInicio, 'YYYY-MM-DD').toDate();
      obj.dataFim = moment(obj.dataFim, 'YYYY-MM-DD').toDate();
    }
  }

}
