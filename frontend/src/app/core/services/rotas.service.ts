import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Rota } from '../models/rota.model';

@Injectable({ providedIn: 'root' })
export class RotasService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/rotas`;

  listar(): Observable<Rota[]> {
    return this.http.get<Rota[]>(this.baseUrl);
  }

  criar(rota: Rota): Observable<Rota> {
    return this.http.post<Rota>(this.baseUrl, rota);
  }

  atualizar(id: number, rota: Rota): Observable<Rota> {
    return this.http.put<Rota>(`${this.baseUrl}/${id}`, rota);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
