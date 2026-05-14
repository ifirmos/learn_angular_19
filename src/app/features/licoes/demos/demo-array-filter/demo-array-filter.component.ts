import { ChangeDetectionStrategy, Component, computed, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-array-filter',
  imports: [FormsModule],
  templateUrl: './demo-array-filter.component.html',
  styleUrl: './demo-array-filter.component.scss',
})
export class DemoArrayFilterComponent {
  readonly BASE_NUMS   = [5, 15, 30, 45, 60, 75, 90] as const;
  readonly PALAVRAS    = ['angular', 'alpine', 'react', 'astro', 'vue', 'atom'] as const;
  readonly PRODUTOS    = [
    { nome: 'Starter', preco: 49 }, { nome: 'Pro', preco: 79 },
    { nome: 'Business', preco: 129 }, { nome: 'Enterprise', preco: 199 },
  ] as const;

  readonly limiar    = signal(30);
  readonly prefixo   = signal('a');
  readonly maxPreco  = signal(100);

  readonly numsFiltrados     = computed(() => this.BASE_NUMS.filter(n => n >= this.limiar()));
  readonly palavrasFiltradas = computed(() => this.PALAVRAS.filter(s => s.startsWith(this.prefixo())));
  readonly prodsFiltrados    = computed(() => this.PRODUTOS.filter(p => p.preco <= this.maxPreco()));

  readonly codeChange = output<CodeFile[]>();

  constructor() {
    effect(() => {
      const L = this.limiar(), P = this.prefixo(), MP = this.maxPreco();
      const numRes  = [5,15,30,45,60,75,90].filter(n => n >= L);
      const strRes  = ['angular','alpine','react','astro','vue','atom'].filter(s => s.startsWith(P));
      this.codeChange.emit([{
        name: 'array-filter.ts', language: 'typescript',
        content: `// filter() → retorna subconjunto; tamanho pode ser menor que o original

// ── 1. Filtrar números ────────────────────────────────────
const nums = [5, 15, 30, 45, 60, 75, 90];
const limiar = signal(${L});

const resultado = computed(() =>
  nums.filter(n => n >= limiar())
);
// [${numRes.join(', ')}]  ← ${numRes.length} de ${this.BASE_NUMS.length} elementos

// ── 2. Filtrar strings por prefixo ───────────────────────
const palavras = ['angular','alpine','react','astro','vue','atom'];
const filtradas = palavras.filter(s => s.startsWith('${P}'));
// [${strRes.map(s => `'${s}'`).join(', ')}]

// ── 3. Filtrar objetos por propriedade ───────────────────
const produtos = [{ preco: 49 }, { preco: 79 }, { preco: 129 }, { preco: 199 }];
const baratos  = produtos.filter(p => p.preco <= ${MP});

// ── 4. map vs filter ─────────────────────────────────────
const arr = [1, 2, 3, 4, 5];
arr.map(n => n * 2);          // [2,4,6,8,10] ← MESMO tamanho
arr.filter(n => n % 2 === 0); // [2,4]        ← MENOR tamanho`,
      }]);
    });
  }
}
