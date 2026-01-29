import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
  estoqueBaixo: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiUrl = 'https://localhost:7174/api/produto';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  criarProduto(produto: any) {
    return this.http.post(this.apiUrl, produto);
  }

  atualizarProduto(id: number, produto: any) {
    return this.http.put(`${this.apiUrl}/${id}`, produto);
  }

  deletarProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
