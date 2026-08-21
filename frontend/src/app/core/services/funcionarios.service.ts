import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Funcionario } from '../models/funcionario.model';

@Injectable({ providedIn: 'root' })
export class FuncionariosService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/funcionarios`;

  listar(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.baseUrl);
  }

  contar(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  criar(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.baseUrl, funcionario);
  }

  atualizar(id: number, funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.baseUrl}/${id}`, funcionario);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
