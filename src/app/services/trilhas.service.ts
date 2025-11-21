import { Injectable, computed, signal } from '@angular/core';
import { Licao, Trilha } from '../models/trilha.model';

@Injectable({ providedIn: 'root' })
export class TrilhasService {
  private readonly trilhasSignal = signal<Trilha[]>([
    {
      id: 'fundamentos-typescript',
      titulo: 'Fundamentos TypeScript',
      descricao: 'Tipos essenciais, funções puras e interfaces aplicadas ao Angular.',
      nivel: 'iniciante',
      progresso: 20,
      licoes: [
        {
          id: 'ts-tipos-basicos',
          titulo: 'Tipos básicos aplicados',
          descricaoCurta: 'Entenda tipos primitivos e inferência em componentes.',
          nivel: 'iniciante',
          categoria: 'typescript',
          tempoEstimadoMinutos: 12,
          concluida: false,
        },
        {
          id: 'ts-funcoes',
          titulo: 'Funções e tipagem',
          descricaoCurta: 'Assinaturas explícitas e boas práticas em serviços.',
          nivel: 'iniciante',
          categoria: 'typescript',
          tempoEstimadoMinutos: 14,
          concluida: false,
        },
        {
          id: 'ts-interfaces',
          titulo: 'Interfaces e contratos',
          descricaoCurta: 'Modelagem de dados para componentes e serviços.',
          nivel: 'iniciante',
          categoria: 'typescript',
          tempoEstimadoMinutos: 10,
          concluida: false,
        },
      ],
    },
    {
      id: 'fundamentos-angular',
      titulo: 'Fundamentos Angular',
      descricao: 'Standalone components, templates claros e roteamento básico.',
      nivel: 'iniciante',
      progresso: 10,
      licoes: [
        {
          id: 'angular-componentes',
          titulo: 'Primeiro componente standalone',
          descricaoCurta: 'Construa um componente simples com inputs e outputs.',
          nivel: 'iniciante',
          categoria: 'angular',
          tempoEstimadoMinutos: 15,
          concluida: false,
        },
        {
          id: 'angular-rotas',
          titulo: 'Rotas e navegação',
          descricaoCurta: 'Entenda provideRouter e organização de páginas.',
          nivel: 'iniciante',
          categoria: 'angular',
          tempoEstimadoMinutos: 12,
          concluida: false,
        },
        {
          id: 'angular-estilos',
          titulo: 'Estilos e tema',
          descricaoCurta: 'Aplicando tema escuro e componentes PrimeNG.',
          nivel: 'iniciante',
          categoria: 'angular',
          tempoEstimadoMinutos: 10,
          concluida: false,
        },
      ],
    },
    {
      id: 'bindings-e-reatividade',
      titulo: 'Bindings e reatividade',
      descricao: 'Interpolação, property, event e two-way binding com PrimeNG.',
      nivel: 'intermediario',
      progresso: 5,
      licoes: [
        {
          id: 'bindings-basicos',
          titulo: 'Bindings básicos',
          descricaoCurta: 'Veja a UI reagindo a cada mudança de estado.',
          nivel: 'iniciante',
          categoria: 'Bindings',
          tempoEstimadoMinutos: 10,
          concluida: false,
        },
        {
          id: 'signals-introducao',
          titulo: 'Signals na prática',
          descricaoCurta: 'Estados declarativos para componentes e listas.',
          nivel: 'intermediario',
          categoria: 'bindings',
          tempoEstimadoMinutos: 16,
          concluida: false,
        },
        {
          id: 'formularios-reactivos',
          titulo: 'Formulários reativos',
          descricaoCurta: 'Validação e feedback visual em tempo real.',
          nivel: 'intermediario',
          categoria: 'forms',
          tempoEstimadoMinutos: 20,
          concluida: false,
        },
      ],
    },
  ]);

  readonly trilhas = this.trilhasSignal.asReadonly();

  readonly progressoGlobal = computed<number>(() => {
    const trilhas = this.trilhasSignal();
    const totalLicoes = trilhas.reduce((total, trilha) => total + trilha.licoes.length, 0);
    if (totalLicoes === 0) {
      return 0;
    }

    const concluidas = trilhas.reduce(
      (total, trilha) => total + trilha.licoes.filter((licao) => licao.concluida).length,
      0
    );

    return Math.round((concluidas / totalLicoes) * 100);
  });

  obterTrilhas(): Trilha[] {
    return this.trilhasSignal();
  }

  obterTrilhaPorId(id: string): Trilha | null {
    return this.trilhasSignal().find((trilha) => trilha.id === id) ?? null;
  }

  obterLicaoPorId(licaoId: string): { trilha: Trilha; licao: Licao } | null {
    for (const trilha of this.trilhasSignal()) {
      const licao = trilha.licoes.find((item) => item.id === licaoId);
      if (licao) {
        return { trilha, licao };
      }
    }

    return null;
  }

  marcarLicaoComoConcluida(licaoId: string): void {
    this.trilhasSignal.update((trilhasAtuais) =>
      trilhasAtuais.map((trilha) => ({
        ...trilha,
        licoes: trilha.licoes.map((licao) =>
          licao.id === licaoId
            ? {
                ...licao,
                concluida: true,
              }
            : licao
        ),
      }))
    );
  }
}
