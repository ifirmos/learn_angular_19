# Especificação de UI/UX – Tela Inicial e Shell da Aplicação

## 1. Contexto e objetivos

O projeto atual já possui:

*   **Estrutura de features:**
    *   `src/app/features/trilhas/pages/dashboard-trilhas/*`
    *   `src/app/features/trilhas/pages/detalhe-trilha/*`
    *   `src/app/features/licoes/pages/licao-detalhe/*`
*   **Componentes compartilhados de apresentação:**
    *   `src/app/shared/components/card-trilha/*`
    *   `src/app/shared/components/badge-nivel/*`
    *   `src/app/shared/components/metricas-rapidas/*`
    *   `src/app/shared/components/resumo-progresso/*`
*   **Camada de estado e dados:**
    *   `src/app/services/trilhas.service.ts`
    *   `src/app/core/services/trilhas-store.service.ts`
    *   `src/app/core/data-access/*`
*   **Modelos** em `src/app/shared/models/*.ts` e `src/app/models/*.ts`
*   **Infra de tema e tokens:**
    *   `src/app/shared/theme/theme-tokens.ts`
    *   `src/app/core/services/theme.service.ts`
*   **Shell / layout em evolução:**
    *   `src/app/core/layout/app-shell/app-shell.component.ts`
    *   (e uma versão antiga em `src/app/app-shell.component.*`)

A tela inicial (dashboard de trilhas) já foi redesenhada para um padrão visual moderno (hero + painel de progresso + grid de trilhas).
O próximo passo é:

1.  **Envolver essa tela dentro de um shell de aplicação completo**, com:
    *   Header global;
    *   Menu lateral (side nav) em desktop;
    *   Footer consistente.
2.  Aproveitar ao máximo o que já existe em `shared/components`, `shared/ui`, `theme-tokens` e `theme.service`.
3.  Definir um guia estável que o agente de IA e o time possam seguir sem descaracterizar a experiência.

## 2. Visão macro do shell de aplicação

### 2.1. Estrutura geral da viewport

Em qualquer página da plataforma (incluindo a inicial):

1.  **Header global** (fixo no topo).
2.  **Rail lateral (side nav)** – somente em telas médias/grandes.
3.  **Área de conteúdo principal** – onde vivem:
    *   Tela inicial (DashboardTrilhas).
    *   Lista/detalhe de trilha.
    *   Detalhe de lição.
4.  **Footer global** – no final da página.

**Visualmente, em desktop:**

*   Header ocupa a largura total.
*   Abaixo dele, a tela se divide em:
    *   Coluna estreita à esquerda (rail de navegação).
    *   Container central de conteúdo (hero + trilhas).
*   Footer ocupa a largura total, abaixo do conteúdo.

**Em mobile:**

*   Header continua visível.
*   Side nav colapsa para um menu acessível via ícone de sanduíche.
*   Conteúdo ocupa toda a largura.
*   Footer permanece no final.

## 3. Header global – especificação

### 3.1. Objetivo

*   Comunicar identidade da plataforma.
*   Oferecer navegação global clara.
*   Dar acesso rápido a tema e perfil do usuário.

### 3.2. Conteúdo do header

Dividir o header em três zonas:

**Zona esquerda – Brand**

*   Logoótipo simplificado da plataforma (ex.: ícone Angular estilizado + "Learn Angular 21").
    *   Use `<img ngSrc="..." width="X" height="Y" />` com `NgOptimizedImage` (import de `@angular/common`) para o logotipo e quaisquer assets estáticos do header — não use `src` diretamente em imagens estáticas.
*   Título curto: "Plataforma Educacional Angular 21".
*   Este título substitui o texto solto que hoje aparece no topo da tela.

**Zona central – Navegação principal**

*   Itens de menu (texto +, opcionalmente, ícone discreto):
    1.  Início
    2.  Trilhas
    3.  Minhas lições
    4.  Playground (futuro)
    5.  Referência (futuro – cheatsheets / docs)

**Regra:**
*   Máximo 5 itens na navegação principal.
*   O item ativo deve ser claramente destacado (cor de acento + indicador visual).

**Zona direita – Ações globais**

*   **Alternador de tema:**
    *   Padrão: tema escuro (Midnight).
    *   Alternativas: Sandstone (claro) e Focus (alto contraste).
*   Ícone de notificações (placeholder, não precisa funcionar no MVP).
*   Avatar com iniciais do usuário (quando autenticação existir) ou ícone genérico de usuário com menu de conta.

### 3.3. Comportamento

**Posicionamento:**
*   Header fixo (sticky) no topo da viewport.

