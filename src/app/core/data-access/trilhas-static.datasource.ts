import { Injectable, Type } from '@angular/core';

import { TrilhasDataSource } from './trilhas.datasource';
import { Trilha } from '../../shared/models/trilha.model';
import { Licao } from '../../shared/models/licao.model';
import { DemoBindingsBasicosComponent } from '../../features/licoes/demos/demo-bindings-basicos/demo-bindings-basicos.component';

const LICOES_MOCK: Licao[] = [
  {
    id: 'ts-tipos-basicos',
    trilhaId: 'fundamentos-typescript',
    titulo: 'Tipos básicos em TypeScript',
    descricaoCurta:
      'Introdução a tipos primitivos (string, number, boolean) aplicados em código Angular.',
    nivel: 'iniciante',
    categoria: 'TypeScript',
    tempoEstimadoMinutos: 15,
    concluida: false,
    componenteDemo: DemoBindingsBasicosComponent as Type<unknown>,
    configuracaoDemo: {
      objetivo:
        'Demonstrar como uma variável tipada em TypeScript é usada para atualizar o template via binding.',
      acoesPrincipais: [
        'Digitar um nome no campo de texto.',
        'Observar a saudação ser atualizada em tempo real.',
      ],
      entradaEsperada: 'Nome qualquer (ex.: Ana, João).',
      resultadoEsperado: 'Uma mensagem interpolada exibindo o nome informado.',
      dicasObservacao: [
        'Note que o template é re-renderizado quando o signal é atualizado.',
        'Perceba que não há subscribe manual; a reatividade é automática.',
      ],
    },
  },
];

const TRILHAS_MOCK: Trilha[] = [
  {
    id: 'fundamentos-typescript',
    titulo: 'Fundamentos TypeScript para Angular',
    descricao:
      'Trilha introdutória cobrindo tipos primitivos, interfaces e classes simples aplicadas ao contexto Angular.',
    nivel: 'iniciante',
    categoriaPrincipal: 'Fundamentos',
    licoes: LICOES_MOCK.filter(
      (l) => l.trilhaId === 'fundamentos-typescript',
    ),
  },
];

@Injectable({ providedIn: 'root' })
export class TrilhasStaticDataSource implements TrilhasDataSource {
  async listarTrilhas(): Promise<Trilha[]> {
    return TRILHAS_MOCK;
  }

  async obterTrilhaPorId(id: string): Promise<Trilha | undefined> {
    return TRILHAS_MOCK.find((t) => t.id === id);
  }

  async listarLicoes(): Promise<Licao[]> {
    return LICOES_MOCK;
  }

  async obterLicaoPorId(id: string): Promise<Licao | undefined> {
    return LICOES_MOCK.find((l) => l.id === id);
  }
}
