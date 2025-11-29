import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TrilhasStore } from '../../../../core/services/trilhas-store.service';
import { Trilha } from '../../../../shared/models/trilha.model';

@Component({
  standalone: true,
  selector: 'app-dashboard-trilhas',
  imports: [CommonModule, RouterLink],
  template: `
    <section class="dashboard">
      <header class="dashboard-header">
        <h2>Trilhas disponíveis</h2>
        <p>Total de progresso: {{ progressoGlobal() }}%</p>
      </header>

      <section class="dashboard-lista">
        @if (trilhas().length === 0) {
          <p>Nenhuma trilha cadastrada ainda.</p>
        } @else {
          <div class="trilhas-grid">
            @for (trilha of trilhas(); track trilha.id) {
              <article class="trilha-card">
                <h3>{{ trilha.titulo }}</h3>
                <p>{{ trilha.descricao }}</p>
                <p>Nível: {{ trilha.nivel }}</p>
                <p>Progresso: {{ progressoDaTrilha(trilha) }}%</p>

                <a
                  [routerLink]="['/trilhas', trilha.id]"
                  class="btn-cta"
                >
                  Acessar trilha
                </a>
              </article>
            }
          </div>
        }
      </section>
    </section>
  `,
})
export class DashboardTrilhasComponent {
  private readonly trilhasStore = inject(TrilhasStore);

  readonly trilhas = computed(() => this.trilhasStore.trilhas());
  readonly progressoGlobal = computed(() =>
    this.trilhasStore.progressoGlobal(),
  );

  progressoDaTrilha(trilha: Trilha): number {
    return this.trilhasStore.progressoDaTrilha(trilha.id);
  }
}
