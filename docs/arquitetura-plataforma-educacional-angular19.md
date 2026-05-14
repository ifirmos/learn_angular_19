# Plataforma Educacional Angular 21 – Arquitetura

## 1. Contexto e objetivo

Plataforma web educacional em **Angular 21** + **PrimeNG 21**, com foco em:

* Ensinar Angular por meio de **trilhas** e **lições**.
* Cada lição contém:

  * Explicação curta.
  * Trechos de código TS/HTML.
  * Demonstração interativa reativa.

Este documento descreve a **arquitetura base endurecida**, pensada para:

* Ser didática para quem está aprendendo Angular.
* Escalar com segurança conforme novas trilhas, lições e features sejam adicionadas.
* Separar bem domínio, UI, estado e infraestrutura.

---

## 2. Stack e visão geral

* **Framework:** Angular 21 (standalone por padrão, zoneless por padrão, `bootstrapApplication`, `provideRouter`, `providePrimeNG`).
* **UI:** PrimeNG 21 (+ componentes de UI próprios).
* **Tema:** dark theme minimalista (tokens de design PrimeNG 21).
* **Estado:** `signal` / `computed` / `linkedSignal` em services tipo "Store".
* **Dados:** fonte estática (in-memory) na Fase 1, preparada para API/Backend futuro.
* **Idioma:** todo conteúdo em português.

**Servidores MCP disponíveis** (`.vscode/mcp.json`):

* `@angular/cli MCP` – scaffold de componentes, serviços e guards via `ng generate`.
* `@primeng/mcp` – consultar API, props e tokens de componentes PrimeNG antes de implementá-los.

Ver Secão 3.5 do `docs/guia-agente-ia.md` para lista completa de tools MCP.

---

## 3. Princípios de arquitetura

1. **Feature-first:** código organizado por funcionalidade (`trilhas`, `licoes`, `admin`), não por tipo global.
2. **Domínio puro:** modelos (`Trilha`, `Licao`) sem dependência de Angular.
3. **Estado centralizado:** stores leves com `signal`/`computed`, expostos via services.
4. **Design System explícito:** tokens de cor, tipografia e espaçamento centralizados.
5. **Componentes pequenos:** cada componente com responsabilidade clara (layout, listagem, demo etc.).
6. **Extensibilidade previsível:** adicionar trilhas e lições segue um fluxo padrão.
7. **Testabilidade:** lógica de domínio e stores fáceis de testar.
8. **Caminho de evolução:** camada de dados preparada para migração de mock → API.

---

## 4. Organização de pastas

Estrutura macro proposta em `src/app`:

```text
src/
  app/
    core/                 # Infraestrutura e peças únicas da app
      layout/
        app-shell/
          app-shell.component.ts
      services/
        trilhas-store.service.ts
        licoes-registry.service.ts
        theme.service.ts
        navigation.service.ts
        telemetry.service.ts
      data-access/
        trilhas.datasource.ts
        trilhas-static.datasource.ts
        progress.repository.ts
        local-storage-progress.repository.ts
      error-handling/
        global-error-handler.ts
      config/
        app.config.ts
        app.providers.ts
    shared/               # Reuso, sem regra de negócio
      ui/                 # Componentes primitivos (Card, Button, Badge, etc.)
        ui-card/
        ui-button/
        ui-badge/
      components/         # Componentes compartilhados de contexto educacional
        card-trilha/
        badge-nivel/
        resumo-progresso/
      directives/
      pipes/
      models/
        trilha.model.ts
        licao.model.ts
        configuracao-demo.model.ts
      theme/
        theme-tokens.ts
        theme.scss
      utils/
    features/
      trilhas/
        pages/
          dashboard-trilhas/
          lista-trilhas-page/
          detalhe-trilha/
        components/
          lista-trilhas/
          card-trilha-detalhado/
          filtros-trilha/
        state/
          trilhas.facade.ts          # opcional: fachada específica da feature
      licoes/
        pages/
          licao-detalhe/
        components/
          painel-explicacao-licao/
          painel-codigo-licao/
          painel-demo-licao/
        demos/
          demo-bindings-basicos/
          demo-signals-reatividade/
          demo-formularios-reativos/
      admin/                        # reservado para módulo de administração futuro
    routing/
      app.routes.ts
      trilhas.routes.ts
      licoes.routes.ts
```

---

## 5. Domínio (modelos puros)

### 5.1. Trilha

Arquivo: `shared/models/trilha.model.ts`

