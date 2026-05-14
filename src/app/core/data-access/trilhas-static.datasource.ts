import { Injectable, Type } from '@angular/core';

import { TrilhasDataSource } from './trilhas.datasource';
import { Trilha } from '../../shared/models/trilha.model';
import { Licao } from '../../shared/models/licao.model';

// Demos de conceito único (minimalistas)
import { DemoTiposPrimitivosComponent } from '../../features/licoes/demos/demo-tipos-primitivos/demo-tipos-primitivos.component';
import { DemoInterpolacaoComponent } from '../../features/licoes/demos/demo-interpolacao/demo-interpolacao.component';
import { DemoPropertyBindingComponent } from '../../features/licoes/demos/demo-property-binding/demo-property-binding.component';
import { DemoEventBindingComponent } from '../../features/licoes/demos/demo-event-binding/demo-event-binding.component';

// Demos de síntese (mais complexas, combinam conceitos)
import { DemoTypescriptTiposComponent } from '../../features/licoes/demos/demo-typescript-tipos/demo-typescript-tipos.component';
import { DemoBindingsEditorPreviewComponent } from '../../features/licoes/demos/demo-bindings-editor-preview/demo-bindings-editor-preview.component';

// Demos — Métodos de Array
import { DemoMapComponent } from '../../features/licoes/demos/demo-map/demo-map.component';
import { DemoArrayFilterComponent } from '../../features/licoes/demos/demo-array-filter/demo-array-filter.component';
import { DemoArrayReduceComponent } from '../../features/licoes/demos/demo-array-reduce/demo-array-reduce.component';

// Demos — Union Types
import { DemoTsTiposUnionComponent } from '../../features/licoes/demos/demo-ts-tipos-union/demo-ts-tipos-union.component';

// Demos — Reatividade com Signals
import { DemoSignalsBasicosComponent } from '../../features/licoes/demos/demo-signals-basicos/demo-signals-basicos.component';
import { DemoSignalsComputedComponent } from '../../features/licoes/demos/demo-signals-computed/demo-signals-computed.component';
import { DemoSignalsEffectComponent } from '../../features/licoes/demos/demo-signals-effect/demo-signals-effect.component';

// Demos — Template e Controle de Fluxo
import { DemoTemplateControleFluxoComponent } from '../../features/licoes/demos/demo-template-controle-fluxo/demo-template-controle-fluxo.component';
import { DemoTwoWayBindingComponent } from '../../features/licoes/demos/demo-two-way-binding/demo-two-way-binding.component';

// Demos — Componentes e Pipes
import { DemoComponentesComunicacaoComponent } from '../../features/licoes/demos/demo-componentes-comunicacao/demo-componentes-comunicacao.component';
import { DemoPipesBuiltinComponent } from '../../features/licoes/demos/demo-pipes-builtin/demo-pipes-builtin.component';

// ============================================================================
// LIÇÕES - Organizadas por trilha e ordem progressiva
// ============================================================================

