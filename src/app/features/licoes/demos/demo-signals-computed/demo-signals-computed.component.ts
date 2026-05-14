import { ChangeDetectionStrategy, Component, computed, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-signals-computed',
  imports: [FormsModule],
  templateUrl: './demo-signals-computed.component.html',
  styleUrl: './demo-signals-computed.component.scss',
})
export class DemoSignalsComputedComponent {
  readonly preco     = signal(100);
  readonly qtd       = signal(3);
  readonly desconto  = signal(10); // %
  readonly frete     = signal(20);

  // ── chain of computed ────────────────────────────────────────────────────
  readonly subtotal        = computed(() => this.preco() * this.qtd());
  readonly valorDesconto   = computed(() => this.subtotal() * this.desconto() / 100);
  readonly totalSemFrete   = computed(() => this.subtotal() - this.valorDesconto());
  readonly totalFinal      = computed(() => this.totalSemFrete() + this.frete());
  readonly categoria       = computed(() => this.totalFinal() >= 300 ? 'Premium' : this.totalFinal() >= 150 ? 'Padrão' : 'Básico');

  readonly codeChange = output<CodeFile[]>();

  constructor() {
    effect(() => {
      const p = this.preco(), q = this.qtd(), d = this.desconto(), f = this.frete();
      this.codeChange.emit([{
        name: 'signals-computed.ts', language: 'typescript',
        content: `import { signal, computed } from '@angular/core';

// Signals de entrada
const preco    = signal(${p});
const qtd      = signal(${q});
const desconto = signal(${d}); // %
const frete    = signal(${f});

// ── computed encadeados ───────────────────────────────────
const subtotal      = computed(() => preco() * qtd());
// ${this.subtotal()}

const valDesc       = computed(() => subtotal() * desconto() / 100);
// ${this.valorDesconto().toFixed(2)}

const totalSemFrete = computed(() => subtotal() - valDesc());
// ${this.totalSemFrete().toFixed(2)}

const totalFinal    = computed(() => totalSemFrete() + frete());
// ${this.totalFinal().toFixed(2)}

const categoria     = computed(() =>
  totalFinal() >= 300 ? 'Premium' :
  totalFinal() >= 150 ? 'Padrão'  : 'Básico'
);
// '${this.categoria()}'

// computed() é lazy e memorizado:
// só recalcula quando um Signal lido muda`,
      }]);
    });
  }
}
