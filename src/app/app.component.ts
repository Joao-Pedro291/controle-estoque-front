import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoService, Produto } from './services/produto.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  produtos: Produto[] = [];

  novoProduto = {
    nome: '',
    quantidade: 0,
    preco: 0,
  };

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.getProdutos().subscribe((dados) => {
      this.produtos = dados;
    });
  }

  criarProduto() {
    this.produtoService.criarProduto(this.novoProduto).subscribe({
      next: () => {
        this.carregarProdutos();
        this.novoProduto = { nome: '', quantidade: 0, preco: 0 };
      },
      error: (err) => alert(err.error),
    });
  }
}
