import { Injectable } from '@angular/core';

export interface EnderecoCep {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

@Injectable({ providedIn: 'root' })
export class CepService {
  async buscar(cep: string): Promise<EnderecoCep | null> {
    const cepNumerico = cep.replace(/\D/g, '');
    if (cepNumerico.length !== 8) {
      return null;
    }
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cepNumerico}/json/`);
      const dados = await resposta.json();
      if (!resposta.ok || dados.erro) {
        return null;
      }
      return dados as EnderecoCep;
    } catch {
      return null;
    }
  }
}
