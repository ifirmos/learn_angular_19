# Plataforma Educacional Angular 19 – Fase 1 (Especificação)

## Visão geral
Plataforma web educacional, tema escuro minimalista, construída com Angular 19 standalone e PrimeNG 19. Todo conteúdo em português, com foco em exemplos interativos curtos e visuais. Estrutura baseada em trilhas e lições, cada lição composta por explicação, trecho de código exibido e demonstração reativa.

## Arquitetura de componentes
- **AppShellComponent (standalone)**: layout base, header com navegação principal, área de conteúdo com `<router-outlet>`, barra lateral opcional para progresso geral. Responsável por aplicar tema e tokens de design (cores, tipografia, espaçamento).
- **DashboardTrilhasComponent**: landing com cards de trilhas, animação de entrada, visão de progresso agregado. Permite navegar para detalhes da trilha.
- **ListaTrilhasComponent**: lista filtrável/paginável de trilhas com badges de nível. Reutilizável em dashboard e página dedicada.
- **DetalheTrilhaComponent**: apresenta resumo da trilha, progresso calculado e lista de lições com status (concluída/em andamento). Ações para iniciar/continuar lição.
- **LicaoDetalheComponent**: página de lição contendo três regiões claras: 
  - **PainelExplicacaoLicao** (texto curto, bullets do conceito e tempo estimado);
  - **PainelCodigoLicao** (tabs TS/HTML com destaque via PrimeNG CodeHighlighter ou simples formatação, sem execução inline);
  - **PainelDemoLicao** (demonstração interativa específica da lição, sempre reativa e visual).
- **Componentes de demo por lição**: um componente por lição para manter clareza, ex.: `DemoBindingsBasicosComponent`, `DemoSignalsReatividadeComponent`, `DemoFormulariosReativosComponent`. Cada um expõe signals/computed e interações locais. Quando um template crescer, quebrar em subcomponentes como `PainelControlesDemo`, `PainelResultadoDemo`.
- **Componentes utilitários**: 
  - `CardTrilhaComponent` para exibir resumo de trilha com progresso.
  - `BadgeNivelComponent` para níveis (iniciante/intermediário) com cores consistentes.
  - `ResumoProgressoComponent` para barra/anel de progresso global usando PrimeNG.

## Serviços e estado
- **TrilhasService**: fornece dados estáticos/dummy das trilhas e lições (pode ser objeto in-memory). Usa `signal` para armazenar lista de trilhas e computed para progresso global. Métodos para marcar lições concluídas e recuperar lições por id.
- **TemaService (opcional)**: guarda tokens de tema (cores, fontes, espaçamentos) e oferece API para usar em styles inline/SCSS globais.
- **Router providers**: usar `provideRouter` e `provideAnimations` no `app.config.ts`; sem NgModule.

## Modelos/Interfaces
- **Trilha**
  - `id: string` – chave para rotas.
  - `titulo: string`, `descricao: string` – contexto claro.
  - `nivel: 'iniciante' | 'intermediario'` – usado em badges e filtros.
  - `licoes: Licao[]` – composição da trilha.
  - `progresso: number` (computed pelo serviço) – percentual baseado em lições concluídas.
- **Licao**
  - `id: string`, `titulo: string`, `descricaoCurta: string`.
  - `nivel: 'iniciante' | 'intermediario'`.
  - `categoria: string` (ex.: "Bindings", "Signals", "Formulários").
  - `tempoEstimadoMinutos: number`.
  - `concluida: Signal<boolean>` – estado reativo controlado pelo serviço/rotas.
  - `componenteDemo: Type<unknown>` – referência ao componente standalone da demonstração.
- **ConfiguracaoDemo (opcional para metadados exibidos)**
  - `objetivo: string`, `acoesPrincipais: string[]`, `entradaEsperada: string`, `resultadoEsperado: string` – usado para renderizar resumo antes da interação.

## Estrutura dos exemplos interativos
- **Um componente por lição** para garantir didática e isolamento de estado. Cada demo utiliza signals/computed para expor estado (ex.: `valorDigitado = signal('')`, `mensagemDerivada = computed(...)`).
- **Padrão de template** em cada `PainelDemoLicao`:
  1. Controles de entrada (PrimeNG InputText, Slider, ToggleButton) com two-way binding.
  2. Área de visualização que reage (cards, listas filtradas, badges, gráficos simples).
  3. Pequeno painel de dicas sobre o que observar (ex.: "Altere o texto e veja a badge atualizar").
