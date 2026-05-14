import { ChangeDetectionStrategy, Component, computed, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-array-reduce',
  imports: [FormsModule],
  templateUrl: './demo-array-reduce.component.html',
  styleUrl: './demo-array-reduce.component.scss',
})
export class DemoArrayReduceComponent {
  readonly BASE = [12, 8, 35, 4, 21, 16] as const;
  readonly LETRAS = ['a', 'b', 'a', 'c', 'a', 'b', 'c', 'c'] as const;

  readonly soma      = computed(() => this.BASE.reduce((acc, n) => acc + n, 0));
  readonly maximo    = computed(() => this.BASE.reduce((max, n) => n > max ? n : max, -Infinity));
  readonly minimo    = computed(() => this.BASE.reduce((min, n) => n < min ? n : min, Infinity));
  readonly contagem  = computed(() => {
    return this.LETRAS.reduce<Record<string, number>>((acc, l) => ({
      ...acc, [l]: (acc[l] ?? 0) + 1
    }), {});
  });

  readonly contagemEntries = computed(() => Object.entries(this.contagem()));

  readonly codeChange = output<CodeFile[]>();

  constructor() {
    effect(() => {
      this.codeChange.emit([{
        name: 'array-reduce.ts', language: 'typescript',
        content: `// reduce() → acumula todos os itens em um único valor de qualquer tipo

const nums = [12, 8, 35, 4, 21, 16];

// ── 1. Soma ───────────────────────────────────────────────
const soma = nums.reduce((acc, n) => acc + n, 0);
// ${this.soma()}

// ── 2. Máximo e Mínimo ────────────────────────────────────
const max = nums.reduce((m, n) => n > m ? n : m, -Infinity);
// ${this.maximo()}
const min = nums.reduce((m, n) => n < m ? n : m, Infinity);
// ${this.minimo()}

// ── 3. Contar ocorrências ─────────────────────────────────
const letras = ['a','b','a','c','a','b','c','c'];
const contagem = letras.reduce<Record<string, number>>(
  (acc, l) => ({ ...acc, [l]: (acc[l] ?? 0) + 1 }),
  {}
);
// { a: 3, b: 2, c: 3 }

// ── 4. reduce pode fazer tudo que map+filter fazem ────────
// Mas prefira map/filter quando possível — são mais legíveis
const pares = nums.reduce<number[]>(
  (acc, n) => n % 2 === 0 ? [...acc, n * 2] : acc,
  []
);
// [16, 8, 32]  ← equivale a .filter(par).map(dobro)`,
      }]);
    });
  }
}
