import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FuncionariosService } from '../../core/services/funcionarios.service';
import { Funcionario } from '../../core/models/funcionario.model';
import { FuncionarioFormComponent } from './funcionario-form.component';

@Component({
  selector: 'app-funcionarios-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './funcionarios-list.component.html',
  styleUrl: './funcionarios-list.component.scss',
})
export class FuncionariosListComponent implements OnInit {
  private funcionariosService = inject(FuncionariosService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  funcionarios: Funcionario[] = [];
  colunas = ['nome', 'cargo', 'status', 'acoes'];
  carregando = true;

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.funcionariosService.listar().subscribe({
      next: (res) => {
        this.funcionarios = res;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.snackBar.open('Erro ao carregar funcionarios.', 'Fechar', { duration: 3000 });
      },
    });
  }

  novo(): void {
    const ref = this.dialog.open(FuncionarioFormComponent, { width: '420px', data: null });
    ref.afterClosed().subscribe((funcionario: Funcionario | undefined) => {
      if (!funcionario) return;
      this.funcionariosService.criar(funcionario).subscribe(() => {
        this.snackBar.open('Funcionario criado com sucesso.', 'Fechar', { duration: 3000 });
        this.carregar();
      });
    });
  }

  editar(funcionario: Funcionario): void {
    const ref = this.dialog.open(FuncionarioFormComponent, { width: '420px', data: funcionario });
    ref.afterClosed().subscribe((dados: Funcionario | undefined) => {
      if (!dados || !funcionario.id) return;
      this.funcionariosService.atualizar(funcionario.id, dados).subscribe(() => {
        this.snackBar.open('Funcionario atualizado com sucesso.', 'Fechar', { duration: 3000 });
        this.carregar();
      });
    });
  }

  remover(funcionario: Funcionario): void {
    if (!funcionario.id) return;
    if (!confirm(`Remover o funcionario "${funcionario.nome}"?`)) return;
    this.funcionariosService.remover(funcionario.id).subscribe(() => {
      this.snackBar.open('Funcionario removido.', 'Fechar', { duration: 3000 });
      this.carregar();
    });
  }
}
