import { Injectable } from '@angular/core';
import { ResponseContentType } from '@angular/http';

import * as moment from 'moment';

import { environment } from '../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';
import { Contrato, ContratoNewDTO } from '../core/models';


@Injectable()
export class ContratoService {

  basePath: string;

  constructor(private http: MoneyHttp) {
    this.basePath = `${environment.apiUrl}/contratos`;
  }

  downDocContrato(id: number): any {
    const url = `${this.basePath}/pdf/${id}`;
    const httpOptions = {
      'responseType': 'arraybuffer' as 'json'
    };
    return this.http.get<any>(url, httpOptions);
  }


  findAll(): Promise<Contrato[]> {
    return this.http.get<any>(this.basePath).toPromise();
  }

  findById(id: number): Promise<Contrato> {
    return this.http.get<Contrato>(`${this.basePath}/${id}`)
      .toPromise()
      .then(response => {
        const obj = response;
        this.converterStringsParaDatas([obj]);
        return obj;
      });
  }

  vencidos(): Promise<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.basePath}/vencidos`)
      .toPromise()
      .then(response => {
        const obj = response;
        this.converterStringsParaDatas(obj);
        return obj;
      });
  }

  findByLocatario(nome: string): Promise<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.basePath}/findByLocatario/${nome}`)
      .toPromise()
      .then(response => {
        const obj = response;
        this.converterStringsParaDatas(obj);
        return obj;
      });
  }

  save(obj: any): Promise<Contrato> {
    return this.http.post<Contrato>(this.basePath, obj).toPromise();
  }

  update(obj: any): Promise<Contrato> {
    return this.http.put<Contrato>(`${this.basePath}/${obj.id}`, obj)
      .toPromise()
      .then(response => {
        const objChanged = response;
        return objChanged;
      });
  }

  // update(obj: Contrato): Promise<Contrato> {
  //   return this.http.put<Contrato>(`${this.basePath}/${obj.id}`, obj)
  //     .toPromise()
  //     .then(response => {
  //       const objChanged = response;
  //       this.converterStringsParaDatas([objChanged]);
  //       return objChanged;
  //     });
  // }

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.basePath}/${id}`)
      .toPromise()
      .then(() => null);
  }

  private converterStringsParaDatas(contratos: Contrato[]) {
    for (const contrato of contratos) {
      contrato.dataInicio = moment(contrato.dataInicio, 'YYYY-MM-DD').toDate();
      contrato.dataFim = moment(contrato.dataFim, 'YYYY-MM-DD').toDate();
      contrato.diaVencimento = moment(contrato.diaVencimento, 'YYYY-MM-DD').toDate();
    }
  }

}