const LICOES_MOCK: Licao[] = [
  // -------------------------------------------------------------------------
  // TRILHA: Primitivos e Interfaces (Camada 1 - Fundamentos TypeScript)
  // -------------------------------------------------------------------------
  {
    id: 'ts-tipos-primitivos',
    trilhaId: 'primitivos-interfaces',
    titulo: 'Tipos Primitivos',
    descricaoCurta: 'Domine string, number e boolean — os três primitivos fundamentais do TypeScript.',
    nivel: 'iniciante',
    categoria: 'TypeScript',
    tempoEstimadoMinutos: 12,
    concluida: false,
    ordem: 1,
    tipoLicao: 'conceito',
    habilidadesChave: ['string', 'number', 'boolean', 'inferência de tipos'],
    layout: 'demo-largura-total',
    componenteDemo: DemoTiposPrimitivosComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'TypeScript estende o JavaScript adicionando um sistema de tipos estático. Ao declarar tipos para variáveis, funções e objetos, o compilador detecta inconsistências antes da execução — em vez de erros silenciosos em runtime, você recebe feedback imediato no editor. Os três primitivos fundamentais, string, number e boolean, são os blocos de construção de qualquer aplicação TypeScript.',
      subtopicos: [
        {
          titulo: 'string — texto e seus métodos',
          conteudo: 'Uma string representa qualquer sequência de caracteres: palavras, frases, JSON, HTML. O TypeScript expõe todos os métodos nativos com autocompletar e verificação estática. Você pode declarar strings com aspas simples, duplas ou backticks (template literals, que permitem interpolação com ${}).',
          codigoExemplo: `let nome: string = "Angular";
let versao = \`v\${19}\`;       // template literal

nome.length;           // 7
nome.toUpperCase();    // "ANGULAR"
nome.includes("gul");  // true`
        },
        {
          titulo: 'number — inteiros e decimais unificados',
          conteudo: 'Ao contrário de Java ou C#, TypeScript não diferencia int de float: tudo é number. Isso simplifica a tipagem, mas exige atenção com precisão em operações de ponto flutuante. Métodos como .toFixed() e funções do Math já fazem parte do tipo.',
          codigoExemplo: `let inteiro: number = 42;
let decimal: number = 3.14;

// ⚠️ Precisão de ponto flutuante:
0.1 + 0.2; // 0.30000000000000004

Math.round(decimal); // 3
decimal.toFixed(2);  // "3.14"`
        },
        {
          titulo: 'boolean — lógica binária e fluxo de controle',
          conteudo: 'Um boolean só pode ser true ou false. É o tipo retornado por qualquer expressão de comparação e é central para condicionais @if, operadores ternários e flags de estado em componentes Angular. Atenção: 0, "", null e undefined são falsy no JavaScript, mas têm tipos distintos no TypeScript.',
          codigoExemplo: `let ativo: boolean = true;
let maiorDeIdade = idade >= 18; // boolean

// Em template Angular:
// @if (ativo) { <p>Ligado</p> }

ativo ? "Ligado" : "Desligado";`
        },
        {
          titulo: 'Inferência de tipo — escreva menos, sem abrir mão da segurança',
          conteudo: 'O TypeScript deduz o tipo a partir do valor inicial — você não precisa escrever a anotação toda vez. O tipo ainda é fixo: tentar reatribuir um valor incompatível gera um erro de compilação que o editor exibe antes de qualquer execução.',
          codigoExemplo: `let nome    = "Angular"; // TypeScript infere: string
let versao  = 19;       // TypeScript infere: number
let visivel = true;     // TypeScript infere: boolean

// ❌ Erro detectado em tempo de compilação:
// nome = 42;
// → Type 'number' is not assignable to type 'string'`
        }
      ],
      analogia: {
        titulo: 'Tipos são contratos firmados antes da execução',
        descricao: 'Imagine um formulário físico com campos rotulados: "Nome" aceita apenas texto, "Preço" aceita apenas números, "Disponível" aceita apenas Sim/Não. Se alguém tentar escrever "quarenta reais" no campo Preço, o erro é detectado na hora — não quando o sistema for processar o formulário. TypeScript funciona exatamente assim: os tipos são contratos verificados pelo compilador antes de qualquer linha ser executada, transformando bugs em tempo de execução em erros em tempo de desenvolvimento.'
      }
    },
    configuracaoDemo: {
      objetivo: 'Observar os três primitivos e a inferência em ação, com o código TypeScript correspondente visível e sincronizado em tempo real.',
      acoesPrincipais: [
        'Bloco 1: edite o texto e veja .length e .toUpperCase() atualizando no código e no resultado.',
        'Bloco 2: ajuste o número (tente decimais) e veja Math.round() e .toFixed(2) refletindo a mudança.',
        'Bloco 3: ative/desative o toggle e observe como o @if condicional muda no painel HTML.',
        'Bloco 4: altere o texto e perceba que o tipo inferido ("string") permanece fixo independente do valor.'
      ],
      entradaEsperada: 'Valores de diferentes tipos digitados nos campos.',
      resultadoEsperado: 'Código TypeScript e HTML sincronizados com os valores interativos, mostrando anotações de tipo, métodos e inferência em ação.',
      dicasObservacao: [
        'Nos blocos 1–3, o tipo é declarado explicitamente (: string, : number, : boolean).',
        'No bloco 4, os tipos são omitidos mas ainda são inferidos e fixos pelo compilador.',
        'O erro de compilação comentado no bloco 4 seria detectado pelo editor antes de rodar — experimente abrir o arquivo e descomentar a linha.'
      ]
    }
  },
  {
    id: 'ts-tipos-interfaces',
    trilhaId: 'primitivos-interfaces',
    titulo: 'Tipos e Interfaces na Prática',
    descricaoCurta: 'Combine tipos primitivos den objetos estruturados usando interfaces.',
    nivel: 'intermediario',
    categoria: 'TypeScript',
    tempoEstimadoMinutos: 15,
    concluida: false,
    ordem: 2,
    tipoLicao: 'sintese',
    habilidadesChave: ['interface', 'objeto tipado', 'autocompletar'],
    componenteDemo: DemoTypescriptTiposComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'Agora que você conhece os tipos primitivos, é hora de combiná-los em estruturas mais complexas. Interfaces permitem definir o "formato" de um objeto, garantindo que ele tenha exatamente as propriedades e os tipos que você espera.',
      subtopicos: [
        {
          titulo: 'O Poder das Interfaces',
          conteudo: 'Uma interface funciona como um contrato. Ela diz: "Para ser um Produto, você PRECISA ter um nome (string), um preço (number) e saber se está emEstoque (boolean)". Se você esquecer um campo ou errar o tipo, o TypeScript avisa na hora (antes mesmo de rodar o código!). Além disso, editores como o VS Code usam interfaces para oferecer autocompletar inteligente.',
          codigoExemplo: `interface Produto {
  nome: string;
  preco: number;
  emEstoque: boolean;
}`
        },
        {
          titulo: 'Aplicando a Interface',
          conteudo: 'Ao criar um objeto, você diz que ele segue a interface Produto. Se tentar adicionar um campo estranho ou errar um tipo, o compilador trava. Isso traz muita segurança para sua aplicação.',
          codigoExemplo: `const curso: Produto = {
  nome: "Angular 21", // ✅ string
  preco: 197.00,      // ✅ number
  emEstoque: true     // ✅ boolean
};`
        },
        {
          titulo: '💡 Nota sobre o Código Demo',
          conteudo: 'No exemplo abaixo, você verá o uso de signal() e computed(). Não se preocupe em entender tudo sobre eles agora! Eles são recursos modernos do Angular para reatividade que veremos em detalhes nas próximas trilhas. Por enquanto, foque em como a INTERFACE define e valida a estrutura dos dados que estamos manipulando.',
          codigoExemplo: `// Usamos a interface para "tipar" o signal
produto = signal<Produto>({ ... });`
        }
      ],
      analogia: {
        titulo: 'Interfaces são moldes',
        descricao: 'Pense em uma fábrica de biscoitos. A interface é o molde (cortador). Ela define que todo biscoito deve ter formato de estrela e tamanho X. A massa (dados) pode ser de chocolate ou baunilha, mas se não couber no molde, não é um biscoito válido. O TypeScript usa esse molde para garantir que seus dados sempre tenham o formato correto.'
      }
    },
    configuracaoDemo: {
      objetivo: 'Entender na prática como uma interface define a estrutura de um objeto e como o TypeScript garante essa integridade, mesmo dentro de conceitos modernos como Signals.',
      acoesPrincipais: [
        'Explore o objeto "Produto" e veja seus campos tipados.',
        'Altere os valores e veja como a estrutura se mantém.',
        'Note que "Preço formatado" é calculado automaticamente (computed), mas sua base vem dos dados tipados pela interface.',
        'Perceba que não é possível inserir texto no campo de preço (graças ao tipo number).'
      ],
      entradaEsperada: 'Interação com os campos do formulário.',
      resultadoEsperado: 'O objeto mantém sua estrutura conforme definido pela Interface.',
      dicasObservacao: [
        'A interface Produto é a única fonte de verdade para a estrutura dos dados.',
        'O autocompletar (IntelliSense) só funciona porque definimos a interface antes.',
        '(Spoiler) O computed() usa os tipos da interface para saber que "preco" é um número.'
      ]
    },
    layout: 'demo-largura-total'
  },

  // -------------------------------------------------------------------------
  // TRILHA: Métodos de Array (Camada 1b - TypeScript funcional)
  // -------------------------------------------------------------------------
  {
    id: 'array-map',
    trilhaId: 'arrays-funcionais',
    titulo: 'Array.map()',
    descricaoCurta: 'Transforme arrays sem mutá-los — aprenda o método mais importante da programação funcional.',
    nivel: 'iniciante',
    categoria: 'TypeScript',
    tempoEstimadoMinutos: 10,
    concluida: false,
    ordem: 1,
    tipoLicao: 'conceito',
    habilidadesChave: ['map()', 'arrow function', 'imutabilidade', 'array de objetos'],
    layout: 'demo-largura-total',
    componenteDemo: DemoMapComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'O método map() é a pedra angular da programação funcional com arrays. Ele percorre cada elemento, aplica uma função de transformação e retorna um novo array — sem tocar no original. Entender map() muda a forma como você pensa sobre transformação de dados: em vez de laços imperativos com mutação, você declara o que quer obter.',
      subtopicos: [
        {
          titulo: 'Sintaxe e assinatura',
          conteudo: 'map() recebe uma função de callback que é chamada para cada elemento do array. O retorno do callback vira o elemento correspondente no novo array. O array resultante sempre tem o mesmo comprimento do original.',
          codigoExemplo: `// Assinatura
array.map(callback);
array.map((item, index, arrayOriginal) => novoItem);

// Exemplos
const nums = [1, 2, 3, 4, 5];
const dobrado = nums.map(n => n * 2);   // [2, 4, 6, 8, 10]
const texto   = nums.map(n => String(n)); // ['1','2','3','4','5']`
        },
        {
          titulo: 'Transformando arrays de objetos',
          conteudo: 'O caso de uso mais frequente no dia a dia: transformar cada objeto de um array — extraindo campos, aplicando cálculos, adicionando propriedades derivadas. O spread (...item) garante a imutabilidade dos objetos originais.',
          codigoExemplo: `interface Produto { nome: string; preco: number; }

const produtos: Produto[] = [
  { nome: 'Angular', preco: 120 },
  { nome: 'TypeScript', preco: 90 },
];

// Extrair campo
const nomes = produtos.map(p => p.nome);
// ['Angular', 'TypeScript']

// Transformar com spread (não muta o original)
const comDesconto = produtos.map(p => ({
  ...p,
  preco: +(p.preco * 0.8).toFixed(2)
}));`
        },
        {
          titulo: 'map() com Signals e computed()',
          conteudo: 'Em Angular 21, map() em um computed() cria uma derivação reativa: sempre que o signal de entrada mudar, o array transformado é recalculado automaticamente. Isso elimina a necessidade de subscrições manuais.',
          codigoExemplo: `import { signal, computed } from '@angular/core';

const desconto = signal(20); // %
const produtos = signal<Produto[]>([ ... ]);

// Derivação reativa — recalcula quando desconto() mudar
const comDesconto = computed(() => {
  const mult = 1 - desconto() / 100;
  return produtos().map(p => ({
    ...p,
    preco: +(p.preco * mult).toFixed(2)
  }));
});`
        },
        {
          titulo: 'Imutabilidade — por que importa',
          conteudo: 'map() nunca altera o array original — sempre cria e retorna um novo. Isso é fundamental em Angular com OnPush e Signals: o framework compara referências para detectar mudanças. Se você mutar o array original, o Angular não detecta a alteração. Se usar map(), a nova referência dispara a atualização.',
          codigoExemplo: `const original = [1, 2, 3];
const dobrado  = original.map(n => n * 2);

console.log(original); // [1, 2, 3] ← intacto
console.log(dobrado);  // [2, 4, 6] ← novo array
console.log(original === dobrado); // false

// ❌ Nunca faça isso em componentes Angular:
original[0] = 99; // mutação — Angular OnPush não detecta

// ✅ Prefira:
const novo = original.map((n, i) => i === 0 ? 99 : n);`
        }
      ],
      analogia: {
        titulo: 'Uma linha de produção que não altera a matéria-prima',
        descricao: 'Imagine uma linha de montagem onde cada peça original passa por uma estação de transformação. A estação aplica um processo e coloca o resultado em uma nova caixa — a peça original permanece na caixa de entrada, intacta. No final, você tem duas caixas: a original inalterada e a nova com os itens transformados. map() funciona exatamente assim: cada elemento passa pela sua "função de transformação", e os resultados formam um novo array. A matéria-prima (array original) nunca é tocada.'
      }
    },
    configuracaoDemo: {
      objetivo: 'Observar map() transformando arrays de números, strings e objetos em tempo real, e entender a imutabilidade na prática.',
      acoesPrincipais: [
        '① Números: ajuste o fator e veja [10,20,30,40,50].map(n => n × fator) atualizar instantaneamente.',
        '② Strings: troque entre .toUpperCase(), .toLowerCase() e .length para ver a transformação aplicada a cada item.',
        '③ Objetos: mova o slider de desconto e observe os preços sendo recalculados com spread (...p).',
        '④ Imutabilidade: o bloco "original" nunca muda — map() sempre retorna um novo array.'
      ],
      entradaEsperada: 'Fator numérico, seleção de transformação e slider de desconto.',
      resultadoEsperado: 'Arrays transformados em tempo real, com o original sempre preservado.',
      dicasObservacao: [
        'map() sempre retorna um array do mesmo tamanho do original — se entram 5 itens, saem 5.',
        'Use computed(() => signal().map(...)) para derivações reativas que atualizam automaticamente.',
        'O spread {...p, campo: novoValor} garante imutabilidade ao transformar objetos.'
      ]
    }
  },

  // -------------------------------------------------------------------------
  // TRILHA: Bindings e Diretivas (Camada 2 - Templates Angular)
  // -------------------------------------------------------------------------
  {
    id: 'bindings-interpolacao',
    trilhaId: 'bindings-diretivas',
    titulo: 'Interpolação',
    descricaoCurta: 'Exiba valores dinâmicos no template com a sintaxe {{ }}.',
    nivel: 'iniciante',
    categoria: 'Bindings',
    tempoEstimadoMinutos: 10,
    concluida: false,
    ordem: 1,
    tipoLicao: 'conceito',
    habilidadesChave: ['interpolação', '{{ }}', 'signal', 'computed'],
    componenteDemo: DemoInterpolacaoComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'Interpolação é o mecanismo mais direto para conectar dados do componente ao HTML. Com a sintaxe {{ }}, você abre uma "janela" para qualquer expressão JavaScript — e o Angular atualiza o resultado automaticamente a cada mudança, sem que você precise tocar no DOM.',
      subtopicos: [
        {
          titulo: 'Sintaxe básica',
          conteudo: 'Qualquer expressão JavaScript válida pode ser inserida entre as chaves duplas. O Angular avalia a expressão e insere o resultado como texto no HTML, atualizando sempre que o valor mudar.',
          codigoExemplo: `<h1>{{ titulo }}</h1>
<p>Versão: {{ versao }}</p>
<span>{{ 2 + 2 }}</span>  <!-- resultado: 4 -->`
        },
        {
          titulo: 'Com Signals (Angular 21)',
          conteudo: 'Signals são a forma reativa recomendada no Angular 21. Ao usar um signal no template, chame-o como função — isso registra a dependência e garante que o DOM atualize automaticamente quando o valor mudar.',
          codigoExemplo: `// No componente
titulo   = signal('Meu App');
contador = signal(0);
dobro    = computed(() => this.contador() * 2);

// No template
<h1>{{ titulo() }}</h1>
<p>{{ contador() }} → dobro: {{ dobro() }}</p>`
        },
        {
          titulo: 'Expressões válidas',
          conteudo: 'Dentro de {{ }} você pode usar operadores aritméticos, métodos de string/array, expressões ternárias e acessar propriedades. O único limite: sem efeitos colaterais e sem lógica complexa.',
          codigoExemplo: `{{ nome().toUpperCase() }}         // método de string
{{ preco() * 1.1 | currency }}    // expressão + pipe
{{ ativo() ? 'Sim' : 'Não' }}     // ternário
{{ lista().length }} itens         // propriedade`
        },
        {
          titulo: 'O que evitar',
          conteudo: 'Interpolações são reavaliadas a cada ciclo de detecção. Evite lógica pesada ou com efeitos colaterais diretamente em {{ }}. Prefira mover essa lógica para um computed() no componente — isso mantém o template limpo e o código testável.',
          codigoExemplo: `// ❌ Evite: lógica complexa no template
{{ items().filter(i => i.ok).sort(...).map(...) }}

// ✅ Prefira: lógica encapsulada no componente
itensAtivos = computed(() =>
  this.items().filter(i => i.ok).sort(...)
);
// template simples e legível:
{{ itensAtivos() }}`
        }
      ],
      analogia: {
        titulo: 'Interpolação é como um display digital',
        descricao: 'Imagine um placar esportivo digital. O placar (HTML) sempre exibe o valor atual da memória do sistema (componente). Quando o dado muda, o display atualiza automaticamente — você não precisa "repintar" o placar manualmente. A interpolação {{ }} é exatamente esse mecanismo: o Angular mantém o display sincronizado com o estado do componente, sem nenhum esforço adicional da sua parte.'
      }
    },
    configuracaoDemo: {
      objetivo: 'Explorar os 4 padrões fundamentais de interpolação: variável, expressão, método e ternário — tudo em tempo real.',
      acoesPrincipais: [
        '① Variável: digite um nome e veja {{ nome() }} atualizar instantaneamente.',
        '② Expressão: altere os números A e B para ver {{ a() + b() }} calcular em tempo real.',
        '③ Método: edite o texto e observe {{ texto().toUpperCase() }} e {{ texto().length }} reagindo.',
        '④ Ternário: ative/desative o toggle e veja {{ ativo() ? "Ativo ✓" : "Inativo ✗" }} alternar.'
      ],
      entradaEsperada: 'Texto, números e cliques no toggle.',
      resultadoEsperado: 'Cada cartão atualiza seu resultado em tempo real, demonstrando os 4 padrões de interpolação.',
      dicasObservacao: [
        'A atualização é instantânea — signals notificam o Angular de cada mudança sem polling.',
        'O painel "Código" mostra TypeScript e HTML correspondentes, sincronizados com sua interação.',
        'Expressões dentro de {{ }} são JavaScript puro — mas mantenha-as simples e sem efeitos colaterais!'
      ]
    },
    layout: 'demo-largura-total'
  },
  {
    id: 'bindings-property',
    trilhaId: 'bindings-diretivas',
    titulo: 'Property Binding',
    descricaoCurta: 'Vincule propriedades HTML a valores do componente com [prop].',
    nivel: 'iniciante',
    categoria: 'Bindings',
    tempoEstimadoMinutos: 10,
    concluida: false,
    ordem: 2,
    tipoLicao: 'conceito',
    habilidadesChave: ['property binding', '[prop]'],
    componenteDemo: DemoPropertyBindingComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'Property binding permite controlar propriedades de elementos HTML dinamicamente. Use colchetes [prop] para vincular uma propriedade a um valor do seu componente.',
      subtopicos: [
        {
          titulo: 'Sintaxe com colchetes',
          conteudo: 'Os colchetes indicam ao Angular que o valor é uma expressão, não uma string literal.',
          codigoExemplo: `<!-- Property binding -->
<img [src]="imagemUrl" />
<button [disabled]="carregando">

<!-- Isso é diferente de: -->
<img src="imagemUrl" /> <!-- literal "imagemUrl" -->`
        },
        {
          titulo: 'Binding de estilos',
          conteudo: 'Você pode vincular estilos inline diretamente a valores do componente.',
          codigoExemplo: `<div [style.background]="corFundo">
<p [style.fontSize.px]="tamanho">`
        },
        {
          titulo: 'Binding de classes',
          conteudo: 'Use [class.nome-classe] para adicionar/remover classes condicionalmente.',
          codigoExemplo: `<div [class.ativo]="isAtivo">
<button [class.destaque]="importante">`
        }
      ],
      analogia: {
        titulo: 'Property binding é como um controle remoto',
        descricao: 'Pense no property binding como um controle remoto da TV. O controle (componente) envia comandos (valores) para a TV (elemento HTML). Quando você aperta "aumentar volume", a TV obedece. Da mesma forma, quando seu componente muda um valor, o elemento HTML reage automaticamente.'
      }
    },
    configuracaoDemo: {
      objetivo: 'Experimentar property binding com estilos visuais.',
      acoesPrincipais: [
        'Selecione uma cor e veja o fundo mudar.',
        'Ajuste o slider para mudar o tamanho do texto.'
      ],
      entradaEsperada: 'Seleção de cor e ajuste de slider.',
      resultadoEsperado: 'O preview reflete as mudanças de estilo instantaneamente.',
      dicasObservacao: ['Note como os colchetes vinculam propriedades CSS a valores.']
    },
    layout: 'demo-largura-total'
  },
  {
    id: 'bindings-event',
    trilhaId: 'bindings-diretivas',
    titulo: 'Event Binding',
    descricaoCurta: 'Capture ações do usuário com a sintaxe (evento).',
    nivel: 'iniciante',
    categoria: 'Bindings',
    tempoEstimadoMinutos: 10,
    concluida: false,
    ordem: 3,
    tipoLicao: 'conceito',
    habilidadesChave: ['event binding', '(click)', '(input)'],
    componenteDemo: DemoEventBindingComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'Event binding permite que seu componente reaja a ações do usuário como cliques, digitação e outros eventos do DOM. Use parênteses (evento) para capturar eventos.',
      subtopicos: [
        {
          titulo: 'Sintaxe com parênteses',
          conteudo: 'Os parênteses indicam que você está ouvindo um evento e chamando um método quando ele ocorre.',
          codigoExemplo: `<button (click)="salvar()">Salvar</button>
<input (input)="atualizar($event)" />
<form (submit)="enviar()">`
        },
        {
          titulo: 'O objeto $event',
          conteudo: 'Use $event para acessar informações sobre o evento, como o valor digitado ou a posição do mouse.',
          codigoExemplo: `<input (input)="nome = $event.target.value" />
<div (mousemove)="rastrear($event)">`
        },
        {
          titulo: 'Eventos comuns',
          conteudo: 'Os eventos mais usados são click, input, submit, keyup, focus e blur.',
          codigoExemplo: `(click)="onClick()"
(input)="onInput($event)"
(keyup.enter)="onEnter()"
(focus)="onFocus()"
(blur)="onBlur()"`
        }
      ],
      analogia: {
        titulo: 'Event binding é como um interfone',
        descricao: 'Imagine um prédio com interfone. Quando alguém toca o interfone (evento), você atende e decide o que fazer (método). O event binding funciona igual: o usuário faz uma ação (clica, digita), o Angular "toca o interfone" do seu componente, e seu método decide como reagir.'
      }
    },
    configuracaoDemo: {
      objetivo: 'Praticar event binding com um contador interativo.',
      acoesPrincipais: [
        'Clique nos botões para incrementar/decrementar.',
        'Use o botão reset para zerar.',
        'Observe o histórico de ações.'
      ],
      entradaEsperada: 'Cliques nos botões.',
      resultadoEsperado: 'O contador atualiza e o histórico registra cada ação.',
      dicasObservacao: ['Veja como (click) chama métodos diferentes.']
    },
    layout: 'demo-largura-total'
  },
  {
    id: 'bindings-sintese',
    trilhaId: 'bindings-diretivas',
    titulo: 'Editor & Preview',
    descricaoCurta: 'Combine interpolação, property binding e event binding em um editor completo.',
    nivel: 'intermediario',
    categoria: 'Bindings',
    tempoEstimadoMinutos: 20,
    concluida: false,
    ordem: 4,
    tipoLicao: 'sintese',
    habilidadesChave: ['interpolação', 'property binding', 'event binding', 'signals'],
    componenteDemo: DemoBindingsEditorPreviewComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'Chegou a hora de juntar tudo! Nesta lição de síntese, você vai ver como interpolação, property binding e event binding trabalham juntos para criar uma interface interativa completa.',
      subtopicos: [
        {
          titulo: 'Revisão: Os três tipos de binding',
          conteudo: 'Interpolação exibe dados ({{ }}), property binding controla propriedades ([prop]), e event binding captura ações ((evento)). Juntos, eles formam a comunicação completa entre componente e template.',
          codigoExemplo: `<!-- Interpolação: exibe -->
<h1>{{ titulo() }}</h1>

<!-- Property: controla -->
<div [class.ativo]="status()">

<!-- Event: captura -->
<button (click)="alternar()">`
        },
        {
          titulo: 'Two-way binding com ngModel',
          conteudo: 'Para formulários, o Angular oferece ngModel que combina property e event binding em uma sintaxe mais simples.',
          codigoExemplo: `<!-- Two-way binding -->
<input [(ngModel)]="nome" />

<!-- Equivalente a: -->
<input [ngModel]="nome" (ngModelChange)="nome = $event" />`
        },
        {
          titulo: 'Padrão Editor-Preview',
          conteudo: 'Um padrão comum em UIs modernas: um painel de edição e um painel de preview que reflete as mudanças em tempo real.',
          codigoExemplo: `<!-- Editor -->
<input [ngModel]="titulo()" (ngModelChange)="titulo.set($event)" />

<!-- Preview -->
<div class="card">
  <h2>{{ titulo() }}</h2>
</div>`
        }
      ],
      analogia: {
        titulo: 'Como um sistema de som completo',
        descricao: 'Pense em um sistema de som: o microfone capta sua voz (event binding), o amplificador processa e controla o volume (property binding), e as caixas de som reproduzem o resultado (interpolação). Sozinhos, cada componente faz pouco. Juntos, criam uma experiência completa. Os bindings do Angular funcionam assim - cada um tem seu papel, mas o poder está na combinação.'
      }
    },
    configuracaoDemo: {
      objetivo: 'Ver todos os tipos de binding trabalhando juntos em um editor real.',
      acoesPrincipais: [
        'Edite o título e veja a atualização em tempo real.',
        'Mude o nível para ver a cor do badge mudar.',
        'Use o toggle de status para alterar a aparência do card.'
      ],
      entradaEsperada: 'Interação com os controles do formulário.',
      resultadoEsperado: 'O card de preview reflete todas as mudanças instantaneamente.',
      dicasObservacao: [
        'Observe como diferentes tipos de binding trabalham juntos.',
        'Veja como [class.pausado] aplica estilos condicionalmente.'
      ]
    },
    layout: 'demo-largura-total'
  },

  // -------------------------------------------------------------------------
  // TRILHA: Primitivos e Interfaces — lição 3
  // -------------------------------------------------------------------------
  {
    id: 'ts-tipos-union',
    trilhaId: 'primitivos-interfaces',
    titulo: 'União de Tipos',
    descricaoCurta: 'Use union types para modelar valores que podem ser de mais de um tipo, e type guards para acessá-los com segurança.',
    nivel: 'intermediario',
    categoria: 'TypeScript',
    tempoEstimadoMinutos: 12,
    concluida: false,
    ordem: 3,
    tipoLicao: 'conceito',
    habilidadesChave: ['union types', 'type guard', 'typeof', 'literal types'],
    layout: 'demo-largura-total',
    componenteDemo: DemoTsTiposUnionComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'Union types permitem que uma variável ou parâmetro aceite mais de um tipo. Com a sintaxe A | B você diz ao TypeScript que o valor pode ser do tipo A ou do tipo B — e o compilador exige que você trate os dois casos antes de fazer operações específicas de tipo.',
      subtopicos: [
        {
          titulo: 'Sintaxe básica: A | B',
          conteudo: 'O operador | une dois ou mais tipos. Você pode ler id: string | number como "id pode ser string ou number". O TypeScript permite apenas operações que existem em ambos os tipos até que você estreite a união com um type guard.',
          codigoExemplo: `let id: string | number;
id = 42;        // OK
id = 'abc123';  // OK
// id = true;  // Erro: boolean não está na união

// Só operações comuns a string e number:
id.toString(); // OK para ambos`
        },
        {
          titulo: 'Type Guards — typeof',
          conteudo: 'Para acessar métodos específicos de cada tipo você precisa estreitar a união com um type guard. O typeof verifica o tipo em runtime, e o TypeScript reconhece isso para estreitar o tipo no bloco correspondente.',
          codigoExemplo: `function processar(val: string | number): string {
  if (typeof val === 'number') {
    return \`Dobro: \${val * 2}\`; // val é number aqui
  }
  return val.toUpperCase();     // val é string aqui
}`
        },
        {
          titulo: 'Literal union types',
          conteudo: 'Você pode criar uniões de strings literais para modelar um conjunto fixo de valores válidos — funcionando como um enum mais leve. O TypeScript valida em compile-time que apenas os valores listados sejam atribuídos.',
          codigoExemplo: `type Status = 'ativo' | 'pausado' | 'concluido' | 'erro';

let status: Status = 'ativo'; // OK
// status = 'rodando'; // Erro!

// Usando em function:
function getLabel(s: Status): string {
  return { ativo: '● Ativo', pausado: '⏸ Pausado',
           concluido: '✓ Feito', erro: '✕ Erro' }[s];
}`
        },
        {
          titulo: 'T | undefined — campos opcionais',
          conteudo: 'A union T | undefined (equivalente a T?) representa um valor que pode estar presente ou ausente. Antes de usar um campo opcional você deve verificar se ele é diferente de undefined — o TypeScript exige isso via narrowing.',
          codigoExemplo: `type Tamanho = 'P' | 'M' | 'G' | 'GG';

// Parâmetro opcional = Tamanho | undefined
function getPreco(t?: Tamanho): number {
  if (t === undefined) return 0; // narrowing
  const mapa: Record<Tamanho, number> = { P:29, M:49, G:79, GG:119 };
  return mapa[t];
}`
        }
      ],
      analogia: {
        titulo: 'Uma porta que aceita chave OU cartão magnético',
        descricao: 'Uma fechadura que aceita chave física ou cartão magnético (string | number) permite dois meios de entrada válidos. Mas antes de abrir a porta você precisa verificar o que a pessoa está usando: se for cartão, você passa pelo leitor; se for chave, você a insere na fechadura. Fazer a operação errada (inserir cartão no buraco da chave) geraria um erro. Type guards são exatamente esse passo de verificação — você checa o que você tem antes de agir.'
      }
    },
    configuracaoDemo: {
      objetivo: 'Ver union types e type guards em ação: string | number, literal unions e campos opcionais.',
      acoesPrincipais: [
        '① Digite um número ou texto e observe como o type guard typeof detecta cada caso e aplica a operação correta.',
        '② Clique nas opções de status e veja o literal union ser validado em tempo real.',
        '③ Deixe o campo opcional vazio vs. preenchido para ver a diferença entre undefined e string.',
        '④ Troque o tamanho e veja o Record<Tamanho, number> mapear o literal para um valor numérico.'
      ],
      entradaEsperada: 'Texto, seleção de status/tamanho e campo opcional.',
      resultadoEsperado: 'Tipo detectado, status validado e preço mapeado conforme os union types definidos.',
      dicasObservacao: [
        'No card 1: se o campo contiver apenas dígitos, typeof será number — caso contrário, string.',
        'No card 2: apenas os 4 valores do tipo Status são aceitos — qualquer outro seria erro de compilação.',
        'No card 3: campo vazio equivale a undefined; o narrowing (if(v === "")) é o type guard.'
      ]
    }
  },

  // -------------------------------------------------------------------------
  // TRILHA: Métodos de Array — lições 2 e 3
  // -------------------------------------------------------------------------
  {
    id: 'array-filter',
    trilhaId: 'arrays-funcionais',
    titulo: 'Array.filter()',
    descricaoCurta: 'Extraia subconjuntos de arrays de forma declarativa — sem loops, sem mutação.',
    nivel: 'iniciante',
    categoria: 'TypeScript',
    tempoEstimadoMinutos: 10,
    concluida: false,
    ordem: 2,
    tipoLicao: 'conceito',
    habilidadesChave: ['filter()', 'predicado', 'subconjunto', 'imutabilidade'],
    layout: 'demo-largura-total',
    componenteDemo: DemoArrayFilterComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'filter() percorre um array e retorna um novo array contendo apenas os elementos para os quais a função de predicado retorna true. Ao contrário de map(), o array resultado pode ter menos elementos que o original — mas nunca mais, e os valores preservados nunca são alterados.',
      subtopicos: [
        {
          titulo: 'Sintaxe e predicado',
          conteudo: 'O callback passado para filter() é um predicado: uma função que retorna boolean. Se retornar true, o elemento é incluído no resultado; false e ele é omitido. O array original não é tocado.',
          codigoExemplo: `const nums = [5, 15, 30, 45, 60];

// Predicado: n >= 30
const grandes = nums.filter(n => n >= 30);
// [30, 45, 60] — 3 de 5 elementos

// Original intacto
console.log(nums); // [5, 15, 30, 45, 60]`
        },
        {
          titulo: 'Filtrando strings e objetos',
          conteudo: 'Qualquer propriedade pode ser usada como critério. Para strings, métodos como startsWith(), includes() e match() são predicados naturais. Para objetos, compare campos.',
          codigoExemplo: `const frameworks = ['angular', 'alpine', 'react', 'vue'];
const a = frameworks.filter(s => s.startsWith('a'));
// ['angular', 'alpine']

interface Produto { nome: string; preco: number; emEstoque: boolean; }
const disponiveis = produtos.filter(p => p.emEstoque);
const baratos     = produtos.filter(p => p.preco < 100);`
        },
        {
          titulo: 'Encadeando map + filter',
          conteudo: 'filter() e map() são frequentemente usados em conjunto: primeiro filtra-se para selecionar os elementos relevantes, depois transforma-se com map(). A ordem importa — filtrar antes reduz o número de transformações.',
          codigoExemplo: `const produtos: Produto[] = [ ... ];

// Selecione os disponíveis e exiba só o nome em maiúsculas
const nomes = produtos
  .filter(p => p.emEstoque)
  .map(p => p.nome.toUpperCase());`
        },
        {
          titulo: 'map vs filter — diferença fundamental',
          conteudo: 'map() transforma: mesmo tamanho, valores diferentes. filter() seleciona: mesmo tipo, tamanho menor ou igual. Confundir os dois leva a bugs difíceis de rastrear. Uma boa dica: se você precisa do mesmo tamanho, use map(); se precisa de um subconjunto, use filter().',
          codigoExemplo: `const arr = [1, 2, 3, 4, 5];

// map: 5 entradas → 5 saídas (valores transformados)
arr.map(n => n * 2);          // [2, 4, 6, 8, 10]

// filter: 5 entradas → ≤5 saídas (valores preservados)
arr.filter(n => n % 2 === 0); // [2, 4]`
        }
      ],
      analogia: {
        titulo: 'Um coador de café',
        descricao: 'filter() funciona como um coador: você despeja todos os ingredientes (array original), e o coador retém apenas os que passam pelo critério (predicado). O que não passou ficou de fora do resultado, mas a jarra original não foi modificada. O resultado é sempre um subconjunto — menor ou igual ao original — com os valores exatamente como eram.'
      }
    },
    configuracaoDemo: {
      objetivo: 'Visualizar filter() em ação com números, strings e objetos, e entender a diferença fundamental com map().',
      acoesPrincipais: [
        '① Ajuste o limiar numérico e observe quais elementos passam pelo predicado n >= limiar.',
        '② Altere o prefixo (ex: "a", "r", "v") e veja quais palavras são retidas.',
        '③ Mova o slider de preço máximo e veja quantos produtos passam pelo filtro.',
        '④ Observe o card map vs filter: map transforma todos os 5 itens, filter retorna apenas os pares.'
      ],
      entradaEsperada: 'Limiar numérico, prefixo de texto e faixa de preço.',
      resultadoEsperado: 'Subconjuntos dos arrays exibidos em tempo real, com elementos excluídos visualmente marcados.',
      dicasObservacao: [
        'Um elemento com predicado false aparece riscado (pill--out) — está no original, mas fora do resultado.',
        'O comprimento do array resultado está sempre entre 0 e o tamanho do original.',
        'Encadeie filter().map() para filtrar primeiro (menos trabalho para map).'
      ]
    }
  },
  {
    id: 'array-reduce',
    trilhaId: 'arrays-funcionais',
    titulo: 'Array.reduce()',
    descricaoCurta: 'Acumule todos os elementos de um array em um único valor de qualquer tipo.',
    nivel: 'intermediario',
    categoria: 'TypeScript',
    tempoEstimadoMinutos: 15,
    concluida: false,
    ordem: 3,
    tipoLicao: 'conceito',
    habilidadesChave: ['reduce()', 'acumulador', 'valor inicial', 'groupBy'],
    layout: 'demo-largura-total',
    componenteDemo: DemoArrayReduceComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'reduce() é o mais poderoso dos três métodos funcionais de array. Ele percorre o array mantendo um acumulador que é passado de elemento em elemento, e retorna o valor final acumulado. O resultado pode ser qualquer tipo: number, string, object, array — o que você quiser construir.',
      subtopicos: [
        {
          titulo: 'Sintaxe e acumulador',
          conteudo: 'reduce() recebe dois argumentos: o callback (acc, item) => novoAcc e o valor inicial do acumulador. O callback é chamado para cada elemento e retorna o novo acumulador, que é passado para a próxima iteração.',
          codigoExemplo: `// Array.reduce(callback, valorInicial)
// callback: (acumulador, elemento, índice, array) => novoAcumulador

const nums = [10, 25, 30, 45, 60];
const soma = nums.reduce((acc, n) => acc + n, 0);
// iterações: 0→10→35→65→110→170
// resultado: 170`
        },
        {
          titulo: 'Máximo, mínimo e comparações',
          conteudo: 'reduce() é elegante para encontrar máximo e mínimo sem ordenar o array ou usar variáveis externas. O acumulador começa com o limite extremo e é substituído sempre que um elemento melhor é encontrado.',
          codigoExemplo: `const nums = [12, 8, 35, 4, 21, 16];

const max = nums.reduce((m, n) => n > m ? n : m, -Infinity);
// 35

const min = nums.reduce((m, n) => n < m ? n : m, Infinity);
// 4`
        },
        {
          titulo: 'Agrupar e construir objetos',
          conteudo: 'O acumulador não precisa ser number — pode ser um objeto. Isso permite construir dicionários de contagem, agrupamentos por chave, ou qualquer estrutura a partir de um array flat.',
          codigoExemplo: `const letras = ['a', 'b', 'a', 'c', 'a', 'b'];

// Acumulador é um objeto {}
const contagem = letras.reduce<Record<string, number>>(
  (acc, l) => ({ ...acc, [l]: (acc[l] ?? 0) + 1 }),
  {}
);
// { a: 3, b: 2, c: 1 }`
        },
        {
          titulo: 'reduce vs map + filter',
          conteudo: 'Tecnicamente, reduce() pode reproduzir map() e filter(). Mas isso não significa que deva. Prefira map() para transformações 1:1 e filter() para subconjuntos — são mais legíveis e semânticos. Use reduce() quando o resultado for de tipo diferente do array original (object, number, string).',
          codigoExemplo: `const nums = [1, 2, 3, 4, 5];

// ❌ reduce fazendo filter+map — possível, mas não legível
const paresD = nums.reduce<number[]>(
  (acc, n) => n % 2 === 0 ? [...acc, n * 2] : acc, []
);

// ✅ Prefira: intenção clara
const paresD2 = nums.filter(n => n % 2 === 0).map(n => n * 2);`
        }
      ],
      analogia: {
        titulo: 'Uma folha de ponto ao final do mês',
        descricao: 'Imagine um funcionário que ao final de cada dia de trabalho acrescenta suas horas ao total acumulado do mês (acumulador). No início do mês o total é zero (valor inicial). Após cada dia (iteração) o novo total é o anterior mais as horas de hoje. No final do mês você tem a soma completa — um único número que representa toda a coleção de dias. reduce() funciona exatamente assim: percorre o "mês" (array) acumulando dia a dia (elemento a elemento) até chegar ao total (valor final).'
      }
    },
    configuracaoDemo: {
      objetivo: 'Observar reduce() calculando soma, máximo/mínimo, contagem de ocorrências e entender quando preferir map()+filter().',
      acoesPrincipais: [
        '① Soma: veja como [12,8,35,4,21,16].reduce((acc,n) => acc+n, 0) acumula cada elemento.',
        '② Máximo e Mínimo: elementos destacados são os extremos encontrados pelo reduce.',
        '③ Contar ocorrências: reduce constrói um objeto contendo a frequência de cada letra.',
        '④ Compare map+filter vs reduce — ambos produzem o mesmo resultado, mas um é mais legível.'
      ],
      entradaEsperada: "Array fixo [12, 8, 35, 4, 21, 16] e letras ['a','b','a','c',…].",
      resultadoEsperado: 'Soma, máximo, mínimo e tabela de ocorrências calculados via reduce().',
      dicasObservacao: [
        'O valor inicial (segundo argumento) define o tipo do acumulador.',
        'Para somas use 0, para objetos use {}, para arrays use [].',
        'reduce() sem valor inicial usa o primeiro elemento como acumulador — cuidado com arrays vazios!'
      ]
    }
  },

  // -------------------------------------------------------------------------
  // TRILHA: Reatividade com Signals
  // -------------------------------------------------------------------------
  {
    id: 'signals-basicos',
    trilhaId: 'reatividade-signals',
    titulo: 'Signals Básicos',
    descricaoCurta: 'Crie, leia e atualize signals — o modelo reativo padrão do Angular 17+.',
    nivel: 'iniciante',
    categoria: 'Angular',
    tempoEstimadoMinutos: 12,
    concluida: false,
    ordem: 1,
    tipoLicao: 'conceito',
    habilidadesChave: ['signal()', '.set()', '.update()', 'computed()'],
    layout: 'demo-largura-total',
    componenteDemo: DemoSignalsBasicosComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'Signals são o novo modelo de reatividade do Angular, introduzido na versão 16 e estabilizado na 17. Um signal é um contêiner de valor reativo: qualquer parte do template ou código que lê um signal registra uma dependência automática e é notificada quando o valor muda — sem Observables, sem subscribe(), sem unsubscribe().',
      subtopicos: [
        {
          titulo: 'signal(valorInicial) — criar e ler',
          conteudo: 'Para criar um signal basta chamar signal() com o valor inicial. Para ler o valor, invoque-o como função: contador(). Essa invocação é o que registra a dependência no Angular e permite que templates e computed() rastreiem mudanças automaticamente.',
          codigoExemplo: `import { signal } from '@angular/core';

const contador = signal(0);     // WritableSignal<number>
console.log(contador());        // 0 ← leitura

const nome = signal('Angular'); // WritableSignal<string>
console.log(nome());            // 'Angular'`
        },
        {
          titulo: '.set() — substituir o valor',
          conteudo: '.set() recebe o novo valor e substitui completamente o atual. Use quando você já tem o valor final pronto para atribuir.',
          codigoExemplo: `const preco = signal(100);
preco.set(200);
console.log(preco()); // 200

// Útil para botões de preset:
function setPremium() { preco.set(299); }
function setGratis()  { preco.set(0); }`
        },
        {
          titulo: '.update() — transformar com base no atual',
          conteudo: '.update() recebe uma função que recebe o valor atual e retorna o novo. Use quando o novo valor depende do valor anterior — para incrementos, toggles, e transformações.',
          codigoExemplo: `const contador = signal(0);
contador.update(v => v + 1); // 1
contador.update(v => v + 1); // 2
contador.update(v => v * 2); // 4

const ativo = signal(false);
ativo.update(v => !v);       // toggle`
        },
        {
          titulo: 'computed() — Signal somente leitura',
          conteudo: 'computed() cria um signal derivado de outros signals. Ele é somente leitura (você não pode fazer .set() nele) e recalcula automaticamente apenas quando algum signal lido dentro dele mudar. É lazy e memorizado: não recalcula se nada mudou.',
          codigoExemplo: `const preco    = signal(100);
const qtd      = computed(() => preco() * 3); // WritableSignal não

// ⚠️ computed retorna um Signal de leitura, não WritableSignal
// qtd.set(…) → ERRO de compilação

console.log(qtd()); // 300
preco.set(200);
console.log(qtd()); // 600 ← recalculado automaticamente`
        }
      ],
      analogia: {
        titulo: 'Uma planilha viva',
        descricao: 'Pense em uma planilha do Excel. Cada célula com valor direto é um signal (você digita 100 na célula A1). Cada célula com fórmula é um computed (B1 = A1 * 2). Quando você altera A1, B1 atualiza automaticamente — você não precisa "recalcular" manualmente. .set() é digitar um novo valor na célula; .update() é "adicionar 5 ao valor atual". O Excel (Angular) cuida da propagação das mudanças para todas as células que dependem do valor alterado.'
      }
    },
    configuracaoDemo: {
      objetivo: 'Experimentar os quatro pilares dos signals: signal(), .set(), .update() e computed().',
      acoesPrincipais: [
        '① Card 1: edite o nome e observe como nome() exibe o valor em tempo real no template.',
        '② Card 2: clique nos botões R$50/R$100/R$200 para ver .set() substituindo o valor.',
        '③ Card 3: use +1/-1 para ver .update(v => v+1) e o histórico dos últimos valores.',
        '④ Card 4: mude o preço no card 2 e observe dobro() (computed) recalculando automaticamente.'
      ],
      entradaEsperada: 'Texto no campo nome, cliques nos botões de preset e incremento.',
      resultadoEsperado: 'Cada card demonstra uma operação de signal, com computed() refletindo preco() sem nenhum código explícito de sincronização.',
      dicasObservacao: [
        'No card 4, dobro() só recalcula quando preco() muda — não quando nome() ou contador() mudam.',
        '.update() é atômico: sempre recebe o valor mais recente, sem race conditions.',
        'Signals são compatíveis com OnPush: o Angular re-renderiza apenas o que mudou.'
      ]
    }
  },
  {
    id: 'signals-computed',
    trilhaId: 'reatividade-signals',
    titulo: 'computed() — Estado Derivado',
    descricaoCurta: 'Derive valores automaticamente a partir de outros signals, sem efeitos colaterais.',
    nivel: 'intermediario',
    categoria: 'Angular',
    tempoEstimadoMinutos: 12,
    concluida: false,
    ordem: 2,
    tipoLicao: 'conceito',
    habilidadesChave: ['computed()', 'derivação', 'lazy', 'memoização'],
    layout: 'demo-largura-total',
    componenteDemo: DemoSignalsComputedComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'computed() é a ferramenta para estado derivado em Angular Signals. Ele cria um signal somente leitura cujo valor é calculado a partir de outros signals. O grande benefício: o cálculo só acontece quando necessário (lazy) e o resultado é memorizado até que algum signal de entrada mude (memoizado). O Angular cuida de tudo automaticamente.',
      subtopicos: [
        {
          titulo: 'Quando usar computed()',
          conteudo: 'Sempre que um valor for uma função determinística de outros signals, use computed(). Isso inclui totais, formatações, filtros, flags derivados e qualquer cálculo que precise atualizar automaticamente.',
          codigoExemplo: `const preco   = signal(100);
const qtd     = signal(3);

// Toda vez que preco() ou qtd() mudar, subtotal recalcula
const subtotal = computed(() => preco() * qtd());

// subtotal() é sempre preco() * qtd() — sem chance de ficar desatualizado`
        },
        {
          titulo: 'Encadeamento de computeds',
          conteudo: 'computeds podem depender de outros computeds formando uma cadeia reativa. Se um signal na base mudar, toda a cadeia de dependentes é invalidada e recalculada na próxima leitura.',
          codigoExemplo: `const desconto      = signal(10); // %
const subtotal      = computed(() => preco() * qtd());
const valorDesc     = computed(() => subtotal() * desconto() / 100);
const totalSemFrete = computed(() => subtotal() - valorDesc());
const totalFinal    = computed(() => totalSemFrete() + frete());

// Mudar preco() invalida toda a cadeia até totalFinal()`
        },
        {
          titulo: 'computed é lazy e memoizado',
          conteudo: 'Lazy significa que o computed não recalcula no momento em que um signal de entrada muda — só recalcula quando alguém o lê. Memoizado significa que se nada mudou desde a última leitura, o valor em cache é retornado diretamente, sem reexecutar a função.',
          codigoExemplo: `const a = signal(5);
const b = computed(() => {
  console.log('calculando!'); // só aparece quando necessário
  return a() * 2;
});

// Template não lê b() → nunca executa
// Template lê b() → executa uma vez, armazena 10
// a.set(5) (mesmo valor) → não invalida
// a.set(6) → invalida, próxima leitura recalcula`
        },
        {
          titulo: 'computed vs effect() para derivações',
          conteudo: 'Nunca use effect() para derivar valores e escrever em outro signal — isso cria dependências cíclicas e lógica difícil de rastrear. computed() é a ferramenta certa: declarativo, sem efeitos colaterais, memorizado.',
          codigoExemplo: `// ❌ Nunca faça isso:
const total = signal(0);
effect(() => { total.set(preco() * qtd()); }); // ERRADO

// ✅ Use computed():
const total = computed(() => preco() * qtd()); // CERTO`
        }
      ],
      analogia: {
        titulo: 'Uma cadeia de engrenagens mecânicas',
        descricao: 'Imagine que preco e qtd são duas alavancas. Quando você move uma alavanca, uma engrenagem gira (subtotal), que por sua vez move outra engrenagem (valorDesconto), que move outra (totalSemFrete), e assim por diante até o display final (totalFinal). Você não precisa girar cada engrenagem manualmente — a mecânica (Angular) cuida da propagação. E se você não mover nenhuma alavanca, nenhuma engrenagem se move — é o comportamento lazy. computed() modela exatamente essa cadeia de engrenagens.'
      }
    },
    configuracaoDemo: {
      objetivo: 'Observar uma cadeia de computeds reagindo a mudanças nos signals de entrada: preço × quantidade → desconto → frete → total → categoria.',
      acoesPrincipais: [
        '① Mude preço e quantidade no card 1 e observe subtotal() atualizar instantaneamente.',
        '② Ajuste o desconto no card 2 e veja valorDesconto() e totalSemFrete() se propagando.',
        '③ Mova o slider de frete no card 3 e observe totalFinal() e categoria() reagindo.',
        '④ Card 4: leia sobre lazy + memoização — o computed só recalcula quando um input muda.'
      ],
      entradaEsperada: 'Preço, quantidade, desconto e frete.',
      resultadoEsperado: 'Cadeia completa: subtotal → desconto → totalSemFrete → totalFinal → categoria, tudo atualizado automaticamente.',
      dicasObservacao: [
        'Se você mudar apenas o frete, apenas totalFinal() e categoria() recalculam — subtotal não.',
        'O card "Básico/Padrão/Premium" mostra computed com condicional ternário aninhado.',
        'Todos os computeds são somente leitura: você não pode chamar .set() neles.'
      ]
    }
  },
  {
    id: 'signals-effect',
    trilhaId: 'reatividade-signals',
    titulo: 'effect() — Efeitos Colaterais',
    descricaoCurta: 'Execute lógica reativa quando signals mudam — para sincronizar com sistemas externos.',
    nivel: 'intermediario',
    categoria: 'Angular',
    tempoEstimadoMinutos: 12,
    concluida: false,
    ordem: 3,
    tipoLicao: 'conceito',
    habilidadesChave: ['effect()', 'untracked()', 'cleanup', 'side effects'],
    layout: 'demo-largura-total',
    componenteDemo: DemoSignalsEffectComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'effect() é o mecanismo para executar código com efeitos colaterais em resposta a mudanças de signals. Ao contrário de computed(), ele não retorna um valor — seu propósito é interagir com sistemas externos: salvar no localStorage, chamar analytics, atualizar bibliotecas DOM externas, etc.',
      subtopicos: [
        {
          titulo: 'Como effect() rastreia dependências',
          conteudo: 'Ao executar pela primeira vez, effect() registra todos os signals lidos dentro dele como dependências. Na próxima vez que qualquer um desses signals mudar, o effect re-executa automaticamente. Não é necessário declarar as dependências explicitamente.',
          codigoExemplo: `const tema = signal<'dark'|'light'>('dark');

// Registra 'tema' como dependência automaticamente
effect(() => {
  document.body.dataset['theme'] = tema();
  // Re-executa toda vez que tema() mudar
});`
        },
        {
          titulo: 'untracked() — leituras não rastreadas',
          conteudo: 'Se você precisar ler um signal dentro do effect sem criar uma dependência, use untracked(). O effect não re-executará quando esse signal mudar.',
          codigoExemplo: `const tema   = signal('dark');
const volume = signal(50);

effect(() => {
  const t = tema();                          // rastreado
  const v = untracked(() => volume());       // NÃO rastreado
  console.log(\`Tema: \${t}, Volume: \${v}\`);
  // Só re-executa quando tema() mudar, não quando volume() mudar
});`
        },
        {
          titulo: 'Cleanup — limpeza entre execuções',
          conteudo: 'Se o effect criar recursos que precisam ser limpos (timers, listeners), use a função onCleanup. Ela é chamada antes de cada re-execução do effect e quando o effect é destruído.',
          codigoExemplo: `effect((onCleanup) => {
  const id = setInterval(() => {
    console.log('tick', tema());
  }, 1000);

  // Chamado antes do próximo run ou ao destruir:
  onCleanup(() => clearInterval(id));
});`
        },
        {
          titulo: 'Quando usar e quando evitar',
          conteudo: 'Use effect() para sincronizar com sistemas externos ao Angular. Nunca use para derivar valores — isso é papel do computed(). Nunca escreva em signals dentro de um effect, pois isso pode causar loops infinitos.',
          codigoExemplo: `// ✅ Usos corretos de effect():
effect(() => { localStorage.setItem('tema', tema()); }); // persistência
effect(() => { analytics.track('volumeChange', volume()); }); // logs

// ❌ Nunca use effect() para derivar valores:
effect(() => { total.set(preco() * qtd()); }); // use computed()

// ❌ Nunca escreva no mesmo signal que você lê:
effect(() => { contador.update(v => v + contador()); }); // loop!`
        }
      ],
      analogia: {
        titulo: 'Um porteiro que abre a porta automaticamente',
        descricao: 'Imagine um sensor de presença (signal) ligado a uma luz automática (effect). Quando alguém entra no corredor (signal muda), a luz acende (effect executa). O sensor não "calcula" nada — ele apenas aciona uma ação no mundo físico. computed() seria uma calculadora que retorna um resultado derivado. effect() é o porteiro que reage a mudanças executando ações no mundo externo.'
      }
    },
    configuracaoDemo: {
      objetivo: 'Ver um effect() sendo acionado em resposta a mudanças de signal, com log visual das execuções.',
      acoesPrincipais: [
        '① Card 1: clique no toggle dark/light e veja o effect() registrar cada mudança no log.',
        '② Card 2: mova o slider de volume — um segundo effect() independente rastreia esse signal.',
        '③ Card 3: veja o código de untracked() — como ler volume sem que o effect dependa dele.',
        '④ Card 4: revise as regras — quando usar e quando evitar effect().'
      ],
      entradaEsperada: 'Toggle de tema e slider de volume.',
      resultadoEsperado: 'Logs de execução aparecendo em tempo real, demonstrando quando cada effect é acionado.',
      dicasObservacao: [
        'O contador de execuções mostra quantas vezes o effect foi chamado desde a montagem.',
        'Cada effect rastreia seus próprios signals independentemente.',
        'effects criados no constructor() são destruídos automaticamente quando o componente é destruído.'
      ]
    }
  },

  // -------------------------------------------------------------------------
  // TRILHA: Bindings e Diretivas — lições 5 e 6
  // -------------------------------------------------------------------------
  {
    id: 'template-controle-fluxo',
    trilhaId: 'bindings-diretivas',
    titulo: 'Controle de Fluxo no Template',
    descricaoCurta: 'Use @if, @for e @switch para renderização condicional e listas — a sintaxe moderna do Angular 17+.',
    nivel: 'intermediario',
    categoria: 'Angular',
    tempoEstimadoMinutos: 15,
    concluida: false,
    ordem: 5,
    tipoLicao: 'conceito',
    habilidadesChave: ['@if', '@for', '@switch', '@empty', 'track'],
    layout: 'demo-largura-total',
    componenteDemo: DemoTemplateControleFluxoComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'Angular 17 introduziu uma nova sintaxe de controle de fluxo nativa no template, substituindo *ngIf, *ngFor e *ngSwitch. A nova sintaxe com @ é mais legível, não exige import de CommonModule, funciona melhor com OnPush e tem performance superior graças ao compilador Angular.',
      subtopicos: [
        {
          titulo: '@if / @else — renderização condicional',
          conteudo: '@if verifica uma condição e renderiza o bloco somente se ela for verdadeira. O elemento não existe no DOM quando a condição é falsa — diferente de [hidden] que apenas oculta. Use @else para o caso contrário e @else if para múltiplas condições.',
          codigoExemplo: `@if (usuario) {
  <p>Olá, {{ usuario.nome }}</p>
} @else if (carregando) {
  <p>Carregando…</p>
} @else {
  <p>Faça login</p>
}

// Ao contrário de [hidden], @if remove o elemento do DOM`
        },
        {
          titulo: '@for — renderizar listas',
          conteudo: '@for percorre um iterável e renderiza um bloco para cada elemento. A cláusula track é obrigatória e diz ao Angular como identificar cada item para otimizar a reconciliação do DOM. Use variáveis implícitas $index, $first, $last, $even, $odd.',
          codigoExemplo: `@for (item of itens(); track item.id) {
  <li [class.primeiro]="$first">{{ item.nome }}</li>
} @empty {
  <li>Nenhum item encontrado</li>
}

// track por valor primitivo:
@for (nome of nomes(); track nome) { ... }`
        },
        {
          titulo: '@switch / @case — múltiplas alternativas',
          conteudo: '@switch avalia uma expressão e renderiza o @case que corresponde. @default é renderizado se nenhum case corresponder. É mais limpo que @else if encadeados para enumerações.',
          codigoExemplo: `@switch (status()) {
  @case ('ativo')    { <span class="verde">● Ativo</span>    }
  @case ('pausado')  { <span class="cinza">⏸ Pausado</span>  }
  @case ('erro')     { <span class="vermelho">✕ Erro</span>  }
  @default           { <span>Estado desconhecido</span>        }
}`
        },
        {
          titulo: 'track — por que é obrigatório',
          conteudo: 'O Angular usa track para identificar cada item da lista e saber o que foi adicionado, removido ou reordenado sem recriar todos os elementos. Sem track, o Angular precisaria destruir e recriar todos os elementos a cada mudança — muito mais lento.',
          codigoExemplo: `// track por propriedade única (recomendado para objetos):
@for (p of produtos(); track p.id) { ... }

// track por valor (bom para primitivos únicos):
@for (nome of nomes(); track nome) { ... }

// track por índice (último recurso — sem estabilidade):
@for (item of items(); track $index) { ... }`
        }
      ],
      analogia: {
        titulo: 'Uma impressora inteligente que só reimprima o que mudou',
        descricao: '@for com track é como uma impressora que compara a nova lista com a impressão anterior e só reimprima as páginas que mudaram. Sem track, ela reimprima o documento inteiro a cada mudança. Com track, ela sabe que o item ID-42 está na mesma posição e não precisa ser recriado — só os novos ou removidos são processados. O @if é o gatilho que decide se a impressora deve ligar: sem condição verdadeira, nem começa.'
      }
    },
    configuracaoDemo: {
      objetivo: 'Experimentar @if, @for com @empty, @switch e track em uma interface interativa.',
      acoesPrincipais: [
        '① Toggle @if: alterne entre mostrar/ocultar e observe que o elemento é inserido/removido do DOM.',
        '② @for: adicione itens pelo campo de texto e remova com ✕ — veja @empty aparecer quando a lista esvazia.',
        '③ @switch: troque o status e veja o bloco @case correspondente ser renderizado.',
        '④ Cards de track: leia as diferenças entre track item, track item.id e track $index.'
      ],
      entradaEsperada: 'Toggle, campo de texto para adicionar itens e seleção de status.',
      resultadoEsperado: 'DOM sendo atualizado seletivamente conforme o controle de fluxo reage às mudanças.',
      dicasObservacao: [
        'Use DevTools > Elements para ver que @if remove o elemento do DOM (ao contrário de [hidden]).',
        'O @empty só aparece quando itens() é um array vazio — não quando está carregando.',
        'track nome funciona porque os nomes são únicos — se houvesse duplicatas, use track $index.'
      ]
    }
  },
  {
    id: 'two-way-binding',
    trilhaId: 'bindings-diretivas',
    titulo: 'Two-Way Binding',
    descricaoCurta: 'Sincronize campos de formulário com o estado do componente usando [(ngModel)].',
    nivel: 'intermediario',
    categoria: 'Angular',
    tempoEstimadoMinutos: 12,
    concluida: false,
    ordem: 6,
    tipoLicao: 'conceito',
    habilidadesChave: ['[(ngModel)]', 'FormsModule', 'two-way', 'banana-in-a-box'],
    layout: 'demo-largura-total',
    componenteDemo: DemoTwoWayBindingComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'Two-way binding combina property binding e event binding em uma única sintaxe: [(ngModel)]. O valor flui do componente para o input ([ngModel]) e do input de volta para o componente ((ngModelChange)) simultaneamente. Isso torna formulários simples extremamente fáceis de implementar.',
      subtopicos: [
        {
          titulo: '[(ngModel)] — a "banana na caixa"',
          conteudo: 'A sintaxe [(ngModel)] é chamada de "banana-in-a-box": os parênteses () ficam dentro dos colchetes []. Ela equivale exatamente a escrever [ngModel] + (ngModelChange) ao mesmo tempo. Requer FormsModule no array imports do componente.',
          codigoExemplo: `// Requer import: FormsModule no componente
import { FormsModule } from '@angular/forms';

@Component({ imports: [FormsModule] })
class MeuComponent {
  nome = 'Angular';
}

// Template:
<input [(ngModel)]="nome" />
<p>Olá, {{ nome }}!</p>`
        },
        {
          titulo: 'Sintaxe equivalente explícita',
          conteudo: 'Às vezes você quer interceptar o valor antes de atribuir — por exemplo, validar ou transformar. Nesses casos, separe em [ngModel] + (ngModelChange) manualmente.',
          codigoExemplo: `// [(ngModel)]="texto" é equivalente a:
<input
  [ngModel]="texto"
  (ngModelChange)="texto = $event"
/>

// Com interceptação:
<input
  [ngModel]="texto"
  (ngModelChange)="onTextoMudou($event)"
/>

onTextoMudou(val: string) {
  this.texto = val.trim().toLowerCase();
}`
        },
        {
          titulo: 'Two-way com signals',
          conteudo: 'Com signals, você pode usar [(ngModel)] apontando para uma propriedade regular (não signal) ou usar [ngModel] + (ngModelChange) para atualizar o signal manualmente. O Angular 19+ suporta diretamente model signals (input com two-way built-in) para componentes customizados.',
          codigoExemplo: `// Com campo regular (mais simples para formulários):
nomeModel = 'Angular';
// <input [(ngModel)]="nomeModel" />

// Com signal (mais reativo):
readonly nome = signal('Angular');
// <input [ngModel]="nome()" (ngModelChange)="nome.set($event)" />`
        },
        {
          titulo: 'Tipos compatíveis',
          conteudo: 'ngModel funciona com text, number, email, textarea, select e checkbox. Para type="number", Angular converte automaticamente para number. Para select com [value], você pode vincular objetos inteiros.',
          codigoExemplo: `<!-- text -->
<input type="text"   [(ngModel)]="texto" />

<!-- number — Angular converte para number -->
<input type="number" [(ngModel)]="idade" />

<!-- select -->
<select [(ngModel)]="nivel">
  <option value="A">Iniciante</option>
  <option value="B">Avançado</option>
</select>

<!-- checkbox -->
<input type="checkbox" [(ngModel)]="aceito" />`
        }
      ],
      analogia: {
        titulo: 'Um espelho de duas vias',
        descricao: 'Imagine dois espelhos posicionados um na frente do outro. Quando o componente muda o valor (movendo o espelho esquerdo), o input reflete imediatamente. Quando o usuário digita no input (movendo o espelho direito), o componente reflete imediatamente. Qualquer movimento em qualquer lado é instantaneamente refletido no outro. Two-way binding é esse espelho mútuo: o fluxo de dados vai para os dois lados ao mesmo tempo.'
      }
    },
    configuracaoDemo: {
      objetivo: 'Experimentar [(ngModel)] em texto, number e select, e ver a diferença com a sintaxe explícita [ngModel] + (ngModelChange).',
      acoesPrincipais: [
        '① Digite no campo de texto e observe o valor no componente sendo atualizado imediatamente.',
        '② Veja a sintaxe explícita [ngModel]/(ngModelChange) — idêntica em comportamento a [(ngModel)].',
        '③ Ajuste o número e confirme que o tipo é number (não string).',
        '④ Selecione um nível no select e veja o two-way funcionando com elementos de lista.'
      ],
      entradaEsperada: 'Digitação em campos de texto, ajuste de número e seleção no select.',
      resultadoEsperado: 'Cada campo atualiza o estado do componente imediatamente, demonstrando o fluxo bidirecional.',
      dicasObservacao: [
        'FormsModule é obrigatório — sem ele, ngModel não funciona e você não vê erro claro.',
        'Para formulários mais complexos com validação, considere ReactiveFormsModule.',
        'model() (Angular 17.1+) é o equivalente signal do two-way binding para componentes filhos.'
      ]
    }
  },

  // -------------------------------------------------------------------------
  // TRILHA: Componentes Angular
  // -------------------------------------------------------------------------
  {
    id: 'componentes-comunicacao',
    trilhaId: 'componentes-angular',
    titulo: 'Comunicação entre Componentes',
    descricaoCurta: 'Passe dados do pai para filho com input() e emita eventos do filho para o pai com output().',
    nivel: 'intermediario',
    categoria: 'Angular',
    tempoEstimadoMinutos: 15,
    concluida: false,
    ordem: 1,
    tipoLicao: 'conceito',
    habilidadesChave: ['input()', 'output()', 'input.required()', 'EventEmitter'],
    layout: 'demo-largura-total',
    componenteDemo: DemoComponentesComunicacaoComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'A comunicação entre componentes é o núcleo da arquitetura Angular. O fluxo de dados é unidirecional por padrão: o pai passa dados para o filho via inputs, e o filho notifica o pai de eventos via outputs. Angular 17.2 introduziu input() e output() como alternativas signal-based aos decoradores @Input() e @Output().',
      subtopicos: [
        {
          titulo: 'input() — receber dados do pai',
          conteudo: 'input() cria um Signal de entrada no componente filho. O pai usa [property binding] para passar o valor. No filho, o signal é somente leitura — você invoca titulo() para ler, mas não pode chamar .set(). Use input.required<T>() quando o input for obrigatório.',
          codigoExemplo: `// Filho
import { input } from '@angular/core';

@Component({ selector: 'app-card', ... })
export class CardComponent {
  titulo  = input.required<string>();   // obrigatório
  preco   = input<number>(0);           // opcional com default
  nivel   = input<'P'|'M'|'G'>('M');   // union type

  ngOnInit() {
    console.log(this.titulo()); // lê como signal
  }
}

// Pai → template
<app-card [titulo]="'Angular'" [preco]="199" />`
        },
        {
          titulo: 'output() — emitir eventos para o pai',
          conteudo: 'output() cria um canal de evento tipado. O filho chama .emit() para enviar dados; o pai usa (event binding) para capturar. output() é a alternativa moderna ao @Output() + new EventEmitter().',
          codigoExemplo: `// Filho
import { output } from '@angular/core';

@Component({ ... })
export class CardComponent {
  comprar = output<{ titulo: string; preco: number }>();

  onBtnClick() {
    this.comprar.emit({
      titulo: this.titulo(),
      preco:  this.preco()
    });
  }
}

// Pai → template
<app-card (comprar)="onCompra($event)" />`
        },
        {
          titulo: 'Fluxo unidirecional de dados',
          conteudo: 'Os dados fluem de cima para baixo (pai → filho via inputs) e os eventos sobem (filho → pai via outputs). O filho nunca altera diretamente dados do pai — ele emite um evento e o pai decide o que fazer. Isso torna o fluxo previsível e fácil de testar.',
          codigoExemplo: `// ✅ Correto: filho emite evento, pai reage
filho:  comprar.emit({ preco: 99 });
pai:    onCompra(e) { this.carrinho.push(e); }

// ❌ Nunca: filho muta referência do pai
filho:  this.pai.carrinho.push(...); // acoplamento

// ❌ Nunca: filho modifica o próprio input
filho:  this.titulo.set('Outro'); // ERRO — input é somente leitura`
        },
        {
          titulo: 'input.required vs input opcional',
          conteudo: 'input.required<T>() gera um erro de compilação se o pai não passar o valor — não há default possível. input<T>(defaultValue) é opcional: se o pai não passar, o signal retorna o default. Use required para dados essenciais que não têm valor padrão lógico.',
          codigoExemplo: `// Obrigatório — TypeScript erro se não fornecido no template:
id     = input.required<number>();
titulo = input.required<string>();

// Opcional — retorna default se não fornecido:
nivel   = input<'P'|'M'|'G'>('M');
visivel = input<boolean>(true);

// Opcional sem default (T | undefined):
descricao = input<string>();`
        }
      ],
      analogia: {
        titulo: 'Um restaurante com pedido em papel',
        descricao: 'O gerente (pai) passa informações para o garçom (filho): "mesa 5, cardápio do dia" (inputs). O garçom não altera as instruções do gerente — ele as lê e usa. Quando o cliente faz um pedido, o garçom escreve no papel e entrega na cozinha (pai via output). O gerente recebe o papel e decide o próximo passo. Nunca o garçom vai diretamente à cozinha dizer o que fazer ao gerente — o fluxo é sempre filho → evento → pai.'
      }
    },
    configuracaoDemo: {
      objetivo: 'Simular a comunicação pai-filho: o pai controla os dados (inputs), o filho exibe e emite eventos (outputs) que o pai captura.',
      acoesPrincipais: [
        '① Card "Pai": altere título, preço e estoque — esses são os dados que o pai passaria via inputs.',
        '② Card "Filho": veja os valores recebidos sendo exibidos — simulando o comportamento do componente filho.',
        '③ Clique em "Comprar" no card filho — isso simula output.emit() sendo chamado.',
        '④ Card 3: o log mostra os eventos capturados pelo pai via (comprar)="onCompra($event)".'
      ],
      entradaEsperada: 'Campos do pai (título, preço, estoque) e clique em "Comprar" no filho.',
      resultadoEsperado: 'O filho reflete os inputs do pai e emite eventos que aparecem no log do pai.',
      dicasObservacao: [
        'Quando estoque = 0, o botão "Comprar" é desabilitado — o filho controla sua UI com base nos inputs.',
        'O pai nunca sabe como o filho implementa o botão — só ouve o evento (comprar).',
        'inputs são somente leitura no filho — nunca chame .set() em um input().'
      ]
    }
  },
  {
    id: 'pipes-builtin',
    trilhaId: 'componentes-angular',
    titulo: 'Pipes Integrados do Angular',
    descricaoCurta: 'Transforme dados para exibição no template com date, currency, number e mais.',
    nivel: 'iniciante',
    categoria: 'Angular',
    tempoEstimadoMinutos: 10,
    concluida: false,
    ordem: 2,
    tipoLicao: 'conceito',
    habilidadesChave: ['DatePipe', 'CurrencyPipe', 'DecimalPipe', 'UpperCasePipe', 'TitleCasePipe'],
    layout: 'demo-largura-total',
    componenteDemo: DemoPipesBuiltinComponent as Type<unknown>,
    conteudoTeoria: {
      introducao: 'Pipes são transformadores de exibição: eles recebem um valor, aplicam uma formatação e retornam uma string para o template. Importantes: pipes nunca mutam o dado original — eles apenas formatam para exibição. O Angular inclui um conjunto de pipes utilitários que cobrem os casos mais comuns.',
      subtopicos: [
        {
          titulo: 'date — formatar datas',
          conteudo: 'O DatePipe formata objetos Date com um padrão de formato. Use formatos predefinidos (short, medium, long, full) ou padrões customizados com letras de formato (dd, MM, yyyy, HH, mm, ss).',
          codigoExemplo: `// Importar no componente standalone:
import { DatePipe } from '@angular/common';
@Component({ imports: [DatePipe] })

// Template:
{{ data | date:'dd/MM/yyyy' }}      // 15/07/2025
{{ data | date:'dd MMMM yyyy' }}    // 15 Julho 2025
{{ data | date:'HH:mm' }}          // 14:30
{{ data | date:'medium' }}          // Jul 15, 2025, 2:30:00 PM`
        },
        {
          titulo: 'currency — formatar moedas',
          conteudo: 'CurrencyPipe formata números como moeda. Aceita código ISO da moeda (BRL, USD, EUR), símbolo ou código como display, e formato de decimais.',
          codigoExemplo: `import { CurrencyPipe } from '@angular/common';

{{ 1234.56 | currency:'BRL':'symbol':'1.2-2' }}  // R$ 1.234,56
{{ 1234.56 | currency:'USD' }}                    // $1,234.56
{{ 1234.56 | currency:'EUR':'code' }}             // EUR 1,234.56`
        },
        {
          titulo: 'number — casas decimais',
          conteudo: 'DecimalPipe formata números com controle de casas inteiras e decimais. O formato é "minInt.minDec-maxDec".',
          codigoExemplo: `import { DecimalPipe } from '@angular/common';

{{ 3.14159 | number:'1.2-2' }}  // 3.14
{{ 3.14159 | number:'1.4-6' }}  // 3.141590
{{ 3.14159 | number:'1.0-0' }}  // 3       (sem decimais)`
        },
        {
          titulo: 'Pipes de texto: uppercase, titlecase, lowercase',
          conteudo: 'Pipes de texto simples e muito úteis para exibição. Eles não alteram a string original no componente — apenas formatam o que é exibido.',
          codigoExemplo: `import { UpperCasePipe, TitleCasePipe, LowerCasePipe } from '@angular/common';

{{ 'angular e typescript' | uppercase }}  // ANGULAR E TYPESCRIPT
{{ 'angular e typescript' | titlecase }}  // Angular E Typescript
{{ 'ANGULAR' | lowercase }}              // angular

// Pipes são puros por padrão — só reexecutam quando o valor muda`
        }
      ],
      analogia: {
        titulo: 'Um tradutor simultâneo na cabine de vidro',
        descricao: 'Um intérprete simultâneo recebe o discurso em um idioma e o converte em tempo real para outro, sem alterar o texto original do orador. O orador continua com seu discurso em inglês (dado original no componente), mas a audiência ouve em português (dado formatado no template pelo pipe). Se o orador disser "1234.56", o intérprete diz "R$ 1.234,56" para o público brasileiro. O orador não mudou — só a apresentação mudou. Pipes funcionam exatamente assim.'
      }
    },
    configuracaoDemo: {
      objetivo: 'Ver todos os pipes principais em ação com valores interativos: data, moeda, número e texto.',
      acoesPrincipais: [
        '① Card date: veja a data 15/07/2025 nos 5 formatos disponíveis — do mais curto ao mais legível.',
        '② Card currency: altere o valor e veja R$, USD e EUR formatados simultaneamente.',
        '③ Card number: ajuste o número com decimais e veja os 3 formatos (0, 2 e 4+ casas).',
        '④ Card text: edite o texto e veja uppercase e titlecase atualizando em tempo real.'
      ],
      entradaEsperada: 'Valor monetário, número decimal e texto livre.',
      resultadoEsperado: 'Dados originais preservados, apenas a exibição transformada pelos pipes.',
      dicasObservacao: [
        'Pipes em standalone components precisam ser importados individualmente (não há mais CommonModule obrigatório).',
        'Pipes puros (padrão) só re-executam quando o valor de entrada muda — eficientes por padrão.',
        'Para locale pt-BR correto em date e number, registre registerLocaleData(localePt) no main.ts.'
      ]
    }
  }
];