```ts
export interface Trilha {
  id: string;
  titulo: string;
  descricao: string;
  nivel: 'iniciante' | 'intermediario';
  categoriaPrincipal?: string; // ex.: "Fundamentos", "Signals", etc.
  licoes: Licao[];
}
```

### 5.2. Lição

Arquivo: `shared/models/licao.model.ts`

```ts
export interface Licao {
  id: string;
  trilhaId: string;        // referência reversa
  titulo: string;
  descricaoCurta: string;
  nivel: 'iniciante' | 'intermediario';
  categoria: string;       // "Bindings", "Signals", "Formulários", etc.
  tempoEstimadoMinutos: number;
  concluida: boolean;      // flag pura; progressão real é derivada no store
  componenteDemo: Type<unknown>;
  configuracaoDemo?: ConfiguracaoDemo;
}
```

### 5.3. Configuração de demo

Arquivo: `shared/models/configuracao-demo.model.ts`

```ts
export interface ConfiguracaoDemo {
  objetivo: string;
  acoesPrincipais: string[];
  entradaEsperada: string;
  resultadoEsperado: string;
  dicasObservacao?: string[];
}
```

Nenhum desses modelos importa Angular – são **tipos puros**.

---

## 6. Camada de dados (Data Access)

### 6.1. Abstração de fonte de dados

Arquivo: `core/data-access/trilhas.datasource.ts`

```ts
export abstract class TrilhasDataSource {
  abstract listarTrilhas(): Promise<Trilha[]>;
  abstract obterTrilhaPorId(id: string): Promise<Trilha | undefined>;
  abstract listarLicoes(): Promise<Licao[]>;
  abstract obterLicaoPorId(id: string): Promise<Licao | undefined>;
}
```

### 6.2. Implementação estática (MVP)

Arquivo: `core/data-access/trilhas-static.datasource.ts`

* Usa arrays em memória (`trilhasStatic`, `licoesStatic`).
* Implementa `TrilhasDataSource`.
* É registrada via provider no `app.config.ts`.

No futuro, uma `TrilhasApiDataSource` (HTTP) substitui essa implementação sem afetar UI/stores.

---

## 7. Estado reativo (Stores + Repositórios)

### 7.1. TrilhasStore

Arquivo: `core/services/trilhas-store.service.ts`
Responsável por:

* Armazenar trilhas e lições (signals).
* Armazenar mapa de conclusão de lições (`Record<string, boolean>`).
* Expor `computed` para:

  * Lista de trilhas.
  * Lista de lições.
  * Progresso global.
  * Progresso por trilha.

Esboço simplificado:

```ts
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
    const concluidas = licoes.filter(l => mapa[l.id] ?? l.concluida).length;

    return Math.round((concluidas / total) * 100);
  });

  progressoDaTrilha(trilhaId: string): number {
    const licoes = this.licoesSignal().filter(l => l.trilhaId === trilhaId);
    if (!licoes.length) return 0;

    const mapa = this.conclusoesPorLicao();
    const total = licoes.length;
    const concluidas = licoes.filter(l => mapa[l.id] ?? l.concluida).length;

    return Math.round((concluidas / total) * 100);
  }

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

  marcarLicaoConcluida(licaoId: string, concluida: boolean): void {
    this.conclusoesPorLicao.update(m => {
      const atualizado = { ...m, [licaoId]: concluida };
      this.progressRepo.salvar(atualizado);
      return atualizado;
    });
  }
}
```

> **Angular 21 – Padrões obrigatórios no TrilhasStore**: use `inject()` em vez de injeção por construtor, e `changeDetection: ChangeDetectionStrategy.OnPush` em todos os componentes que consomem este store. Para carregamento assíncrono reativo, `resource()` / `rxResource()` são alternativas ao `async/await` manual (experimentais no Angular 21).

### 7.2. ProgressRepository

Arquivo: `core/data-access/progress.repository.ts`

```ts
export abstract class ProgressRepository {
  abstract carregar(): Record<string, boolean>;
  abstract salvar(mapa: Record<string, boolean>): void;
}
```

Implementação atual: `LocalStorageProgressRepository`:

* Usa `localStorage` com chave fixa (ex.: `learn-angular21-progress`).
* Oculta detalhes de persistência da UI.

### 7.3. LicoesRegistry

Arquivo: `core/services/licoes-registry.service.ts`

Responsável por:

* Indexar lições por `id`.
* Facilitar consultas por `id` e por `trilhaId`.

