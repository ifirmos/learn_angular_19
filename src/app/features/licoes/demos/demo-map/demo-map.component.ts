import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';

type StringTransform = 'upper' | 'lower' | 'length';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-map',
  imports: [FormsModule],
  templateUrl: './demo-map.component.html',
  styleUrl: './demo-map.component.scss',
})
export class DemoMapComponent {
  // ── Card 1: números ──────────────────────────────────────────────────────
  readonly fator = signal(3);
  readonly BASE_NUMS = [10, 20, 30, 40, 50] as const;
  readonly numsMapped = computed(() =>
    this.BASE_NUMS.map(n => n * this.fator())
  );

  // ── Card 2: strings ──────────────────────────────────────────────────────
  readonly transformacao = signal<StringTransform>('upper');
  readonly PALAVRAS = ['angular', 'typescript', 'signals', 'computed'] as const;
  readonly strPairs = computed(() => {
    const t = this.transformacao();
    return this.PALAVRAS.map(s => ({
      orig: s,
      mapped: t === 'upper' ? s.toUpperCase()
            : t === 'lower' ? s.toLowerCase()
            : String(s.length),
    }));
  });

  // ── Card 3: objetos ──────────────────────────────────────────────────────
  readonly desconto = signal(20);
  readonly PRODUTOS = [
    { nome: 'Angular', preco: 120 },
    { nome: 'TypeScript', preco: 90 },
    { nome: 'RxJS', preco: 60 },
  ] as const;
  readonly prodPairs = computed(() => {
    const mult = 1 - this.desconto() / 100;
    return this.PRODUTOS.map(p => ({
      nome: p.nome,
      precoOrig: p.preco,
      precoNovo: +(p.preco * mult).toFixed(2),
    }));
  });

  // ── Código sincronizado ──────────────────────────────────────────────────
  readonly codeChange = output<CodeFile[]>();

  constructor() {
    effect(() => {
      const f = this.fator();
      const t = this.transformacao();
      const d = this.desconto();
      const numRes = [10, 20, 30, 40, 50].map(n => n * f);
      const strFn = t === 'upper' ? 's.toUpperCase()'
                  : t === 'lower' ? 's.toLowerCase()'
                  : 's.length';
      const strRes = this.strPairs().map(p => p.mapped);

      this.codeChange.emit([
        {
          name: 'array-map.ts',
          language: 'typescript',
          content: `// map() → transforma cada item, retorna novo array (mesmo tamanho)

// ── 1. Transformar números ────────────────────────────────
const nums = [10, 20, 30, 40, 50];
const fator = signal(${f});

const resultado = computed(() =>
  nums.map(n => n * fator())
);
// resultado(): [${numRes.join(', ')}]

// ── 2. Transformar strings ────────────────────────────────
const palavras = ['angular', 'typescript', 'signals', 'computed'];

const transformado = palavras.map(s => ${strFn});
// [${strRes.map(v => `'${v}'`).join(', ')}]

// ── 3. Transformar objetos ────────────────────────────────
interface Produto { nome: string; preco: number; }

const desconto = signal(${d}); // ${d}%

const comDesconto = computed(() =>
  produtos.map(p => ({
    ...p,
    preco: +(p.preco * (1 - desconto() / 100)).toFixed(2)
  }))
);

// ── 4. Imutabilidade ─────────────────────────────────────
const original = [1, 2, 3];
const dobrado  = original.map(n => n * 2);

console.log(original); // [1, 2, 3] ← array original intacto
console.log(dobrado);  // [2, 4, 6] ← novo array`,
        },
      ]);
    });
  }
}
