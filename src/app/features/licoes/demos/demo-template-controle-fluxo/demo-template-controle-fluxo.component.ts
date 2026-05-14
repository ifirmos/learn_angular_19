import { ChangeDetectionStrategy, Component, computed, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-template-controle-fluxo',
  imports: [FormsModule],
  templateUrl: './demo-template-controle-fluxo.component.html',
  styleUrl: './demo-template-controle-fluxo.component.scss',
})
export class DemoTemplateControleFluxoComponent {
  readonly mostrar    = signal(true);
  readonly status     = signal<'ativo' | 'pausado' | 'erro'>('ativo');
  readonly novoItem   = signal('');
  readonly itens      = signal(['Angular', 'TypeScript', 'RxJS']);

  readonly statusList = ['ativo', 'pausado', 'erro'] as const;

  addItem() {
    const v = this.novoItem().trim();
    if (v) {
      this.itens.update(l => [...l, v]);
      this.novoItem.set('');
    }
  }

  removeItem(idx: number) {
    this.itens.update(l => l.filter((_, i) => i !== idx));
  }

  readonly codeChange = output<CodeFile[]>();

  constructor() {
    effect(() => {
      const s = this.status(), m = this.mostrar(), items = this.itens();
      this.codeChange.emit([{
        name: 'controle-fluxo.html', language: 'html',
        content: `<!-- ── @if / @else ────────────────────────────────────── -->
@if (mostrar()) {
  <p>Visível!</p>
} @else {
  <p>Oculto</p>
}

<!-- ── @for com track ────────────────────────────────── -->
@for (item of itens(); track item) {
  <li>{{ item }}</li>
} @empty {
  <li>Lista vazia</li>
}

<!-- ── @switch / @case / @default ───────────────────── -->
@switch (status()) {
  @case ('ativo')    { <span class="verde">● Ativo</span>    }
  @case ('pausado')  { <span class="laranja">⏸ Pausado</span> }
  @case ('erro')     { <span class="vermelho">✕ Erro</span>    }
  @default           { <span>Desconhecido</span>               }
}`,
      }]);
    });
  }
}
