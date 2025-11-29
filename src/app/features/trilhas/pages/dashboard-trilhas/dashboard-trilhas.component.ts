import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TrilhasStore } from '../../../../core/services/trilhas-store.service';
import { UiButtonComponent } from '../../../../shared/ui/ui-button/ui-button.component';
import { MetricasRapidasComponent, type Metrica } from '../../../../shared/components/metricas-rapidas/metricas-rapidas.component';
import { ResumoProgressoComponent } from '../../../../shared/components/resumo-progresso/resumo-progresso.component';
import { CardTrilhaComponent } from '../../../../shared/components/card-trilha/card-trilha.component';
import type { Nivel } from '../../../../shared/components/badge-nivel/badge-nivel.component';

type FiltroNivel = 'todos' | Nivel;

/**
 * Dashboard Premium - Tela Inicial
 * 
 * Implementa hero narrativo, painel de progresso, e grid de trilhas
 * seguindo especificações de UX/UI do briefing.
 */
@Component({
  selector: 'app-dashboard-trilhas',
  standalone: true,
  imports: [
    CommonModule,
    UiButtonComponent,
    MetricasRapidasComponent,
    ResumoProgressoComponent,
    CardTrilhaComponent,
  ],
  templateUrl: './dashboard-trilhas.component.html',
  styleUrl: './dashboard-trilhas.component.scss',
})
export class DashboardTrilhasComponent {
  private readonly trilhasStore = inject(TrilhasStore);
  private readonly router = inject(Router);

  // Filtro ativo
  filtroNivel = signal<FiltroNivel>('todos');

  // Dados do store
  trilhas = this.trilhasStore.trilhas;
  progressoGlobal = this.trilhasStore.progressoGlobal;

  // Trilhas filtradas
  trilhasFiltradas = computed(() => {
    const todas = this.trilhas();
    const filtro = this.filtroNivel();
    
    if (filtro === 'todos') {
      return todas;
    }
    
    return todas.filter(t => t.nivel === filtro);
  });

  // Métricas rápidas
  metricas = computed<Metrica[]>(() => {
    const trilhas = this.trilhas();
    const totalLicoes = trilhas.reduce((acc, t) => acc + t.licoes.length, 0);
    const tempoTotal = Math.round(totalLicoes * 15); // ~15min por lição

    return [
      { valor: trilhas.length, label: 'Trilhas' },
      { valor: totalLicoes, label: 'Lições' },
      { valor: tempoTotal, label: 'Min. de conteúdo' },
    ];
  });

  // Recomendação contextual baseada no progresso
  recomendacao = computed(() => {
    const progresso = this.progressoGlobal();
    
    if (progresso === 0) {
      return 'Comece pelos fundamentos de TypeScript para ter uma base sólida antes de avançar para conceitos mais avançados do Angular.';
    } else if (progresso < 30) {
      return 'Continue com os fundamentos! Complete as trilhas básicas antes de explorar Signals e formulários reativos.';
    } else if (progresso < 70) {
      return 'Você está progredindo bem! Explore agora trilhas intermediárias como Signals e formulários reativos.';
    } else {
      return 'Excelente progresso! Você dominou a maior parte do conteúdo. Continue refinando seus conhecimentos.';
    }
  });

  // Áreas-chave para o painel de progresso
  areasChave = ['Bindings', 'Signals', 'Formulários'];

  setFiltro(nivel: FiltroNivel): void {
    this.filtroNivel.set(nivel);
  }

  acessarTrilha(trilhaId: string): void {
    this.router.navigate(['/trilhas', trilhaId]);
  }

  verTodasTrilhas(): void {
    this.router.navigate(['/trilhas']);
  }

  continuarTrilha(): void {
    // Lógica para encontrar a trilha em andamento
    const trilhas = this.trilhas();
    const emAndamento = trilhas.find(t => {
      const progresso = this.trilhasStore.progressoDaTrilha(t.id);
      return progresso > 0 && progresso < 100;
    });

    if (emAndamento) {
      this.router.navigate(['/trilhas', emAndamento.id]);
    } else {
      // Se nenhuma em andamento, vai para a primeira
      if (trilhas.length > 0) {
        this.router.navigate(['/trilhas', trilhas[0].id]);
      }
    }
  }
}
