# Passo 2 – Configurar bootstrap e providers da aplicação

## 0. Objetivo do passo 2

Colocar a aplicação para subir com:

* `bootstrapApplication` em `main.ts`,
* `ApplicationConfig` em `core/config/app.config.ts`,
* Rotas centrais em `routing/app.routes.ts`,
* Providers globais essenciais configurados:

  * Router (`provideRouter`),
  * PrimeNG com tema (`providePrimeNG`),
  * HTTP (`provideHttpClient`),
  * DataSource de trilhas (`TrilhasDataSource` → `TrilhasStaticDataSource`),
  * Repositório de progresso (`ProgressRepository` → `LocalStorageProgressRepository`),
  * (opcional) ErrorHandler global.

Mesmo que a UI ainda seja simples, o esqueleto da aplicação Angular precisa estar sólido e alinhado à arquitetura.

---

## 1. Pré-requisitos de estrutura

Antes de mexer em código, garanta que estas pastas existam:

```text
src/
  main.ts
  app/
    core/
      config/
      layout/
      services/
      data-access/
      error-handling/
    routing/
    shared/
    features/
```

Se alguma delas não existir, crie agora, **mesmo vazia**. Não mova nada antigo ainda; o objetivo é preparar o terreno.

---

## 2. Arquivo `main.ts` – bootstrap com `bootstrapApplication`

### 2.1. Objetivo

* Substituir (ou garantir) o uso de `bootstrapApplication` em vez de `platformBrowserDynamic`.
* Apontar para o `AppShellComponent` como componente raiz.
* Carregar o `appConfig` de `core/config/app.config.ts`.

### 2.2. Implementação sugerida

Arquivo: `src/main.ts`

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/core/config/app.config';
import { AppShellComponent } from './app/core/layout/app-shell/app-shell.component';

bootstrapApplication(AppShellComponent, appConfig)
  .catch((err) => console.error(err));
```

### 2.3. Observações

* Se `AppShellComponent` ainda não existe:

  * Crie um componente standalone minimal em
    `src/app/core/layout/app-shell/app-shell.component.ts`
    (não precisa estar perfeito visualmente neste passo).
* Garanta que não haja mais nenhum `main.ts` antigo usando `platformBrowserDynamic` ou `NgModule`.

---

## 3. Arquivo `app.config.ts` – `ApplicationConfig` e providers globais

### 3.1. Objetivo

* Centralizar configuração de providers globais Angular:

  * Router, animações, HTTP.
* Registrar providers de infraestrutura:

  * `TrilhasDataSource` → `TrilhasStaticDataSource`,
  * `ProgressRepository` → `LocalStorageProgressRepository`,
  * `ErrorHandler` global (pode ser um stub inicial).

### 3.2. Estrutura base do arquivo

Arquivo: `src/app/core/config/app.config.ts`

```ts
import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { appRoutes } from '../../routing/app.routes';

import { TrilhasDataSource } from '../data-access/trilhas.datasource';
import { TrilhasStaticDataSource } from '../data-access/trilhas-static.datasource';

import { ProgressRepository } from '../data-access/progress.repository';
import { LocalStorageProgressRepository } from '../data-access/local-storage-progress.repository';

import { GlobalErrorHandler } from '../error-handling/global-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    // Router com suporte a binding de inputs a partir da rota
    provideRouter(appRoutes, withComponentInputBinding()),

    // PrimeNG 21 – tema Aura (não adicionar provideAnimations: PrimeNG 21 usa CSS nativo)
    providePrimeNG({ theme: { preset: Aura } }),

    // HTTP Client
    provideHttpClient(),

    // Error handler global (pode ser um stub inicial)
    { provide: ErrorHandler, useClass: GlobalErrorHandler },

    // DataSource de trilhas: hoje é estático (mock), amanhã pode ser API
    { provide: TrilhasDataSource, useClass: TrilhasStaticDataSource },

    // Persistência de progresso: hoje é localStorage
    { provide: ProgressRepository, useClass: LocalStorageProgressRepository },
  ],
};
```

> Se algum desses tipos (`TrilhasDataSource`, `TrilhasStaticDataSource`, `ProgressRepository`, `LocalStorageProgressRepository`, `GlobalErrorHandler`) ainda não existir, crie stubs mínimos (seção 5 e 6).

---

## 4. Arquivo `app.routes.ts` – definição de rotas centrais

### 4.1. Objetivo

* Ter um único ponto de definição das rotas principais da aplicação.
* Mesmo que os componentes finais ainda não estejam prontos, criar rotas que compilarão com **placeholders**.

### 4.2. Implementação base

Arquivo: `src/app/routing/app.routes.ts`

```ts
import { Routes } from '@angular/router';