**Ao rolar a página:**
*   O fundo torna-se ligeiramente mais opaco/sólido que o hero.
*   Uma sombra leve é aplicada para destacar o header do restante do conteúdo.

**Estados de navegação:**
*   **Ativo:** item com cor de acento e/ou sublinhado suave.
*   **Hover:** fundo discreto ou leve alteração de cor, com transição de 150–200 ms.
*   **Focus (teclado):** outline visível, consistente para todos os itens.

### 3.4. Integração com o projeto atual

O header deve ser parte do AppShell:
*   `src/app/core/layout/app-shell/app-shell.component.ts` é o ponto natural para orquestrar o layout.

Deve reutilizar:
*   Tokens de cor e tipografia de `shared/theme/theme-tokens.ts`.
*   Eventual componente `UiButton`/`UiCard` de `shared/ui` para botões e chips do header.

Recomenda-se descontinuar ou apenas manter como legado o antigo `src/app/app-shell.component.*`, alinhando tudo ao `core/layout/app-shell`.

## 4. Menu lateral (side nav) – especificação

### 4.1. Objetivo

*   Refogar a sensação de “aplicativo” (não só landing).
*   Evidenciar as áreas principais da plataforma.
*   Oferecer atalho rápido para “modo estudo”.

### 4.2. Estrutura do rail (desktop/tablet)

*   **Largura:** ~72–80 px (versão compacta, ícones apenas).
*   **Fundo:** tom consistente com `bg.body`/`bg.surface`, ligeiramente diferente do conteúdo para criar uma coluna clara.

**Conteúdo vertical:**

**Topo do rail**
*   Ícone da plataforma (mesma marca do header, em versão reduzida).
*   Pode atuar como atalho para “Início”.

**Área central – Navegação por ícone**
*   Ícones empilhados, com tooltips:
    1.  Home (Início)
    2.  Trilhas
    3.  Lição atual
    4.  Playground
    5.  Progresso

**Ícone ativo:**
*   Cor de acento (ciano no tema escuro).
*   Pequena barra vertical ao lado do ícone (indicador de seleção).
*   Tooltip com o nome da seção.

**Base do rail**
*   Ícone de configuração.
*   Ícone de ajuda/atalhos de teclado (opcional).
*   Ícone de sair (logout), quando autenticação existir.

### 4.3. Comportamento responsivo

*   **Desktop:**
    *   Rail sempre visível.
    *   Conteúdo principal deslocado para a direita para acomodar a largura do rail.
*   **Tablet médio:**
    *   Rail pode continuar visível ou colapsar (mesma largura, porém mais integrado à margem).
*   **Mobile:**
    *   Rail some da lateral.
    *   Os mesmos itens aparecem em um painel lateral (off-canvas) acionado por ícone de menu no header.

### 4.4. Integração com o projeto atual

O rail deve ser um subcomponente do AppShell.
Ele pode reutilizar:
*   Ícones do PrimeNG ou biblioteca de ícones já usada no projeto.
*   Tokens de cor de `theme-tokens.ts`.

A lógica de qual ícone está ativo deve refletir o router atual:
*   Arquivo de rotas: `src/app/routing/app.routes.ts`.
*   Seguir as rotas já estabelecidas para `features/trilhas` e `features/licoes`.

## 5. Área de conteúdo principal – alinhamento com o dashboard atual

### 5.1. Posição e respiro

O dashboard atual (hero + painel de progresso + grid de trilhas) passa a viver dentro da “janela” central entre:
1.  Header (topo).
2.  Rail (lado esquerdo, em desktop).
3.  Footer (base).

**Manter:**
*   Largura máxima ~1120px.
*   Margens laterais consistentes.
*   Espaçamento vertical generoso entre hero e seção de trilhas.

### 5.2. Hero + painel de progresso

O hero já está visualmente consistente com o design system. Ao encaixá-lo no shell:

*   **Garantir que o hero não “brigue” com o header:**
    *   Hero começa alguns pixels abaixo do header, com um respiro claro.
*   **Painel de progresso (lado direito do hero):**
    *   Continua sendo o destaque visual secundário.
    *   A animação do anel de progresso e da barra deve ser suave (150–250 ms) ao mudar o valor.

### 5.3. Grid de trilhas

O grid de cards de trilha já é forte visualmente. Reforçar:

*   **Responsividade:**
    *   Desktop: 2–3 colunas.
    *   Tablet: 2 colunas.
    *   Mobile: 1 coluna.
*   **Interação:**
    *   Hover com leve elevação e realce de borda.
    *   Card clicável com área generosa, mantendo o botão “Acessar trilha” como CTA óbvio.

