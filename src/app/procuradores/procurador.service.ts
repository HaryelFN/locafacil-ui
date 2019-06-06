import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';
import { Pessoa } from '../core/models';

@Injectable()
export class ProcuradorService {

  basePath: string;

  constructor(private http: MoneyHttp) {
    this.basePath = `${environment.apiUrl}/procuradores`;
  }

  findAll(): Promise<[Pessoa]> {
    return this.http.get<any>(this.basePath).toPromise();
  }

  findById(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.basePath}/${codigo}`)
      .toPromise()
      .then(response => {
        const obj = response;
        return obj;
      });
  }

  save(obj: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.basePath, obj).toPromise();
  }

  update(obj: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(`${this.basePath}/${obj.id}`, obj)
      .toPromise()
      .then(response => {
        const objChanged = response;
        return objChanged;
      });
  }

  delete(codigo: number): Promise<void> {
    return this.http.delete(`${this.basePath}/${codigo}`)
      .toPromise()
      .then(() => null);
  }
}
