# Passo 3 – Fluxo mínimo end-to-end (Trilha + Lição + Demo)

## 0. Objetivo do passo 3

Colocar a plataforma em um estado em que:

* A rota `/` exibe o Dashboard com pelo menos uma trilha real.
* A rota `/trilhas/fundamentos-typescript` exibe detalhe dessa trilha, com a lista de lições.
* A rota `/licoes/ts-tipos-basicos` exibe:
  * Explicação da lição,
  * Trecho de código (TS/HTML),
  * Uma demo interativa usando signal/computed.
* O botão “Marcar como concluída”:
  * Atualiza o estado no `TrilhasStore`,
  * Persiste o progresso via `ProgressRepository`,
  * Reflete o progresso atualizado na trilha e no dashboard.

Este passo valida toda a cadeia: dados → store → componentes → rotas → interação.

## 1. Pré-requisitos

Antes de executar o passo 3, o agente deve garantir que:

* O Passo 2 esteja concluído:
  * `main.ts` usa `bootstrapApplication(AppShellComponent, appConfig)`.
  * `app.config.ts` existe, com providers de Router, Animations, HttpClient, `TrilhasDataSource`, `ProgressRepository` (e opcionalmente `GlobalErrorHandler`).
  * `app.routes.ts` define as rotas principais (`/`, `/trilhas/:id`, `/licoes/:id`), mesmo com componentes placeholder.
* As pastas base existam:
  * `src/app/core/`
  * `src/app/shared/`
  * `src/app/features/`
  * `src/app/routing/`
* Os modelos de domínio (`Trilha`, `Licao`, `ConfiguracaoDemo`) estejam definidos em `shared/models` (se não, serão criados neste passo).

## 2. Garantir os modelos de domínio

Se ainda não existirem, o agente deve criar:

### 2.1. Trilha

Arquivo: `src/app/shared/models/trilha.model.ts`

```ts
import { Licao } from './licao.model';

export interface Trilha {
  id: string;
  titulo: string;
  descricao: string;
  nivel: 'iniciante' | 'intermediario';
  categoriaPrincipal?: string; // ex.: "Fundamentos", "Signals", etc.
  licoes: Licao[];
}
```

### 2.2. ConfiguracaoDemo

Arquivo: `src/app/shared/models/configuracao-demo.model.ts`

```ts
export interface ConfiguracaoDemo {
  objetivo: string;
  acoesPrincipais: string[];
  entradaEsperada: string;
  resultadoEsperado: string;
  dicasObservacao?: string[];
}
```

### 2.3. Licao

Arquivo: `src/app/shared/models/licao.model.ts`

```ts
import { Type } from '@angular/core';
import { ConfiguracaoDemo } from './configuracao-demo.model';

export interface Licao {
  id: string;
  trilhaId: string;        // referência à trilha
  titulo: string;
  descricaoCurta: string;
  nivel: 'iniciante' | 'intermediario';
  categoria: string;       // ex.: "TypeScript", "Bindings", "Signals"
  tempoEstimadoMinutos: number;
  concluida: boolean;
  componenteDemo: Type<unknown>;
  configuracaoDemo?: ConfiguracaoDemo;
}
```

Observação: nenhum desses arquivos deve importar Angular UI; são tipos puros.

## 3. Popular `TrilhasStaticDataSource` com uma trilha e uma lição

### 3.1. Criar a demo básica (referência futura)

Antes de popular `LICOES_MOCK`, o agente precisa criar o componente demo que será referenciado em `componenteDemo`.

Criar pasta:

`src/app/features/licoes/demos/demo-bindings-basicos/`

Arquivo: `demo-bindings-basicos.component.ts`