```ts
@Injectable({ providedIn: 'root' })
export class LicoesRegistry {
  private readonly licoesPorId = new Map<string, Licao>();

  registrarLicoes(licoes: Licao[]): void {
    for (const licao of licoes) {
      this.licoesPorId.set(licao.id, licao);
    }
  }

  obterLicao(id: string): Licao | undefined {
    return this.licoesPorId.get(id);
  }

  listarPorTrilha(trilhaId: string): Licao[] {
    return [...this.licoesPorId.values()].filter(l => l.trilhaId === trilhaId);
  }
}
```

Integração: `TrilhasStore.inicializar()` registra as lições carregadas no `LicoesRegistry`.

---

## 8. Design System e tema

### 8.1. Tokens

Arquivo: `shared/theme/theme-tokens.ts`

```ts
export const colors = {
  background: '#0F172A',
  surfacePrimary: '#111827',
  surfaceSecondary: '#1F2937',
  textPrimary: '#E5E7EB',
  textSecondary: '#9CA3AF',
  accent: '#22D3EE',
  success: '#34D399',
  error: '#F87171',
  border: '#1F2937',
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
} as const;

export const typography = {
  title: '24px',
  subtitle: '18px',
  body: '16px',
  caption: '13px',
};
```

### 8.2. ThemeService

Arquivo: `core/services/theme.service.ts`

Responsabilidades:

* Aplicar tokens via CSS custom properties em `document.documentElement`.
* Futuramente, permitir variações de tema (ex.: alto contraste).

### 8.3. UI primitiva e componentes específicos

* `shared/ui`:

  * `UiCardComponent`: container visual padrão.
  * `UiButtonComponent`: botão com variantes (primário, ghost etc.).
  * `UiBadgeComponent`: badge genérico.

* `shared/components`:

  * `CardTrilhaComponent`: card de trilha usando `UiCardComponent`.
  * `BadgeNivelComponent`: badge de nível (iniciante/intermediário).
  * `ResumoProgressoComponent`: barra/anel de progresso global.

---

## 9. Componentes principais (layout e páginas)

### 9.1. AppShellComponent

* Layout base.
* Aplica tema via `ThemeService`.
* Exibe `ResumoProgressoComponent` global.
* Contém `<router-outlet>` para páginas internas.
* Pode exibir breadcrumbs via `NavigationService`.

### 9.2. DashboardTrilhasComponent (`/`)

* Exibe:

  * Cards de trilhas (via `TrilhasStore.trilhas`).
  * Progresso global (`TrilhasStore.progressoGlobal`).
* Ações:

  * “Iniciar primeira trilha”.
  * “Ver todas as trilhas”.

### 9.3. ListaTrilhasPage + ListaTrilhasComponent (`/trilhas`)

* `ListaTrilhasPageComponent`:

  * Usa `TrilhasStore` para carregar trilhas e filtros.
* `ListaTrilhasComponent`:

  * Componente reaproveitável que recebe lista de trilhas e exibe cards + filtros.

### 9.4. DetalheTrilhaComponent (`/trilhas/:id`)

* Mostra detalhes de uma trilha:

  * Título, descrição, nível, categoria.
  * Progresso da trilha (`TrilhasStore.progressoDaTrilha`).
  * Lição listadas via `LicoesRegistry.listarPorTrilha`.

### 9.5. LicaoDetalheComponent (`/licoes/:id`)

* 3 regiões principais:

  1. **PainelExplicacaoLicao**: texto curto, bullets, tempo estimado.
  2. **PainelCodigoLicao**: tabs TS/HTML usando `<pre><code>` estilizado. Não há `CodeHighlighter` no PrimeNG 21; para highlight avançado, avaliar biblioteca externa com aprovação explícita.
  3. **PainelDemoLicao**: demo interativa via `ngComponentOutlet`.

* Integração com estado:

  * Lição obtida via `LicoesRegistry.obterLicao`.
  * Ao marcar conclusão, chama `TrilhasStore.marcarLicaoConcluida`.

---

## 10. Rotas

### 10.1. Mapa de rotas

* `/` – Dashboard.
* `/trilhas` – Lista de trilhas.
* `/trilhas/:id` – Detalhe da trilha.
* `/licoes/:id` – Página da lição.
* `**` – Redirect para `/`.

### 10.2. Lazy loading por feature

Arquivo: `routing/app.routes.ts`

```ts
export const appRoutes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./trilhas.routes').then(m => m.TRILHAS_ROUTES),
      },
      {
        path: 'trilhas',
        loadChildren: () =>
          import('./trilhas.routes').then(m => m.TRILHAS_ROUTES),
      },
      {
        path: 'licoes',
        loadChildren: () =>
          import('./licoes.routes').then(m => m.LICOES_ROUTES),
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
```

