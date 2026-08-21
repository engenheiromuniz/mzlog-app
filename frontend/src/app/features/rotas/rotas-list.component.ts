import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RotasService } from '../../core/services/rotas.service';
import { Rota } from '../../core/models/rota.model';
import { RotaFormComponent } from './rota-form.component';
import { RotaMapaComponent } from './rota-mapa.component';

@Component({
  selector: 'app-rotas-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    RotaMapaComponent,
  ],
  templateUrl: './rotas-list.component.html',
  styleUrl: './rotas-list.component.scss',
})
export class RotasListComponent implements OnInit {
  private rotasService = inject(RotasService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  rotas: Rota[] = [];
  colunas = ['origem', 'destino', 'clienteNome', 'motoristaNome', 'status', 'acoes'];
  carregando = true;
  rotaSelecionada: Rota | null = null;

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;
    this.rotasService.listar().subscribe({
      next: (res) => {
        this.rotas = res;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.snackBar.open('Erro ao carregar rotas.', 'Fechar', { duration: 3000 });
      },
    });
  }

  novo(): void {
    const ref = this.dialog.open(RotaFormComponent, { width: '420px', data: null });
    ref.afterClosed().subscribe((rota: Rota | undefined) => {
      if (!rota) return;
      this.rotasService.criar(rota).subscribe(() => {
        this.snackBar.open('Rota criada com sucesso.', 'Fechar', { duration: 3000 });
        this.carregar();
      });
    });
  }

  editar(rota: Rota): void {
    const ref = this.dialog.open(RotaFormComponent, { width: '420px', data: rota });
    ref.afterClosed().subscribe((dados: Rota | undefined) => {
      if (!dados || !rota.id) return;
      this.rotasService.atualizar(rota.id, dados).subscribe(() => {
        this.snackBar.open('Rota atualizada com sucesso.', 'Fechar', { duration: 3000 });
        this.carregar();
      });
    });
  }

  remover(rota: Rota): void {
    if (!rota.id) return;
    if (!confirm(`Remover a rota "${rota.origem} -> ${rota.destino}"?`)) return;
    this.rotasService.remover(rota.id).subscribe(() => {
      this.snackBar.open('Rota removida.', 'Fechar', { duration: 3000 });
      if (this.rotaSelecionada?.id === rota.id) {
        this.rotaSelecionada = null;
      }
      this.carregar();
    });
  }

  verMapa(rota: Rota): void {
    this.rotaSelecionada = rota;
  }

  fecharMapa(): void {
    this.rotaSelecionada = null;
  }

  private static readonly CLASSES_STATUS: Record<string, string> = {
    Planejada: 'planejada',
    'Em andamento': 'em-andamento',
    Concluida: 'concluida',
  };

  statusClasse(status: string): string {
    return RotasListComponent.CLASSES_STATUS[status] ?? 'planejada';
  }
}
