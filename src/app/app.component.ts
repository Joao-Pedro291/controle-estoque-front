import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ProdutoService, Produto } from './services/produto.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  produtos: Produto[] = [];

  produtoForm!: FormGroup;

  constructor(
    private produtoService: ProdutoService,
    private fb: FormBuilder,
  ) {}

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

    this.produtoService.criarProduto(this.produtoForm.value).subscribe({
      next: () => {
        this.carregarProdutos();
        this.produtoForm.reset();
      },
      error: (err) => alert(err.error),
    });
  }
}
