import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EncomendasService } from '../../core/services/encomendas.service';
import { Encomenda } from '../../core/models/encomenda.model';
import { EncomendaFormComponent } from './encomenda-form.component';

@Component({
  selector: 'app-encomendas-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './encomendas-list.component.html',
  styleUrl: './encomendas-list.component.scss',
})
export class EncomendasListComponent implements OnInit {
  private encomendasService = inject(EncomendasService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  encomendas: Encomenda[] = [];
  colunas = ['tipo', 'tamanho', 'peso', 'volume', 'preco', 'clienteNome', 'acoes'];
  carregando = true;

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.encomendasService.listar().subscribe({
      next: (res) => {
        this.encomendas = res;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.snackBar.open('Erro ao carregar encomendas.', 'Fechar', { duration: 3000 });
      },
    });
  }

  novo(): void {
    const ref = this.dialog.open(EncomendaFormComponent, { width: '420px', data: null });
    ref.afterClosed().subscribe((encomenda: Encomenda | undefined) => {
      if (!encomenda) return;
      this.encomendasService.criar(encomenda).subscribe(() => {
        this.snackBar.open('Encomenda criada com sucesso.', 'Fechar', { duration: 3000 });
        this.carregar();
      });
    });
  }

  editar(encomenda: Encomenda): void {
    const ref = this.dialog.open(EncomendaFormComponent, { width: '420px', data: encomenda });
    ref.afterClosed().subscribe((dados: Encomenda | undefined) => {
      if (!dados || !encomenda.id) return;
      this.encomendasService.atualizar(encomenda.id, dados).subscribe(() => {
        this.snackBar.open('Encomenda atualizada com sucesso.', 'Fechar', { duration: 3000 });
        this.carregar();
      });
    });
  }

  remover(encomenda: Encomenda): void {
    if (!encomenda.id) return;
    if (!confirm(`Remover a encomenda "${encomenda.tipo}" de ${encomenda.clienteNome}?`)) return;
    this.encomendasService.remover(encomenda.id).subscribe(() => {
      this.snackBar.open('Encomenda removida.', 'Fechar', { duration: 3000 });
      this.carregar();
    });
  }
}
