import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginResponse {
  token: string;
  username: string;
  nome: string;
  cargo: string;
  admin: boolean;
}

export interface Sessao {
  username: string;
  nome: string;
  cargo: string;
  admin: boolean;
}

const TOKEN_KEY = 'mzlog_token';
const SESSAO_KEY = 'mzlog_sessao';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, { username, password })
      .pipe(
        tap((res) => {
          localStorage.setItem(TOKEN_KEY, res.token);
          const sessao: Sessao = {
            username: res.username,
            nome: res.nome,
            cargo: res.cargo,
            admin: res.admin,
          };
          localStorage.setItem(SESSAO_KEY, JSON.stringify(sessao));
        }),
      );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(SESSAO_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getSessao(): Sessao | null {
    const bruto = localStorage.getItem(SESSAO_KEY);
    return bruto ? (JSON.parse(bruto) as Sessao) : null;
  }

  isAdmin(): boolean {
    return this.getSessao()?.admin ?? false;
  }
}
