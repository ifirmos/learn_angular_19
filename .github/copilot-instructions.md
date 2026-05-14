# Copilot Instructions – Plataforma Educacional Angular 21

## 1. Contexto do projeto

Plataforma educacional interativa sobre Angular, em **português brasileiro**.
Público-alvo: desenvolvedores aprendendo Angular.
Conteúdo organizado em **Trilhas → Lições → Demos**.
Tema: escuro minimalista. Referência detalhada: `docs/guia-agente-ia.md`.

## 2. Stack e versões

- Angular 21 (standalone por padrão, zoneless por padrão)
- PrimeNG 21 com preset Aura escuro (`@primeuix/themes/aura`)
- TypeScript com `strict: true`
- SCSS para estilos globais; CSS encapsulado por componente
- Sem NgModules, sem Zone.js

## 3. Padrões Angular obrigatórios

Fonte: `https://angular.dev/assets/context/guidelines.md`

- **NÃO** declare `standalone: true` — componentes são standalone por padrão
- Use `input()` e `output()` em vez de `@Input()` / `@Output()`
- Use `inject()` em vez de injeção por construtor
- **SEMPRE** declare `changeDetection: ChangeDetectionStrategy.OnPush` em todo componente
- Use `@if`, `@for`, `@switch` — **NÃO** use `*ngIf`, `*ngFor`, `*ngSwitch`
- Use `[class.nome]` ou `[class]` — **NÃO** use `[ngClass]`
- Use `[style.prop]` — **NÃO** use `[ngStyle]`
- Use objeto `host: {}` no decorador — **NÃO** use `@HostBinding` / `@HostListener`
- Use `NgOptimizedImage` para todas as imagens estáticas (`<img ngSrc="..." width="X" height="Y">`)
- Use `signal()`, `computed()`, `linkedSignal()` para estado reativo local
- Use `resource()` / `rxResource()` para dados assíncronos reativos (experimental no v21)
- Use `@defer (on viewport)` para componentes pesados não visíveis no carregamento inicial
- Use `DestroyRef` + `takeUntilDestroyed()` para cancelar subscriptions
- Use `afterNextRender()` / `afterEveryRender()` em vez de `ngAfterViewInit` para DOM APIs

## 4. Organização de pastas (imutável)

```
src/app/
  core/       # infraestrutura: layout, config, data-access, error-handling, services
  shared/     # componentes e tipos reutilizáveis sem regra de negócio
  features/   # funcionalidades por domínio (trilhas/, licoes/)
  routing/    # definição central de rotas
```

**Nunca** criar `src/app/services/` ou `src/app/components/` genéricos.

## 5. PrimeNG 21 – configuração obrigatória

```typescript
// src/app/core/config/app.config.ts
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

const MeuPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      dark: { /* tokens escuros customizados */ }
    }
  }
});

providers: [
  provideRouter(appRoutes, withComponentInputBinding()),
  providePrimeNG({
    theme: {
      preset: MeuPreset,
      options: { darkModeSelector: '.app-dark' }
    }
  })
  // NÃO adicionar provideAnimations nem provideAnimationsAsync
  // PrimeNG 21 usa animações CSS nativas
]
```

Para dark mode toggle: `document.querySelector('html')!.classList.toggle('app-dark')`.

## 6. Servidores MCP disponíveis

Configurados em `.vscode/mcp.json`:

**`@angular/cli` MCP** — use para scaffold:
- Antes de criar componente, serviço, guard ou pipe, use via `ng generate`
- Garante estrutura correta e imports automáticos

**`@primeng/mcp`** — consulte **antes** de usar qualquer componente PrimeNG:
- `get_component_props` — props e tipos da versão 21
- `get_component_tokens` — tokens de theming disponíveis
- `get_usage_example` — exemplos de uso reais
- `migrate_v20_to_v21` — ao refatorar código PrimeNG legado
- `suggest_component` — quando não souber qual componente usar

> Se o MCP retornar API diferente dos docs internos, **o MCP tem precedência**.

## 7. Regras de didática

- Um conceito por lição; explicação curta (máx. 3 parágrafos)
- Cada demo: ≥ 2 controles de entrada, ≥ 1 saída reativa visível
- Nomes de variáveis em português, autoexplicativos
- Comentários nos trechos de código quando o conceito for pedagógico
- **Não** adicionar abstrações desnecessárias — clareza > elegância

## 8. Referências

- Guia do agente: `docs/guia-agente-ia.md`
- Arquitetura: `docs/arquitetura-plataforma-educacional-angular19.md`
- Theming PrimeNG 21: `docs/primeng-21-theming-styled.md`
- Angular APIs: `https://angular.dev/assets/context/llms-full.txt`
