import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';
import { Repasse } from '../core/models';

@Injectable()
export class RepasseService {

  basePath: string;

  constructor(private http: MoneyHttp) {
    this.basePath = `${environment.apiUrl}/repasses`;
  }

  findAll(): Promise<[Repasse]> {
    return this.http.get<any>(this.basePath).toPromise();
  }

  findById(id: number): Promise<Repasse> {
    return this.http.get<Repasse>(`${this.basePath}/${id}`)
      .toPromise()
      .then(response => {
        const obj = response;
        return obj;
      });
  }

  update(obj: Repasse): Promise<Repasse> {
    return this.http.put<Repasse>(`${this.basePath}/${obj.id}`, obj)
      .toPromise()
      .then(response => {
        const objChanged = response;
        return objChanged;
      });
  }

  // save(obj: Pessoa): Promise<Pessoa> {
  //   return this.http.post<Pessoa>(this.basePath, obj).toPromise();
  // }

  // delete(codigo: number): Promise<void> {
  //   return this.http.delete(`${this.basePath}/${codigo}`)
  //     .toPromise()
  //     .then(() => null);
  // }
}