// Ajuste os caminhos de import conforme a estrutura atual.
// Em um cenário final, estes estariam em features/trilhas e features/licoes.
import { DashboardTrilhasComponent } from '../features/trilhas/pages/dashboard-trilhas/dashboard-trilhas.component';
import { DetalheTrilhaComponent } from '../features/trilhas/pages/detalhe-trilha/detalhe-trilha.component';
import { LicaoDetalheComponent } from '../features/licoes/pages/licao-detalhe/licao-detalhe.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: DashboardTrilhasComponent,
    data: { breadcrumb: 'Início', feature: 'trilhas' },
  },
  {
    path: 'trilhas/:id',
    component: DetalheTrilhaComponent,
    data: { breadcrumb: 'Trilha', feature: 'trilhas' },
  },
  {
    path: 'licoes/:id',
    component: LicaoDetalheComponent,
    data: { breadcrumb: 'Lição', feature: 'licoes' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
```

### 4.3. Caso os componentes ainda não existam

Se qualquer um desses componentes não existir nos caminhos indicados, há duas opções:

1. **Eles já existem em outro lugar (ex.: raiz de `app/components`):**

   * Ajuste temporariamente os imports para apontar onde eles realmente estão.
   * Planeje a migração para `features/trilhas/...` e `features/licoes/...` em um passo futuro.

2. **Eles não existem ainda:**

   * Crie **placeholders** minimalistas (standalone) apenas para permitir que o routing compile.
     Exemplo de placeholder:

     ```ts
     import { Component } from '@angular/core';

     @Component({
       selector: 'app-dashboard-trilhas',
       template: `<p>Dashboard Trilhas (placeholder)</p>`,
     })
     export class DashboardTrilhasComponent {}
     ```

   * Repita o padrão para `DetalheTrilhaComponent` e `LicaoDetalheComponent`.

O importante neste passo não é o layout final, mas ter o **fluxo de rotas funcionando**.

---

## 5. Stubs mínimos de Data Access (caso ainda não existam)

### 5.1. `TrilhasDataSource` (abstrata)

Arquivo: `src/app/core/data-access/trilhas.datasource.ts`

```ts
import { Trilha } from '../../shared/models/trilha.model';
import { Licao } from '../../shared/models/licao.model';

export abstract class TrilhasDataSource {
  abstract listarTrilhas(): Promise<Trilha[]>;
  abstract obterTrilhaPorId(id: string): Promise<Trilha | undefined>;
  abstract listarLicoes(): Promise<Licao[]>;
  abstract obterLicaoPorId(id: string): Promise<Licao | undefined>;
}
```

### 5.2. `TrilhasStaticDataSource` (mock inicial)

Arquivo: `src/app/core/data-access/trilhas-static.datasource.ts`

```ts
import { Injectable } from '@angular/core';

import { TrilhasDataSource } from './trilhas.datasource';
import { Trilha } from '../../shared/models/trilha.model';
import { Licao } from '../../shared/models/licao.model';

const TRILHAS_MOCK: Trilha[] = [
  {
    id: 'fundamentos-typescript',
    titulo: 'Fundamentos TypeScript para Angular',
    descricao: 'Tipos básicos, interfaces e classes simples aplicadas a Angular.',
    nivel: 'iniciante',
    categoriaPrincipal: 'Fundamentos',
    licoes: [], // por enquanto vazio; será populado depois
  },
];

const LICOES_MOCK: Licao[] = [
  // exemplo mínimo; pode ser refinado no passo 3
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

> Neste passo, o conteúdo de `TRILHAS_MOCK` e `LICOES_MOCK` pode ser mínimo. O detalhamento das trilhas e lições vem nos passos seguintes.

---

## 6. Stubs mínimos de ProgressRepository (caso ainda não existam)

### 6.1. `ProgressRepository` (abstrata)

Arquivo: `src/app/core/data-access/progress.repository.ts`

```ts
export abstract class ProgressRepository {
  abstract carregar(): Record<string, boolean>;
  abstract salvar(mapa: Record<string, boolean>): void;
}
```

### 6.2. `LocalStorageProgressRepository`

Arquivo: `src/app/core/data-access/local-storage-progress.repository.ts`

```ts
import { Injectable } from '@angular/core';
import { ProgressRepository } from './progress.repository';

const STORAGE_KEY = 'learn-angular21-progress';

@Injectable({ providedIn: 'root' })
export class LocalStorageProgressRepository implements ProgressRepository {
  carregar(): Record<string, boolean> {
    if (typeof localStorage === 'undefined') {
      return {};
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      return JSON.parse(raw) as Record<string, boolean>;
    } catch {
      return {};
    }
  }

  salvar(mapa: Record<string, boolean>): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mapa));
    } catch {
      // em produção, logar o erro
    }
  }
}
```

---

## 7. Stub mínimo de `GlobalErrorHandler` (opcional, mas recomendado)

Arquivo: `src/app/core/error-handling/global-error-handler.ts`

```ts
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    // Ponto central para logar erros
    // No início, pode ser apenas console.error
    console.error('Erro global capturado:', error);
  }
}
```

Caso ainda não queira habilitar um handler específico, você pode:

* Remover o provider `{ provide: ErrorHandler, useClass: GlobalErrorHandler }` do `app.config.ts`, ou
* Deixar esse handler simples e evoluir depois.

---

## 8. Integração com `AppShellComponent` (checagem mínima)

### 8.1. Verificar imports

No `AppShellComponent`, certifique-se que:

* O componente é standalone,
* Importa o `RouterOutlet`:

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet],
  template: `
    <div class="app-shell">
      <header class="app-header">
        <h1>Plataforma Educacional Angular 21</h1>
      </header>

      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppShellComponent {}
```

> Estilos podem ser adicionados depois; aqui o foco é ter o roteamento funcional.

---

## 9. Checklist de conclusão do Passo 2

O Passo 2 está concluído quando:

1. `npm run start` ou `ng serve`:

   * Compila sem erros de rota/providers.
2. O navegador:

   * Abre `http://localhost:4200` (ou porta equivalente),
   * Mostra o `AppShellComponent`,
   * Carrega o componente configurado na rota `/` (mesmo que seja um placeholder).
3. A aplicação:

   * Não quebra se recarregar a página em `/trilhas/qualquer-id` ou `/licoes/qualquer-id` (apenas deve cair nos placeholders ou páginas ainda simples).

---
