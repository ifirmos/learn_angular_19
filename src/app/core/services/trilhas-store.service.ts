import { Injectable, computed, inject, signal } from '@angular/core';
import { TrilhasDataSource } from '../data-access/trilhas.datasource';
import { ProgressRepository } from '../data-access/progress.repository';
import { Trilha } from '../../shared/models/trilha.model';
import { Licao } from '../../shared/models/licao.model';

@Injectable({ providedIn: 'root' })
export class TrilhasStore {
  private readonly dataSource = inject(TrilhasDataSource);
  private readonly progressRepo = inject(ProgressRepository);
  private readonly trilhasSignal = signal<Trilha[]>([]);
  private readonly licoesSignal = signal<Licao[]>([]);
  private readonly conclusoesPorLicao = signal<Record<string, boolean>>({});

  readonly trilhas = computed(() => this.trilhasSignal());
  readonly licoes = computed(() => this.licoesSignal());
  readonly progressoGlobal = computed(() => {
    const licoes = this.licoesSignal();
    if (!licoes.length) return 0;

    const mapa = this.conclusoesPorLicao();
    const total = licoes.length;
    const concluidas = licoes.filter(
      (l) => mapa[l.id] ?? l.concluida,
    ).length;

    return Math.round((concluidas / total) * 100);
  });

  constructor() {}

  async inicializar(): Promise<void> {
    const [trilhas, licoes] = await Promise.all([
      this.dataSource.listarTrilhas(),
      this.dataSource.listarLicoes(),
    ]);

    this.trilhasSignal.set(trilhas);
    this.licoesSignal.set(licoes);

    const progressoPersistido = this.progressRepo.carregar();
    this.conclusoesPorLicao.set(progressoPersistido);
  }

  progressoDaTrilha(trilhaId: string): number {
    const licoes = this.licoesSignal().filter(
      (l) => l.trilhaId === trilhaId,
    );
    if (!licoes.length) return 0;

    const mapa = this.conclusoesPorLicao();
    const total = licoes.length;
    const concluidas = licoes.filter(
      (l) => mapa[l.id] ?? l.concluida,
    ).length;

    return Math.round((concluidas / total) * 100);
  }

  licoesDaTrilha(trilhaId: string): Licao[] {
    return this.licoesSignal().filter(
      (l) => l.trilhaId === trilhaId,
    );
  }

  obterLicao(id: string): Licao | undefined {
    return this.licoesSignal().find((l) => l.id === id);
  }

  obterTrilha(id: string): Trilha | undefined {
    return this.trilhasSignal().find((t) => t.id === id);
  }

  marcarLicaoConcluida(licaoId: string, concluida: boolean): void {
    this.conclusoesPorLicao.update((m) => {
      const atualizado = { ...m, [licaoId]: concluida };
      this.progressRepo.salvar(atualizado);
      return atualizado;
    });
  }

  toggleConclusao(licaoId: string): void {
    const licao = this.obterLicao(licaoId);
    if (licao) {
      const estadoAtual = this.conclusoesPorLicao()[licaoId] ?? licao.concluida;
      this.marcarLicaoConcluida(licaoId, !estadoAtual);
    }
  }
}
