export interface Encomenda {
  id?: number;
  tipo: string;
  tamanho: string;
  peso: number;
  volume: number;
  preco: number;
  clienteId: number;
  clienteNome: string;
}
