import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardCounters, DashboardService } from '../../core/services/dashboard.service';
import { RotasService } from '../../core/services/rotas.service';
import { Rota } from '../../core/models/rota.model';
import { RotaMapaComponent } from '../rotas/rota-mapa.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RotaMapaComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private rotasService = inject(RotasService);

  contadores: DashboardCounters = { funcionarios: 0, clientes: 0, entregasHoje: 0, veiculos: 0 };
  carregando = true;

  mostrarRotas = false;
  carregandoRotas = false;
  rotas: Rota[] = [];
  filtroRota = '';
  rotaSelecionada: Rota | null = null;

  ngOnInit(): void {
    this.dashboardService.carregarContadores().subscribe({
      next: (res) => {
        this.contadores = res;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
      },
    });
  }

  toggleRotas(): void {
    this.mostrarRotas = !this.mostrarRotas;
    if (this.mostrarRotas && this.rotas.length === 0) {
      this.carregandoRotas = true;
      this.rotasService.listar().subscribe({
        next: (res) => {
          this.rotas = res;
          this.carregandoRotas = false;
        },
        error: () => {
          this.carregandoRotas = false;
        },
      });
    }
  }

  get rotasFiltradas(): Rota[] {
    const termo = this.filtroRota.trim().toLowerCase();
    if (!termo) {
      return this.rotas;
    }
    return this.rotas.filter((r) =>
      [r.origem, r.destino, r.motoristaNome, r.clienteNome].join(' ').toLowerCase().includes(termo),
    );
  }

  selecionarRota(rota: Rota): void {
    this.rotaSelecionada = rota;
  }
}