Arquivo: `routing/trilhas.routes.ts`

```ts
export const TRILHAS_ROUTES: Routes = [
  { path: '', component: DashboardTrilhasComponent },
  { path: ':id', component: DetalheTrilhaComponent },
];
```

Arquivo: `routing/licoes.routes.ts`

```ts
export const LICOES_ROUTES: Routes = [
  { path: ':id', component: LicaoDetalheComponent },
];
```

---

## 11. Padrão de demos (componentes interativos)

* Um componente standalone por lição:

  * `DemoBindingsBasicosComponent`
  * `DemoSignalsReatividadeComponent`
  * `DemoFormulariosReativosComponent`
* Cada demo:

  * Usa `signals` como estado local.
  * Usa `computed` para derivar mensagens/listas/indicadores.
  * Usa PrimeNG para inputs (InputText, Slider, ToggleButton etc.).
  * Possui:

    * Área de controles.
    * Área de visualização reativa.
    * Pequeno painel de dicas (“observe o que acontece ao alterar X”).

### 11.1. Interface opcional para metadados de demo

```ts
export interface DemoLicaoMeta {
  readonly titulo?: string;
  readonly descricao?: string;
  readonly dicas?: string[];
}
```

O `PainelDemoLicao` pode tentar ler esses metadados para enriquecer a UI.

---

## 12. Fluxo principal de uso

1. `AppShellComponent` inicializa a aplicação.
2. `TrilhasStore.inicializar()`:

   * Carrega trilhas e lições do `TrilhasDataSource`.
   * Carrega progresso do `ProgressRepository`.
   * Registra lições no `LicoesRegistry`.
3. Usuário navega por:

   * `/` → Dashboard.
   * `/trilhas` e `/trilhas/:id` → overview de trilhas.
   * `/licoes/:id` → lição com explicação, código e demo.
4. Ao marcar lição como concluída:

   * `TrilhasStore.marcarLicaoConcluida(licaoId, true)` é chamado.
   * Signals são atualizados.
   * Progresso global e por trilha são recalculados automaticamente.
   * Progresso é persistido (localStorage, MVP).

---

## 13. Como evoluir o projeto

### 13.1. Adicionar uma nova trilha

1. Definir a trilha em `trilhasStatic`:

   * `id`, `titulo`, `descricao`, `nivel`, `licoes`.
2. Criar as lições associadas em `licoesStatic` com `trilhaId` apropriado.
3. (Opcional) Criar filtros/categorias específicas em `features/trilhas/components/filtros-trilha`.

### 13.2. Adicionar uma nova lição + demo

1. Criar componente demo standalone em `features/licoes/demos/<nome-demo>/`.
2. Seguir o **padrão de blocos play + code** (Seção 11):
   * Cada cenário pedagógico é um `.block` com `.block-play` (interação + resultado) e `.block-code` (código TS + HTML ao vivo).
   * Os valores live são interpolação Angular direta: `<span class="ct-live--N">{{ signal() }}</span>`.
   * Usar `<pre class="cl">` por linha de código.
   * Implementar `codeChange = output<CodeFile[]>()` e emitir no `effect()` do construtor.
3. Definir entrada correspondente em `licoesStatic`:
   * `id`, `trilhaId`, `titulo`, `descricaoCurta`, `nivel`, `categoria`, `tempoEstimadoMinutos`, `componenteDemo`, `configuracaoDemo`.
   * `layout: 'demo-largura-total'` para demos multi-bloco.
4. Garantir que a trilha relevante inclua essa lição em sua lista (`Trilha.licoes`).
5. Nenhuma alteração estrutural é necessária em rotas ou layout.

---

## 14. Roadmap de arquitetura

* Trocar `TrilhasStaticDataSource` por `TrilhasApiDataSource`.
* Persistir progresso por usuário autenticado (substituir `ProgressRepository`).
* Adicionar módulo `admin` para CRUD de trilhas/lições.
* Evoluir design system (documentação interna, variantes, theming avançado).
* Aumentar cobertura de testes em stores e funções de domínio.
* Adicionar i18n quando houver necessidade de outros idiomas.

---

Pronto: este documento já está formatado para ser versionado no Git, revisado via pull requests e usado como referência de arquitetura do projeto. Se quiser, posso gerar também uma versão reduzida para `README.md` na raiz, apontando para este arquivo em `docs/`.
