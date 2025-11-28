# Guia permanente para o agente de IA

*Plataforma Educacional Angular 19*

## 1. Propósito deste guia

Este documento define **regras fixas**, **fontes de verdade** e um **roteiro de próximos passos** para qualquer agente de IA que interaja com este repositório no futuro.

Objetivo: garantir que o agente:

* Não se perca com o tempo.
* Respeite o **briefing original (“Codex”)** e a **arquitetura base endurecida**.
* Evolua o projeto passo a passo, sem romper a didática nem o escopo da plataforma.

Sempre que houver dúvida sobre decisões de arquitetura, **este guia + o Codex + o documento de arquitetura** são as referências principais.

---

## 2. Fontes de verdade (ordem de prioridade)

O agente deve sempre considerar, nesta ordem de prioridade:

1. **Briefing original (“Codex”)**

   * Documento que define visão, público-alvo, tom, e propósito da plataforma.
   * Define: trilhas, lições, tema escuro minimalista, demos interativas curtas, foco em didática.

2. **Documento de Arquitetura**

   * Arquivo de referência de arquitetura endurecida da Plataforma Educacional Angular 19.
   * Define organização de pastas, modelos, stores, data sources, design system, rotas e fluxo geral.

3. **Este Guia do Agente de IA**

   * Define como o agente deve usar os documentos acima para planejar e implementar próximos passos, sem fugir do briefing.

4. **Código existente na branch principal**

   * Implementação real em `src/`.
   * Se houver divergência entre código e documentos, o agente deve:

     * Preferir o **Codex + Arquitetura + este Guia**,
     * E planejar uma **refatoração incremental**, em vez de misturar abordagens incompatíveis.

5. **Outros documentos em `docs/` ou pastas auxiliares**

   * Roadmaps, anotações, checklists, etc., devem ser considerados **secundários** em relação aos três itens acima.

Se houver conflito entre qualquer artefato e o **Codex**, o agente deve sinalizar essa divergência ao humano (ex.: via comentário de PR, ou mensagem) e propor ajuste alinhado ao Codex.

---

## 3. Mandamentos para o agente de IA

### 3.1. Sobre a visão do produto

1. **A plataforma é educacional** sobre Angular, não um sistema genérico.

2. O público é desenvolvedor que está **aprendendo ou consolidando** Angular 19.

3. Cada lição deve ser sempre:

   * Curta,
   * Visual,
   * Interativa,
   * Com foco em **um conceito claro por vez**.

4. O tema é **escuro minimalista**; não introduzir temas claros ou visualmente confusos sem alinhamento explícito.

### 3.2. Sobre a stack e padrões técnicos

1. A stack principal é:

   * Angular 19 (standalone, sem NgModules),
   * PrimeNG 19,
   * Signals/computed para estado reativo.

2. O agente deve usar:

   * `bootstrapApplication` em `main.ts`,
   * `provideRouter` e `provideAnimations` no `app.config.ts`.

3. Deve-se preferir:

   * **componentes standalone**,
   * Novo fluxo de controle (`@if`, `@for`),
   * Serviços injetáveis leves para estado (`Stores`).

4. Não introduzir:

   * `NgModule` novos,
   * Bibliotecas de UI paralelas (Angular Material, etc.) sem justificativa muito forte e aprovação explícita.

### 3.3. Sobre organização de código

1. O agente deve respeitar a organização **feature-first**:

   * `core/` para infraestrutura (layout, serviços globais, data-access, error handling, config),
   * `shared/` para componentes e tipos reutilizáveis, sem regra de negócio,
   * `features/` para funcionalidades (trilhas, lições, admin).

2. Quando precisar criar algo novo, primeiro perguntar:

   * Isso é infraestrutura única? → vai em `core/`.
   * Isso é reutilizável e sem regra de negócio? → vai em `shared/`.
   * Isso é específico de trilhas, lições ou outro domínio? → vai em `features/<domínio>/`.

3. **Nunca criar** pastas grandes genéricas como `src/app/services`, `src/app/components` para coisas novas, se já existe a estrutura `core/shared/features`.

### 3.4. Sobre didática e legibilidade

1. O código deve ser **pedagógico**:

   * Nomes de variáveis e componentes claros e autoexplicativos,
   * Comentários pontuais quando o conceito for importante para aprendizado.

2. Evitar:

   * Abstrações exageradas que dificultem o entendimento para quem está estudando,
   * “Magia” ou metaprogramação desnecessária.

3. Ao refatorar, sempre perguntar:
   “Isso deixa o código **mais fácil de ensinar** para alguém que está aprendendo Angular?”

---

## 4. Próximo passo imediato – o que o agente deve fazer agora

Supondo que o **documento de arquitetura** já esteja sincronizado no repositório, o **próximo passo concreto** para o agente é:

