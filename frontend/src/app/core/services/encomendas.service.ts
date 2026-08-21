import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Encomenda } from '../models/encomenda.model';

@Injectable({ providedIn: 'root' })
export class EncomendasService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/encomendas`;

  listar(): Observable<Encomenda[]> {
    return this.http.get<Encomenda[]>(this.baseUrl);
  }

  criar(encomenda: Encomenda): Observable<Encomenda> {
    return this.http.post<Encomenda>(this.baseUrl, encomenda);
  }

  atualizar(id: number, encomenda: Encomenda): Observable<Encomenda> {
    return this.http.put<Encomenda>(`${this.baseUrl}/${id}`, encomenda);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
