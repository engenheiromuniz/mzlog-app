import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DashboardCounters {
  funcionarios: number;
  clientes: number;
  entregasHoje: number;
  veiculos: number;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private http = inject(HttpClient);

  carregarContadores(): Observable<DashboardCounters> {
    return forkJoin({
      funcionarios: this.http.get<number>(`${environment.apiUrl}/api/funcionarios/count`),
      clientes: this.http.get<number>(`${environment.apiUrl}/api/clientes/count`),
      entregasHoje: this.http.get<number>(`${environment.apiUrl}/api/entregas/count-hoje`),
      veiculos: this.http.get<number>(`${environment.apiUrl}/api/veiculos/count`),
    }).pipe(map((res) => res));
  }
}
