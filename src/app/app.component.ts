import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ProdutoService, Produto } from './services/produto.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  produtos: Produto[] = [];

  produtoForm!: FormGroup;

  produtoEditandoId: number | null = null;

  constructor(
    private produtoService: ProdutoService,
    private fb: FormBuilder,
  ) {}

  resetarFormulario() {
    this.produtoForm.reset();
    this.produtoEditandoId = null;
    this.carregarProdutos();
  }

  ngOnInit() {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      quantidade: [null, [Validators.required, Validators.min(1)]],
      preco: [null, [Validators.required, Validators.min(0.01)]],
    });

    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.getProdutos().subscribe((dados) => {
      this.produtos = dados;
    });
  }

  criarProduto() {
    if (this.produtoForm.invalid) return;

    const dados = this.produtoForm.value;

    if (this.produtoEditandoId) {
      // PUT
      this.produtoService
        .atualizarProduto(this.produtoEditandoId, dados)
        .subscribe(() => {
          this.resetarFormulario();
        });
    } else {
      // POST
      this.produtoService.criarProduto(dados).subscribe(() => {
        this.resetarFormulario();
      });
    }
  }

  editarProduto(produto: Produto) {
    this.produtoEditandoId = produto.id;

    this.produtoForm.patchValue({
      nome: produto.nome,
      quantidade: produto.quantidade,
      preco: produto.preco,
    });
  }
}
