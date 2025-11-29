import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TrilhasStore } from '../../../../core/services/trilhas-store.service';
import { Trilha } from '../../../../shared/models/trilha.model';
import { Licao } from '../../../../shared/models/licao.model';

@Component({
  standalone: true,
  selector: 'app-detalhe-trilha',
  imports: [CommonModule, RouterLink],
  template: `
    @if (!trilha()) {
      <p>Carregando trilha...</p>
    } @else {
      <section class="trilha-detalhe">
        <header>
          <h2>{{ trilha()!.titulo }}</h2>
          <p>{{ trilha()!.descricao }}</p>
          <p>Nível: {{ trilha()!.nivel }}</p>
          <p>Progresso: {{ progressoDaTrilha() }}%</p>
        </header>

        <section class="licoes-lista">
          <h3>Lições desta trilha</h3>

          @if (licoes().length === 0) {
            <p>Nenhuma lição cadastrada ainda.</p>
          } @else {
            <ul>
              @for (licao of licoes(); track licao.id) {
                <li>
                  <h4>{{ licao.titulo }}</h4>
                  <p>{{ licao.descricaoCurta }}</p>
                  <p>
                    Duração estimada:
                    {{ licao.tempoEstimadoMinutos }} minutos
                  </p>

                  <a
                    [routerLink]="['/licoes', licao.id]"
                    class="btn-cta"
                  >
                    Acessar lição
                  </a>
                </li>
              }
            </ul>
          }
        </section>
      </section>
    }
  `,
})
export class DetalheTrilhaComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly trilhasStore = inject(TrilhasStore);

  private readonly trilhaId = signal<string | null>(null);

  readonly trilha = computed<Trilha | undefined>(() => {
    const id = this.trilhaId();
    if (!id) return undefined;
    return this.trilhasStore.trilhas().find((t) => t.id === id);
  });

  readonly licoes = computed<Licao[]>(() => {
    const id = this.trilhaId();
    if (!id) return [];
    return this.trilhasStore.licoesDaTrilha(id);
  });

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.trilhaId.set(params.get('id'));
    });
  }

  progressoDaTrilha(): number {
    const id = this.trilhaId();
    if (!id) return 0;
    return this.trilhasStore.progressoDaTrilha(id);
  }
}
