import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientesService } from '../../core/services/clientes.service';
import { Cliente } from '../../core/models/cliente.model';
import { ClienteFormComponent } from './cliente-form.component';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.scss',
})
export class ClientesListComponent implements OnInit {
  private clientesService = inject(ClientesService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  clientes: Cliente[] = [];
  colunas = ['nome', 'cidade', 'telefone', 'acoes'];
  carregando = true;

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.clientesService.listar().subscribe({
      next: (res) => {
        this.clientes = res;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.snackBar.open('Erro ao carregar clientes.', 'Fechar', { duration: 3000 });
      },
    });
  }

  novo(): void {
    const ref = this.dialog.open(ClienteFormComponent, { width: '420px', data: null });
    ref.afterClosed().subscribe((cliente: Cliente | undefined) => {
      if (!cliente) return;
      this.clientesService.criar(cliente).subscribe(() => {
        this.snackBar.open('Cliente criado com sucesso.', 'Fechar', { duration: 3000 });
        this.carregar();
      });
    });
  }

  editar(cliente: Cliente): void {
    const ref = this.dialog.open(ClienteFormComponent, { width: '420px', data: cliente });
    ref.afterClosed().subscribe((dados: Cliente | undefined) => {
      if (!dados || !cliente.id) return;
      this.clientesService.atualizar(cliente.id, dados).subscribe(() => {
        this.snackBar.open('Cliente atualizado com sucesso.', 'Fechar', { duration: 3000 });
        this.carregar();
      });
    });
  }

  remover(cliente: Cliente): void {
    if (!cliente.id) return;
    if (!confirm(`Remover o cliente "${cliente.nome}"?`)) return;
    this.clientesService.remover(cliente.id).subscribe(() => {
      this.snackBar.open('Cliente removido.', 'Fechar', { duration: 3000 });
      this.carregar();
    });
  }
}