```ts
import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
  standalone: true,
  selector: 'app-demo-bindings-basicos',
  imports: [CommonModule, InputTextModule, CardModule],
  template: `
    <div class="demo-bindings-basicos">
      <p-card header="Demo: Bindings Básicos">
        <div class="demo-controls">
          <label for="nome">Digite seu nome:</label>
          <input
            id="nome"
            type="text"
            pInputText
            [ngModel]="nome()"
            (ngModelChange)="nome.set($event)"
            placeholder="Ex.: Ana"
          />
        </div>

        <div class="demo-result">
          <p>Interpolação simples:</p>
          <p class="resultado">{{ saudacao() }}</p>
        </div>

        <small class="demo-tip">
          Dica: altere o texto e observe o binding atualizar em tempo real.
        </small>
      </p-card>
    </div>
  `,
  styles: [
    `
      .demo-bindings-basicos {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .demo-controls {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }

      .demo-result .resultado {
        font-weight: 600;
        margin-top: 0.5rem;
      }

      .demo-tip {
        color: #9ca3af;
      }
    `,
  ],
})
export class DemoBindingsBasicosComponent {
  readonly nome = signal<string>('');
  readonly saudacao = computed(
    () => (this.nome().trim() ? `Olá, ${this.nome()}!` : 'Digite seu nome acima.')
  );
}
```

Obs.: usamos `[ngModel]` + `(ngModelChange)` de forma explícita para manter a demo simples e pedagógica.

### 3.2. Popular `TRILHAS_MOCK` e `LICOES_MOCK`

Arquivo: `src/app/core/data-access/trilhas-static.datasource.ts`

O agente deve substituir as constantes mock vazias por algo assim:

```ts
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
    licoes: LICOES_MOCK.filter((l) => l.trilhaId === 'fundamentos-typescript'),
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
```

## 4. Implementar `TrilhasStore` com inicialização real

Se ainda não foi implementado no Passo 2, o agente deve agora criar o `TrilhasStore` com base na especificação.

Arquivo: `src/app/core/services/trilhas-store.service.ts`

```ts
import { Injectable, computed, signal } from '@angular/core';
import { TrilhasDataSource } from '../data-access/trilhas.datasource';
import { ProgressRepository } from '../data-access/progress.repository';
import { Trilha } from '../../shared/models/trilha.model';
import { Licao } from '../../shared/models/licao.model';

@Injectable({ providedIn: 'root' })
export class TrilhasStore {
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
      (l) => mapa[l.id] ?? l.concluida
    ).length;

    return Math.round((concluidas / total) * 100);
  });

  constructor(
    private readonly dataSource: TrilhasDataSource,
    private readonly progressRepo: ProgressRepository
  ) {}

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
    const licoes = this.licoesSignal().filter((l) => l.trilhaId === trilhaId);
    if (!licoes.length) return 0;

    const mapa = this.conclusoesPorLicao();
    const total = licoes.length;
    const concluidas = licoes.filter(
      (l) => mapa[l.id] ?? l.concluida
    ).length;

    return Math.round((concluidas / total) * 100);
  }

  licoesDaTrilha(trilhaId: string): Licao[] {
    return this.licoesSignal().filter((l) => l.trilhaId === trilhaId);
  }

  obterLicao(id: string): Licao | undefined {
    return this.licoesSignal().find((l) => l.id === id);
  }

  marcarLicaoConcluida(licaoId: string, concluida: boolean): void {
    this.conclusoesPorLicao.update((m) => {
      const atualizado = { ...m, [licaoId]: concluida };
      this.progressRepo.salvar(atualizado);
      return atualizado;
    });
  }
}
```

## 5. Inicializar o `TrilhasStore` no `AppShellComponent`

O `AppShellComponent` deve chamar `TrilhasStore.inicializar()` uma vez na inicialização.

Arquivo: `src/app/core/layout/app-shell/app-shell.component.ts` (exemplo):

```ts
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrilhasStore } from '../../services/trilhas-store.service';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet],
  template: `
    <div class="app-shell">
      <header class="app-header">
        <h1>Plataforma Educacional Angular 19</h1>
      </header>

      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppShellComponent {
  private readonly trilhasStore = inject(TrilhasStore);

  constructor() {
    // Dispara a carga inicial de trilhas e lições
    this.trilhasStore.inicializar().catch((err) =>
      console.error('Erro ao inicializar TrilhasStore', err)
    );
  }
}
```

Em versões futuras, essa inicialização pode ser movida para um `APP_INITIALIZER` ou similar; neste passo, manter simples.

## 6. Implementar o `DashboardTrilhasComponent` (rota `/`)

Criar pasta:

`src/app/features/trilhas/pages/dashboard-trilhas/`

Arquivo: `dashboard-trilhas.component.ts`

```ts
import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TrilhasStore } from '../../../core/services/trilhas-store.service';
import { Trilha } from '../../../shared/models/trilha.model';

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
  readonly progressoGlobal = computed(() => this.trilhasStore.progressoGlobal());

  progressoDaTrilha(trilha: Trilha): number {
    return this.trilhasStore.progressoDaTrilha(trilha.id);
  }
}
```

## 7. Implementar o `DetalheTrilhaComponent` (rota `/trilhas/:id`)

Criar pasta:

`src/app/features/trilhas/pages/detalhe-trilha/`

Arquivo: `detalhe-trilha.component.ts`

```ts
import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TrilhasStore } from '../../../core/services/trilhas-store.service';
import { Trilha } from '../../../shared/models/trilha.model';
import { Licao } from '../../../shared/models/licao.model';

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
```

## 8. Implementar o `LicaoDetalheComponent` (rota `/licoes/:id`)

Criar pasta:

`src/app/features/licoes/pages/licao-detalhe/`

Arquivo: `licao-detalhe.component.ts`

```ts
import {
  Component,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject,
  signal,
  computed,
  Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { TrilhasStore } from '../../../core/services/trilhas-store.service';
import { Licao } from '../../../shared/models/licao.model';

@Component({
  standalone: true,
  selector: 'app-licao-detalhe',
  imports: [CommonModule],
  template: `
    @if (!licao()) {
      <p>Carregando lição...</p>
    } @else {
      <section class="licao-detalhe">
        <header class="licao-header">
          <h2>{{ licao()!.titulo }}</h2>
          <p>{{ licao()!.descricaoCurta }}</p>
          <p>
            Nível: {{ licao()!.nivel }} ·
            Duração: {{ licao()!.tempoEstimadoMinutos }} min
          </p>
        </header>

        <div class="licao-layout">
          <!-- Painel de explicação -->
          <section class="painel-explicacao">
            <h3>Explicação</h3>
            <ul>
              <li>
                Entenda como tipos básicos em TypeScript são usados em componentes Angular.
              </li>
              <li>
                Observe o fluxo: variável tipada → signal → template via interpolação.
              </li>
              <li>
                Foque na relação entre o valor digitado e a mensagem derivada.
              </li>
            </ul>
          </section>

          <!-- Painel de código -->
          <section class="painel-codigo">
            <h3>Trechos de código</h3>

            <h4>TypeScript (componente simplificado)
            <pre><code>
readonly nome = signal&lt;string&gt;('');
readonly saudacao = computed(
  () =&gt; this.nome().trim()
    ? `Olá, ${this.nome()}!`
    : 'Digite seu nome acima.'
);
            </code></pre>

            <h4>Template (HTML)
            <pre><code>
&lt;input
  type="text"
  [ngModel]="nome()"
  (ngModelChange)="nome.set($event)"
/&gt;

&lt;p&gt;{{ saudacao() }}&lt;/p&gt;
            </code></pre>
          </section>

          <!-- Painel de demo -->
          <section class="painel-demo">
            <h3>Demo interativa</h3>

            <ng-container #demoContainer></ng-container>

            <button type="button" (click)="marcarComoConcluida()">
              Marcar lição como concluída
            </button>
          </section>
        </div>
      </section>
    }
  `,
})
export class LicaoDetalheComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly trilhasStore = inject(TrilhasStore);

  @ViewChild('demoContainer', { read: ViewContainerRef, static: true })
  demoContainer!: ViewContainerRef;

  private demoRef?: ComponentRef<unknown>;

  private readonly licaoId = signal<string | null>(null);

  readonly licao = computed<Licao | undefined>(() => {
    const id = this.licaoId();
    if (!id) return undefined;
    return this.trilhasStore.obterLicao(id);
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.licaoId.set(id);
      this.carregarDemo();
    });
  }

  ngOnDestroy(): void {
    this.demoRef?.destroy();
  }

  private carregarDemo(): void {
    this.demoContainer.clear();
    const licao = this.licao();
    if (!licao) return;

    const componente = licao.componenteDemo as Type<unknown>;
    this.demoRef = this.demoContainer.createComponent(componente);
  }

  marcarComoConcluida(): void {
    const id = this.licaoId();
    if (!id) return;

    this.trilhasStore.marcarLicaoConcluida(id, true);
    // Futuro: mostrar feedback visual, navegar de volta para a trilha, etc.
  }
}
```

Observação: aqui usamos `ViewContainerRef.createComponent` em vez de `ngComponentOutlet` para maior controle. Isso continua pedagógico e deixa clara a ideia de “injetar” a demo dinamicamente.

## 9. Ajustes nas rotas (se necessário)

Verificar `src/app/routing/app.routes.ts` e garantir que:

* `DashboardTrilhasComponent`, `DetalheTrilhaComponent` e `LicaoDetalheComponent` importam dos caminhos corretos:

```ts
import { DashboardTrilhasComponent } from '../features/trilhas/pages/dashboard-trilhas/dashboard-trilhas.component';
import { DetalheTrilhaComponent } from '../features/trilhas/pages/detalhe-trilha/detalhe-trilha.component';
import { LicaoDetalheComponent } from '../features/licoes/pages/licao-detalhe/licao-detalhe.component';
```

* E que as rotas são:

```ts
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
```

## 10. Checklist de conclusão do Passo 3

O Passo 3 está concluído quando:

1. A aplicação sobe sem erros (`npm run start` / `ng serve`).
2. Ao acessar `/`:
   * É exibida a trilha “Fundamentos TypeScript para Angular”.
   * É exibido um valor de progresso global (0% ou 100%, dependendo do estado).
3. Ao clicar na trilha:
   * `/trilhas/fundamentos-typescript` mostra detalhes da trilha e a lição “Tipos básicos em TypeScript”.
4. Ao clicar na lição:
   * `/licoes/ts-tipos-basicos` mostra:
     * Explicação textual,
     * Trechos de código,
     * Demo “Bindings Básicos” em funcionamento.
5. Ao clicar em “Marcar lição como concluída”:
   * Recarregar a página em `/` mostra o progresso atualizado (> 0%).
   * Recarregar `/trilhas/fundamentos-typescript` mostra progresso da trilha atualizado.
```
