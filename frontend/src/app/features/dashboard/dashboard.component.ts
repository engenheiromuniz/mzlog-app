import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardCounters, DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  contadores: DashboardCounters = { funcionarios: 0, clientes: 0, entregasHoje: 0, veiculos: 0 };
  carregando = true;

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
}