### 5.4. Reuso de componentes existentes

Na tela inicial, a recomendação é continuar usando ao máximo:
*   `CardTrilhaComponent` (`shared/components/card-trilha/`)
*   `BadgeNivelComponent` (`shared/components/badge-nivel/`)
*   `MetricasRapidasComponent` (`shared/components/metricas-rapidas/`)
*   `ResumoProgressoComponent` (`shared/components/resumo-progresso/`)

Esses componentes devem ser centralizados na camada `shared/components` e não duplicados dentro das features.

## 6. Footer global – especificação

### 6.1. Objetivo

*   Sinalizar que a plataforma é organizada e profissional.
*   Oferecer pontos de apoio: ajuda, termos, roadmap.

### 6.2. Estrutura

Duas faixas empilhadas (podem se adaptar para colunas em desktop):

**Faixa superior – Links organizacionais**

*   **Coluna “Plataforma”:**
    *   Sobre
    *   Roadmap
    *   Blog (quando existir)
*   **Coluna “Ajuda”:**
    *   Documentação
    *   FAQ
    *   Contato / Suporte
*   **Coluna “Legal”:**
    *   Termos de uso
    *   Política de privacidade

**Faixa inferior – Meta informações**

*   **Lado esquerdo:**
    *   "© Ano – Plataforma Educacional Angular 21".
    *   Pequena tagline: “Feito para devs que vivem Angular”.
*   **Lado direito:**
    *   Ícone Angular discreto.
    *   Versão da aplicação (ex.: “v0.1.0 – Prévia”).

### 6.3. Aparência

*   **Fundo:** um tom ligeiramente diferente de `bg.body` (um pouco mais escuro para destacar).
*   **Texto:**
    *   Corpo em `text.secondary`.
    *   Links em `accent.primary`, sublinhados em hover.
*   **Espaçamento:**
    *   Padding vertical generoso, alinhado ao padrão da tela.

## 7. Animações, transições e microinterações

### 7.0. Animações no PrimeNG 21

O PrimeNG 21 usa **animações CSS nativas** (sem `provideAnimations`). Personalizar durações e easings sobrescrevendo as classes:

* `.p-anchored-overlay-enter-active` / `.p-anchored-overlay-leave-active` (dropdowns, popovers)
* `.p-collapsible-enter-active` / `.p-collapsible-leave-active` (Accordion, Panel)
* `.p-dialog-enter-active` / `.p-dialog-leave-active` (Dialog)
* `.p-drawer-enter-active` / `.p-drawer-leave-active` (Drawer)

Não use `showTransitionOptions` / `hideTransitionOptions` — deprecated no PrimeNG v21.

### 7.1. Princípios gerais

*   **Duração padrão:** 150–250 ms.
*   **Easing:** curvas suaves (ease-out / curvas cúbicas com leve overshoot, mas sem exagero).
*   Todas as animações devem ter propósito (feedback, não decoração vazia).

### 7.2. Exemplos concretos

*   **Entrada da tela:**
    *   Container principal: movimento leve para cima + fade-in.
    *   Cards de trilha: “stagger” na entrada, em ondas (cada card entra poucos ms depois do anterior).
*   **Hover de card de trilha:**
    *   Elevação de alguns pixels.
    *   Aumento de sombra.
    *   Borda mudando para `accent.primary`.
*   **Hover de botões:**
    *   Leve aumento de brilho.
    *   Sombra mais profunda.
    *   Transição de cor de fundo ou borda conforme variante (primário, secundário).
*   **Filtro de nível:**
    *   Ao trocar filtro, os cards de trilha atuais fazem fade-out + leve deslocamento.
    *   Os novos cards fazem fade-in + leve deslocamento no sentido oposto.
*   **Alternância de tema:**
    *   Transição de cores com interpolação rápida, evitando flash branco.
    *   Respeitar eventual preferência de “reduzir movimento” do usuário (quando implementado).

## 8. Acessibilidade e boas práticas

*   **Contraste:**
    *   Garantir que as combinações de `bg.*` e `text.*` definidas em `theme-tokens.ts` atinjam WCAG AA em textos relevantes.
*   **Focus states:**
    *   Todos os elementos interativos (links, botões, itens de menu, cards clicáveis) precisam de estados de foco visíveis, inclusive para navegação por teclado.
*   **Leitura aumentada:**
    *   Layout deve tolerar aumento de fonte em ~125–150% sem quebra severa.
*   **Ícones + texto:**
    *   Não depender apenas de cor para indicar estado (ex.: usar ícone + texto para warnings e erros).
