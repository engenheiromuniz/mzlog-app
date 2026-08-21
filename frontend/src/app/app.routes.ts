import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { adminGuard } from './core/auth/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () => import('./layout/shell/shell.component').then((m) => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'clientes',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/clientes/clientes-list.component').then((m) => m.ClientesListComponent),
      },
      {
        path: 'funcionarios',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/funcionarios/funcionarios-list.component').then(
            (m) => m.FuncionariosListComponent,
          ),
      },
      {
        path: 'rotas',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/rotas/rotas-list.component').then((m) => m.RotasListComponent),
      },
      {
        path: 'encomendas',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./features/encomendas/encomendas-list.component').then(
            (m) => m.EncomendasListComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
