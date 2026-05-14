import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TrilhasStore } from '../../../../core/services/trilhas-store.service';
import { Trilha } from '../../../../shared/models/trilha.model';
import { Licao } from '../../../../shared/models/licao.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-detalhe-trilha',
  imports: [RouterLink],
  templateUrl: './detalhe-trilha.component.html',
  styleUrl: './detalhe-trilha.component.scss'
})
export class DetalheTrilhaComponent {
  private readonly trilhasStore = inject(TrilhasStore);

  // withComponentInputBinding() maps route param :id to this input
  readonly id = input<string>();

  readonly trilha = computed<Trilha | undefined>(() => {
    const id = this.id();
    if (!id) return undefined;
    return this.trilhasStore.trilhas().find((t) => t.id === id);
  });

  readonly licoes = computed<Licao[]>(() => {
    const id = this.id();
    if (!id) return [];
    return this.trilhasStore.licoesDaTrilha(id);
  });

  readonly licoesConcluidas = computed<number>(() => {
    return this.licoes().filter(l => l.concluida).length;
  });

  progressoDaTrilha(): number {
    const id = this.id();
    if (!id) return 0;
    return this.trilhasStore.progressoDaTrilha(id);
  }
}

