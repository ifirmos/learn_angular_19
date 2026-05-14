import { ChangeDetectionStrategy, Component, computed, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-signals-basicos',
  imports: [FormsModule],
  templateUrl: './demo-signals-basicos.component.html',
  styleUrl: './demo-signals-basicos.component.scss',
})
export class DemoSignalsBasicosComponent {
  // ── writable signals ────────────────────────────────────────────────────────
  readonly contador = signal(0);
  readonly nome     = signal('Angular');
  readonly preco    = signal(100);

  // ── derived (computed) ─────────────────────────────────────────────────────
  readonly dobro = computed(() => this.preco() * 2);

  // ── history for "update()" demo ────────────────────────────────────────────
  readonly historico = signal<number[]>([0]);

  increment() {
    this.contador.update(v => v + 1);
    this.historico.update(h => [...h.slice(-4), this.contador()]);
  }

  decrement() {
    this.contador.update(v => v - 1);
    this.historico.update(h => [...h.slice(-4), this.contador()]);
  }

  resetContador() {
    this.contador.set(0);
    this.historico.set([0]);
  }

  readonly codeChange = output<CodeFile[]>();

  constructor() {
    effect(() => {
      const c = this.contador(), n = this.nome(), p = this.preco();
      this.codeChange.emit([{
        name: 'signals-basicos.ts', language: 'typescript',
        content: `import { signal, computed, effect } from '@angular/core';

// ── 1. Criar e ler um Signal ──────────────────────────────
const contador = signal(${c});
console.log(contador()); // ${c}  ← invocar como função

// ── 2. .set() — substituir valor ─────────────────────────
contador.set(10);
console.log(contador()); // 10

// ── 3. .update() — transformar com base no valor atual ───
contador.update(v => v + 1);
console.log(contador()); // 11

// ── 4. computed() — Signal derivado (somente leitura) ─────
const preco = signal(${p});
const dobro = computed(() => preco() * 2);
console.log(dobro()); // ${this.dobro()}

// Signals são reativos: quando preco muda,
// dobro recalcula automaticamente na próxima leitura.`,
      }]);
    });
  }
}
