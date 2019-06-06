import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';
import { Pessoa } from '../core/models';

@Injectable()
export class LocatarioService {

  basePath: string;

  constructor(private http: MoneyHttp) {
    this.basePath = `${environment.apiUrl}/locatarios`;
  }

  findAll(): Promise<Pessoa[]> {
    return this.http.get<any>(this.basePath).toPromise();
  }

  findById(id: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.basePath}/${id}`)
      .toPromise()
      .then(response => {
        const obj = response;
        return obj;
      });
  }

  isContrato(id: number): Promise<any> {
    return this.http.get<any>(`${this.basePath}/iscontrato/${id}`).toPromise();
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

  delete(id: number): Promise<void> {
    return this.http.delete(`${this.basePath}/${id}`)
      .toPromise()
      .then(() => null);
  }
}
