import { Routes } from '@angular/router';
import { DashboardTrilhasComponent } from './components/trilhas/dashboard-trilhas.component';
import { ListaTrilhasComponent } from './components/trilhas/lista-trilhas.component';
import { DetalheTrilhaComponent } from './components/trilhas/detalhe-trilha.component';
import { LicaoDetalheComponent } from './components/trilhas/licao-detalhe.component';

export const routes: Routes = [
  { path: '', component: DashboardTrilhasComponent },
  { path: 'trilhas', component: ListaTrilhasComponent },
  { path: 'trilhas/:id', component: DetalheTrilhaComponent },
  { path: 'licoes/:id', component: LicaoDetalheComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