> **Alinhar o esqueleto técnico do projeto à arquitetura endurecida, sem quebrar o que já existe.**

Isso se divide em um conjunto de subpassos:

### 4.1. Garantir a estrutura de pastas base

1. Verificar se a estrutura `src/app` já está organizada como:

   ```text
   src/app/
     core/
     shared/
     features/
     routing/
   ```

2. Se não estiver, o agente deve:

   * Criar essas pastas,
   * **Não sair movendo tudo de uma vez**; começar adicionando novos artefatos nos lugares corretos,
   * Mapear (em comentário ou doc) quais componentes atuais serão, no futuro, realocados para `features/trilhas` ou `features/licoes`.

3. Criar, no mínimo, os arquivos vazios (ou com esqueleto inicial):

   * `src/app/core/config/app.config.ts`
   * `src/app/core/layout/app-shell/app-shell.component.ts`
   * `src/app/shared/theme/theme-tokens.ts`
   * `src/app/routing/app.routes.ts`

### 4.2. Configurar bootstrap e providers (Fase de infra)

1. Em `main.ts`, garantir que o bootstrap utiliza `bootstrapApplication` e referencia `AppShellComponent` e `appConfig`.

2. Em `app.config.ts`, garantir que o agente:

   * Usa `provideRouter(appRoutes)`,
   * Usa `provideAnimations()`,
   * Registra o `TrilhasDataSource` (mock) e `ProgressRepository` (localStorage) como providers.

3. Em `app.routes.ts`, criar rotas base, ainda que com componentes placeholder, seguindo:

   ```ts
   // /  → Dashboard trilhas
   // /trilhas         → Lista de trilhas
   // /trilhas/:id     → Detalhe da trilha
   // /licoes/:id      → Página da lição
   ```

   Mesmo que algumas páginas ainda sejam placeholders simples.

### 4.3. Criar o AppShellComponent com layout mínimo

1. O agente deve criar `AppShellComponent` standalone com:

   * Header simples com título da plataforma,
   * Área central com `<router-outlet>`,
   * Hook para aplicar tema (`ThemeService`) na inicialização.

2. O layout não precisa estar perfeito visualmente neste passo, mas deve:

   * Usar fundo escuro,
   * Utilizar algumas cores do `theme-tokens` (mesmo que inline inicialmente),
   * Reservar espaço para o componente de progresso global.

### 4.4. Introduzir design tokens centralizados

1. O agente deve criar `shared/theme/theme-tokens.ts` com a paleta especificada no documento de arquitetura.

2. Opcionalmente, criar um SCSS base (`shared/theme/theme.scss`) referenciando esses tokens como CSS custom properties.

3. O agente deve instruir o `ThemeService` a aplicar as principais cores como CSS variables em `:root`.

### 4.5. Criar esqueleto de TrilhasDataSource e ProgressRepository

1. Criar `TrilhasDataSource` (abstrato) em `core/data-access/trilhas.datasource.ts`.

2. Criar `TrilhasStaticDataSource` em `core/data-access/trilhas-static.datasource.ts` com uma implementação mínima (mesmo que com poucos dados dummy).

3. Criar `ProgressRepository` e `LocalStorageProgressRepository`:

   * Armazenando um dicionário simples: `{ [licaoId: string]: boolean }`,
   * Usando uma chave clara, ex.: `"learn-angular19-progress"`.

4. Não é necessário carregar uma grande base de trilhas neste passo; o objetivo é ter o esqueleto pronto e funcional com pelo menos:

   * 1 trilha (ex.: “Fundamentos TypeScript”),
   * 1–2 lições dummy.

### 4.6. Criar esqueleto de TrilhasStore

1. Criar `TrilhasStore` em `core/services/trilhas-store.service.ts`, conforme o documento de arquitetura:

   * `trilhasSignal`, `licoesSignal`, `conclusoesPorLicao`,
   * `trilhas`, `licoes`, `progressoGlobal`,
   * `progressoDaTrilha(trilhaId)`,
   * `inicializar()`,
   * `marcarLicaoConcluida(licaoId, concluida)`.

2. Integrar com `TrilhasDataSource` e `ProgressRepository`.

3. Chamar `TrilhasStore.inicializar()` em um ponto central (preferencialmente no `AppShellComponent`, via `ngOnInit` ou `effect`), garantindo que a aplicação tenha dados antes de renderizar rotas dependentes.

### 4.7. Criar um fluxo mínimo de ponta a ponta

O próximo passo imediato **depois** do esqueleto estar de pé:

1. Criar uma **trilha dummy** e pelo menos **uma lição dummy** no `TrilhasStaticDataSource`.

