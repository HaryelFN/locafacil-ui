import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from '../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';
import { Aluguel, AluguelEstatisticaMes } from '../core/models';

@Injectable()
export class AluguelService {

  basePath: string;

  constructor(private http: MoneyHttp) {
    this.basePath = `${environment.apiUrl}/alugueis`;
  }

  findByLocatario(id: number): Promise<Aluguel[]> {
    return this.http.get<Aluguel[]>(`${this.basePath}/findByContrato/${id}`)
      .toPromise()
      .then(response => {
        const obj = response;
        this.converterStringsParaDatas(obj);
        return obj;
      });
  }

  vencidos(): Promise<Aluguel[]> {
    return this.http.get<Aluguel[]>(`${this.basePath}/vencidos`)
      .toPromise()
      .then(response => {
        const obj = response;
        this.converterStringsParaDatas(obj);
        return obj;
      });
  }

  qtdVencidosByContrato(id: number): Promise<number> {
    return this.http.get<number>(`${this.basePath}/qtdVencidosByContrato/${id}`)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  findById(id: number): Promise<Aluguel> {
    return this.http.get<Aluguel>(`${this.basePath}/${id}`)
      .toPromise()
      .then(response => {
        const obj = response;
        return obj;
      });
  }

  getEstatisticaAlugueisMes(): Promise<AluguelEstatisticaMes[]> {
    return this.http.get<any>(`${this.basePath}/estatisticas/total-mes`).toPromise();
  }

  receber(obj: Aluguel): Promise<Aluguel> {
    return this.http.put<Aluguel>(`${this.basePath}/receber/${obj.id}`, obj)
      .toPromise()
      .then(response => {
        const objChanged = response;
        this.converterStringsParaDatas([objChanged]);
        return objChanged;
      });
  }

  gerarRecibo(id: number): any {
    const url = `${this.basePath}/recibo/${id}`;
    const httpOptions = {
      'responseType': 'arraybuffer' as 'json'
    };
    return this.http.get<any>(url, httpOptions);
  }

  private converterStringsParaDatas(alugueis: Aluguel[]) {
    for (const a of alugueis) {
      if (a.dtVencimento != null) {
        a.dtVencimento = moment(a.dtVencimento, 'YYYY-MM-DD').toDate();
      }
      if (a.dtPagamento != null) {
        a.dtPagamento = moment(a.dtPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }

}