- **Reuso**: `PainelDemoLicao` recebe o componente demo via `ngComponentOutlet` ou renderiza diretamente se for parte do template. Para novos exemplos, basta criar componente standalone, registrá-lo na lição e o restante da página se adapta.

## Mapa de rotas
- `/` – **Dashboard**: visão geral das trilhas, progresso global, call-to-action para iniciar primeira trilha. Cards animados.
- `/trilhas` – **Lista de trilhas**: visão completa com filtros por nível/categoria, reutiliza `ListaTrilhasComponent`.
- `/trilhas/:id` – **Detalhe da trilha**: mostra metadados, progresso e lista de lições. Ações para abrir lição específica.
- `/licoes/:id` – **Página da lição**: layout de três colunas/linhas (explicação, código, demo interativa). Botão para marcar como concluída atualiza signals e progresso da trilha.

Navegação: header com menu e breadcrumbs simples; cards e botões levam à próxima etapa. Progresso global sempre visível no header ou sidebar.

## Design system e tema
- **Paleta**: fundo primário #0F172A; superfícies #111827 e #1F2937; texto principal #E5E7EB; texto secundário #9CA3AF; destaque #22D3EE; sucesso #34D399; erro #F87171; bordas #1F2937.
- **Tipografia**: títulos 24/20px, subtítulos 18px, texto 16px, legenda 13px. Peso médio/semibold em títulos.
- **Espaçamentos**: pequeno 8px, médio 16px, grande 24px; uso consistente em cards e grids.
- **Feedback visual**: hover e foco com elevação/iluminação leve; transições de 150–200ms em cards e botões; animação de entrada (fade/slide) para listas e cards.
- **Responsividade**: grid fluido com colunas colapsando em pilha para telas menores; prioridade para desktop, mantendo legibilidade em mobile.

## Estratégia de interatividade e reuso
- **Signals/computed**: progresso global, estado de conclusão de lições e estados locais das demos. Computeds derivam totais, mensagens e filtros para minimizar lógica em template.
- **Componentes pequenos**: cada lição tem seu próprio componente demo; código e explicação são renderizados em subcomponentes (`PainelExplicacaoLicao`, `PainelCodigoLicao`, `PainelDemoLicao`). Evita templates extensos.
- **Adicionar novas lições**: criar componente demo standalone, registrar no `TrilhasService` com metadados; rotas e UI reutilizam os mesmos layouts. Não requer mudanças estruturais.
- **Formulários reativos**: demos de formulário usam `FormGroup` com validações ao vivo, mensagens de erro e resumo reativo em cards/badges.
- **Diretivas estruturais modernas**: usar `@for` e `@if` nas listas de lições e nas demos para exibir/ocultar seções conforme estado do usuário.

## Trilha inicial sugerida
- **Fundamentos TypeScript para Angular**: tipos básicos, interfaces, classes simples, generics leves aplicados a serviços.
- **Fundamentos Angular**: componentes standalone, ciclo de template, DI básica, roteamento com `provideRouter`.
- **Bindings essenciais**: interpolação, property/event binding, two-way com `[(ngModel)]`, uso de PrimeNG inputs.
- **Signals e computeds**: contador reativo, lista filtrada, badge de status derivado.
- **Formulários reativos**: formulário simples de cadastro de curso com validações, mensagens e resumo de dados em tempo real.

## Checklist das próximas fases
1. **Fase 2**: criar `main.ts` e `app.config.ts` com `bootstrapApplication`, `provideRouter`, `provideAnimations`, tema global e layout base (`AppShellComponent`).
2. **Fase 3**: implementar rotas principais, header/nav e dashboard com cards de trilhas reutilizando `ListaTrilhasComponent`.
3. **Fase 4**: estruturar trilha "Fundamentos TypeScript" com 3–5 lições interativas e respectivos componentes demo.
4. **Fase 5**: adicionar trilhas de Bindings, Signals e Formulários reativos com demos completas.
5. **Fase 6**: polir design system (tokens de cor/tipografia), animações, acessibilidade básica (foco e aria), e ajustes responsivos.