// ============================================================================
// TRILHAS - Organizadas por camada pedagógica
// ============================================================================

const TRILHAS_MOCK: Trilha[] = [
  // Camada 1: Fundamentos TypeScript
  {
    id: 'primitivos-interfaces',
    titulo: 'Primitivos e Interfaces',
    descricao: 'Domine os fundamentos do TypeScript: tipos primitivos e interfaces. Base essencial antes de avançar para Angular.',
    nivel: 'iniciante',
    categoriaPrincipal: 'Fundamentos',
    camada: 'fundamentos-ts',
    ordem: 1,
    licoes: LICOES_MOCK.filter(l => l.trilhaId === 'primitivos-interfaces').sort((a, b) => a.ordem - b.ordem)
  },
  // Camada 1b: Métodos de Array (TypeScript funcional)
  {
    id: 'arrays-funcionais',
    titulo: 'Métodos de Array',
    descricao: 'Domine map(), filter() e reduce() — os três métodos que transformam a forma como você manipula coleções de dados em TypeScript.',
    nivel: 'iniciante',
    categoriaPrincipal: 'Fundamentos',
    camada: 'fundamentos-ts',
    ordem: 2,
    licoes: LICOES_MOCK.filter(l => l.trilhaId === 'arrays-funcionais').sort((a, b) => a.ordem - b.ordem)
  },
  // Camada 2: Templates e Bindings
  {
    id: 'bindings-diretivas',
    titulo: 'Bindings e Diretivas',
    descricao: 'Aprenda a comunicação entre componente e template: interpolação, property binding, event binding, controle de fluxo e two-way binding.',
    nivel: 'iniciante',
    categoriaPrincipal: 'Core Angular',
    camada: 'bindings-diretivas',
    ordem: 1,
    licoes: LICOES_MOCK.filter(l => l.trilhaId === 'bindings-diretivas').sort((a, b) => a.ordem - b.ordem)
  },
  // Camada 3: Reatividade com Signals
  {
    id: 'reatividade-signals',
    titulo: 'Reatividade com Signals',
    descricao: 'Domine signal(), computed() e effect() — o modelo reativo padrão do Angular 17+, sem Observables.',
    nivel: 'intermediario',
    categoriaPrincipal: 'Core Angular',
    camada: 'reatividade-forms',
    ordem: 1,
    licoes: LICOES_MOCK.filter(l => l.trilhaId === 'reatividade-signals').sort((a, b) => a.ordem - b.ordem)
  },
  // Camada 4: Arquitetura de Componentes
  {
    id: 'componentes-angular',
    titulo: 'Componentes Angular',
    descricao: 'Aprenda a comunicação entre componentes com input()/output() e a exibir dados com pipes integrados.',
    nivel: 'intermediario',
    categoriaPrincipal: 'Arquitetura',
    camada: 'arquitetura',
    ordem: 1,
    licoes: LICOES_MOCK.filter(l => l.trilhaId === 'componentes-angular').sort((a, b) => a.ordem - b.ordem)
  }
];

// ============================================================================
// DATA SOURCE
// ============================================================================

@Injectable({ providedIn: 'root' })
export class TrilhasStaticDataSource implements TrilhasDataSource {
  async listarTrilhas(): Promise<Trilha[]> {
    // Retorna trilhas ordenadas por camada e ordem
    return [...TRILHAS_MOCK].sort((a, b) => {
      const camadaOrder = { 'onboarding': 0, 'fundamentos-ts': 1, 'bindings-diretivas': 2, 'reatividade-forms': 3, 'arquitetura': 4 };
      const camadaDiff = (camadaOrder[a.camada] || 99) - (camadaOrder[b.camada] || 99);
      if (camadaDiff !== 0) return camadaDiff;
      return a.ordem - b.ordem;
    });
  }

  async obterTrilhaPorId(id: string): Promise<Trilha | undefined> {
    return TRILHAS_MOCK.find(t => t.id === id);
  }

  async listarLicoes(): Promise<Licao[]> {
    return LICOES_MOCK;
  }

  async obterLicaoPorId(id: string): Promise<Licao | undefined> {
    return LICOES_MOCK.find(l => l.id === id);
  }
}