2. Implementar um fluxo mínimo:

   * `/` mostra a trilha dummy no dashboard.
   * `/trilhas/:id` mostra detalhes mínimos da trilha (apenas título e lista de lições).
   * `/licoes/:id` mostra uma página de lição com:

     * Texto placeholder em PainelExplicacaoLicao,
     * Bloco `<pre><code>` com código dummy,
     * Um componente demo minimal (ex.: um contador com `signal`).

3. Garantir que o botão “Concluir lição” atualize:

   * O mapa de conclusões em `TrilhasStore`,
   * O progresso global.

Esse fluxo end-to-end valida a arquitetura e o contrato entre camadas.

---

## 5. Backlog orientado ao agente (ordem recomendada)

Depois de concluído o “próximo passo imediato” acima, o agente deve seguir, **sempre referenciado pelo Codex**, esta ordem macro:

1. **Consolidar a Trilha “Fundamentos TypeScript”**

   * 3–5 lições com demos simples.
   * Conteúdos: tipos básicos, interfaces, classes simples, generics leves aplicados a serviços.

2. **Consolidar a Trilha “Fundamentos Angular”**

   * Componentes standalone, ciclo de template, DI básica, roteamento com `provideRouter`.

3. **Criar Trilha de “Bindings Essenciais”**

   * Interpolação, property binding, event binding, two-way binding com `[(ngModel)]`.
   * Demos curtas e visuais, sempre unindo controles de input a visualizações reativas.

4. **Criar Trilha de “Signals e Computeds”**

   * Contador reativo, lista filtrada, badge de status derivado.
   * Mostrar diferença entre estado imperativo e signals.

5. **Criar Trilha de “Formulários Reativos”**

   * `FormGroup`, validações síncronas, mensagens de erro ao vivo, resumo dos dados em cards/badges.

6. **Polir o Design System**

   * Refinar temas, tipografia e espaçamentos,
   * Criar primitivos de UI consolidados (UiCard, UiButton, UiBadge),
   * Reduzir CSS duplicado em favor de tokens e variáveis.

7. **Refatorar gradualmente componentes antigos**

   * Migrar componentes que estejam fora de `features/` e `shared/` para a arquitetura nova,
   * Sempre em pequenos passos, com PRs focados.

8. **Adicionar Telemetria e Melhorar Acessibilidade**

   * Eventos simples em `TelemetryService`,
   * Focus states, ARIA, navegação por teclado nas demos.

---

## 6. Como o agente deve tomar decisões no futuro

### 6.1. Em caso de dúvida de arquitetura

1. Ler novamente:

   * Codex (briefing original),
   * Documento de Arquitetura,
   * Este Guia.

2. Priorizar:

   * **Didática sobre sofisticação técnica**,
   * **Consistência de domínio** (trilhas, lições, demos) sobre atalhos rápidos.

3. Se ainda assim a dúvida persistir, o agente deve:

   * Formular a decisão em termos de trade-offs (ex.: “A opção A simplifica, mas quebra X; a opção B é mais fiel ao Codex”),
   * E propor explicitamente a melhor recomendação alinhada ao Codex.

### 6.2. Sobre mudanças grandes

Para mudanças grandes (refatorações, introdução de novas libs, mudanças de design):

1. Nunca aplicar uma mudança estrutural profunda sem:

   * Atualizar o **documento de arquitetura**,
   * Verificar impacto nas trilhas e lições já existentes.

2. Sempre que uma decisão estrutural contrariar algo escrito neste guia ou no documento de arquitetura, o agente deve:

   * Explicitar a divergência,
   * Propor também a atualização dos documentos.

---

## 7. Glossário rápido para o agente

* **Codex**: documento de briefing original da plataforma, definindo visão, público-alvo, tom, conceitos-chave (trilhas, lições, demos).
* **Trilha**: agrupamento de lições sobre um tema (ex.: Fundamentos TS, Signals, Formulários).
* **Lição**: unidade mínima de conteúdo. Possui explicação, código e demo.
* **Demo**: componente standalone, interativo, usado na terceira região da página de lição.
* **Store**: serviço que encapsula estado reativo via `signal`/`computed` (ex.: `TrilhasStore`).
* **DataSource**: classe responsável por fornecer dados (mock ou API) para o domínio.
* **ProgressRepository**: abstração de persistência de progresso (localStorage hoje, backend amanhã).

---

Com este guia:

* O agente sabe qual é o **próximo passo concreto** (alinhar esqueleto técnico e criar fluxo mínimo de trilha+lição).
* Sabe **como não se perder no futuro**, mesmo com crescimento do código.
* Sabe que o **Codex + Arquitetura + este Guia** são a referência máxima, acima de qualquer solução rápida que contrarie a visão da plataforma.

Se quiser, posso agora gerar uma versão reduzida (resumo executivo) deste guia para ser mencionada no `README.md`, apenas apontando para este arquivo e explicitando “Como a IA deve atuar neste repositório”.
