import { ChangeDetectionStrategy, Component, computed, effect, output, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-signals-effect',
  imports: [FormsModule],
  templateUrl: './demo-signals-effect.component.html',
  styleUrl: './demo-signals-effect.component.scss',
})
export class DemoSignalsEffectComponent {
  readonly tema      = signal<'dark' | 'light'>('dark');
  readonly volume    = signal(50);
  readonly itemCount = signal(3);

  readonly logTema   = signal<string[]>([]);
  readonly logVolume = signal<string[]>([]);
  readonly execCount = signal(0);

  readonly totalItems = computed(() => this.itemCount() + 10);
  readonly codeChange = output<CodeFile[]>();

  constructor() {
    // Effect 1: tracks tema changes — demonstrates reactive side effect
    effect(() => {
      const t = this.tema();
      untracked(() => {
        this.logTema.update(l => [`→ tema mudou para: "${t}"`, ...l].slice(0, 5));
        this.execCount.update(c => c + 1);
      });
    });

    // Effect 2: tracks volume — demonstrates multiple effects
    effect(() => {
      const v = this.volume();
      untracked(() => {
        this.logVolume.update(l => [`→ volume: ${v}%`, ...l].slice(0, 5));
      });
    });

    // Effect 3: emits code panel content
    effect(() => {
      const t = this.tema(), v = this.volume();
      this.codeChange.emit([{
        name: 'signals-effect.ts', language: 'typescript',
        content: `import { signal, effect, untracked } from '@angular/core';

// effect() executa um callback sempre que qualquer
// Signal LIDO dentro dele mudar

const tema  = signal<'dark'|'light'>('${t}');
const count = signal(0);

// ── 1. Effect básico ──────────────────────────────────────
effect(() => {
  console.log('tema atual:', tema());
  // Executa imediatamente + toda vez que tema() mudar
});

// ── 2. untracked() — ler sem criar dependência ────────────
effect(() => {
  const novoTema = tema();          // ← RASTREADO
  const val = untracked(() => count()); // ← não rastreado
  document.body.dataset['tema'] = novoTema;
});

// ── 3. Cleanup ────────────────────────────────────────────
effect((onCleanup) => {
  const id = setInterval(() => console.log(tema()), 1000);
  onCleanup(() => clearInterval(id)); // ← chamado antes do próximo run
});

// ── Regra: NÃO escreva em Signals dentro de effect()
// Use computed() para derivar valores, effect() para
// sincronizar com sistemas externos (localStorage, DOM, etc.)`,
      }]);
    });
  }
}
