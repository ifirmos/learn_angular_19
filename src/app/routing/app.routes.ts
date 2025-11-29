import { Routes } from '@angular/router';
import { DashboardTrilhasComponent } from '../features/trilhas/pages/dashboard-trilhas/dashboard-trilhas.component';
import { DetalheTrilhaComponent } from '../features/trilhas/pages/detalhe-trilha/detalhe-trilha.component';
import { LicaoDetalheComponent } from '../features/licoes/pages/licao-detalhe/licao-detalhe.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: DashboardTrilhasComponent,
  },
  {
    path: 'trilhas/:id',
    component: DetalheTrilhaComponent,
  },
  {
    path: 'licoes/:id',
    component: LicaoDetalheComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
