import { Injectable } from '@angular/core';

import { MoneyHttp } from 'src/app/seguranca/money-http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  basePath: string;

  constructor(private http: MoneyHttp) {
    this.basePath = `${environment.apiUrl}/caixa`;
  }

  getTotalMesReceita(): Promise<any[]> {
    return this.http.get<any>(`${this.basePath}/total-mes-receita`).toPromise();
  }
}
