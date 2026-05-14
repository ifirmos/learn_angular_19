import { ChangeDetectionStrategy, Component, computed, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-componentes-comunicacao',
  imports: [FormsModule],
  templateUrl: './demo-componentes-comunicacao.component.html',
  styleUrl: './demo-componentes-comunicacao.component.scss',
})
export class DemoComponentesComunicacaoComponent {
  // Simula o estado do "pai"
  readonly titulo    = signal('Produto Destaque');
  readonly preco     = signal(199);
  readonly estoque   = signal(10);

  // Captura eventos emitidos pelo "filho"
  readonly comprasLog = signal<string[]>([]);
  readonly totalVendas = computed(() =>
    this.comprasLog().reduce((s, e) => s + (e.includes('→') ? Number(e.split('→')[1].replace(/\D/g, '')) : 0), 0)
  );

  // Simula o filho comprando
  simularCompra() {
    if (this.estoque() <= 0) return;
    this.estoque.update(e => e - 1);
    this.comprasLog.update(l =>
      [`→ R$ ${this.preco()} vendido`, ...l].slice(0, 5)
    );
  }

  readonly codeChange = output<CodeFile[]>();

  constructor() {
    effect(() => {
      const t = this.titulo(), p = this.preco();
      this.codeChange.emit([{
        name: 'componentes-comunicacao.ts', language: 'typescript',
        content: `// ── Componente Filho ─────────────────────────────────────
@Component({ selector: 'app-produto-card', ... })
export class ProdutoCardComponent {
  // input() → pai envia dados ao filho
  titulo = input.required<string>();
  preco  = input<number>(0);
  estoque = input<number>(0);

  // output() → filho notifica o pai
  comprar = output<{ titulo: string; preco: number }>();

  onComprar() {
    this.comprar.emit({ titulo: this.titulo(), preco: this.preco() });
  }
}

// ── Componente Pai ────────────────────────────────────────
@Component({ ... })
export class AppComponent {
  titulo = signal('${t}');
  preco  = signal(${p});

  onCompra(evento: { titulo: string; preco: number }) {
    console.log('Compra recebida:', evento);
  }
}`,
      }, {
        name: 'componentes-comunicacao.html', language: 'html',
        content: `<!-- Template do componente pai -->
<app-produto-card
  [titulo]="titulo()"
  [preco]="preco()"
  [estoque]="estoque()"
  (comprar)="onCompra($event)"
/>`,
      }]);
    });
  }
}