*   **Side nav em alto contraste:**
    *   Tema Focus deve priorizar bordas fortes e acentos bem marcados, com menos ruído visual.

## 9. Integração com a arquitetura Angular do projeto

> **Dark mode (PrimeNG 21)**: o alternador de tema deve operar via `providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } })`. Para ativar/desativar: `document.querySelector('html')!.classList.toggle('app-dark')`. O `ThemeService` do projeto é o ponto central para essa lógica.

### 9.1. Pontos de acoplamento principais

**AppShell**
`src/app/core/layout/app-shell/app-shell.component.ts`
Responsável por:
*   Renderizar header.
*   Renderizar side nav (rail).
*   Definir o container para `router-outlet`.
*   Renderizar footer.

**Rotas**
`src/app/routing/app.routes.ts`:
*   Rota `/` → Dashboard de trilhas (`features/trilhas/pages/dashboard-trilhas`).
*   Demais rotas (`/trilhas/:id`, `/licoes/:id`) continuam funcionando dentro do shell.

**Tema**
`src/app/core/services/theme.service.ts` + `src/app/shared/theme/theme-tokens.ts`:
*   Header e rail devem consumir tokens de tema via `ThemeService` ou CSS variables, não hardcode.
*   Para dark mode, usar o selector `.app-dark` configurado no `providePrimeNG` (ver Seção 9 acima).

**UI básica**
`src/app/shared/ui/*`:
*   Reutilizar `UiButton`, `UiCard`, `UiBadge` para construir header, rail e footer, evitando CSS ad-hoc.

### 9.2. Decisões de design que impactam código

*   O shell deve ser agnóstico em relação ao conteúdo da página:
    *   Não conhecer detalhes de `TrilhasStore`, apenas renderizar slots/lugares (por exemplo, um espaço no header para exibir progresso atual – se isso fizer sentido em versões futuras).
*   O hero e os cards de trilha permanecem no escopo da feature Trilhas, não do shell.
*   Qualquer novo componente visual criado para o shell (ex.: `HeaderShell`, `SideNavShell`, `FooterShell`) deve ir para:
    *   `src/app/core/layout/` (para layout global), ou
    *   `src/app/shared/components/` se tiver potencial de reuso fora do shell.

> **`@defer`**: use `@defer (on viewport)` para subcomponentes do shell que não são visíveis no carregamento inicial (ex.: setor inferior do footer, painéis laterais em mobile).

## 10. Guia para o agente / implementador

### 10.1. Ordem de implementação sugerida

1.  **Consolidar AppShell**
    *   Decidir se o app-shell legado será removido ou migrado.
    *   Garantir que `core/layout/app-shell` é o único shell usado pelas rotas principais.
2.  **Adicionar Header**
    *   Criar estrutura com as três zonas descritas (brand, navegação, ações).
    *   Conectar navegação aos paths já definidos em `app.routes.ts`.
    *   Integrar alternador de tema com `theme.service`.
3.  **Adicionar Side Nav (desktop)**
    *   Implementar rail com ícones, integrando com o router para estado ativo.
    *   Garantir comportamento responsivo (oculto em mobile, colapsado em tablet se necessário).
4.  **Encaixar Dashboard atual no shell**
    *   Ajustar margens/padding para que a tela que você já tem funcione bem dentro do novo contexto.
    *   Verificar se hero + painel de progresso continuam visualmente equilibrados ao lado do rail.
5.  **Implementar Footer**
    *   Adicionar as seções descritas (Plataforma, Ajuda, Legal + meta).
    *   Garantir que o footer não conflita com a rolagem da página.
6.  **Polir animações e estados**
    *   Revisar hovers, focus, transitions em header, rail, cards e botões.

### 10.2. Critérios de aceite da UI da tela inicial

A tela inicial é considerada “aceita” quando:

*   **Header, side nav e footer:**
    *   Estão presentes em todas as rotas principais (`/`, `/trilhas/:id`, `/licoes/:id`).
    *   Mantêm identidade visual consistente com o design system.
*   **O dashboard:**
    *   Continua legível e confortável em desktop e mobile.
    *   Cards de trilha e filtros funcionam responsivamente.
*   **Navegação:**
    *   É possível entender a estrutura do produto em menos de 10 segundos:
        *   Header mostra onde estou.
        *   Rail mostra onde posso ir.
        *   Conteúdo central mostra o que posso fazer agora.
*   **Acessibilidade mínima:**
    *   Navegação por teclado funciona.
    *   Focus states são visíveis.
    *   Contraste está adequado nos três temas.
