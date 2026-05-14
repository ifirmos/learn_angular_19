import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface CodeFile {
  name: string;
  language: string;
  content: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-tipos-primitivos',
  imports: [FormsModule],
  templateUrl: './demo-tipos-primitivos.component.html',
  styleUrl: './demo-tipos-primitivos.component.scss',
})
export class DemoTiposPrimitivosComponent {
  // Bloco 1 — string
  readonly nome    = signal('TypeScript');
  readonly nomeLen = computed(() => this.nome().length);
  readonly nomeUp  = computed(() => this.nome().toUpperCase());

  // Bloco 2 — number
  readonly preco      = signal(49.9);
  readonly precoRound = computed(() => Math.round(this.preco()));
  readonly precoFixed = computed(() => this.preco().toFixed(2));

  // Bloco 3 — boolean
  readonly ativo    = signal(true);
  readonly ativoMsg = computed(() => this.ativo() ? 'Ligado ✓' : 'Desligado ✗');

  // Bloco 4 — Inferência
  readonly infTexto = signal('Angular');

  readonly codeChange = output<CodeFile[]>();

  constructor() {
    effect(() => {
      const s = this.nome();
      const n = this.preco();
      const b = this.ativo();
      this.codeChange.emit([
        {
          name: 'tipos-primitivos.ts',
          language: 'typescript',
          content: `// ── 1. string ───────────────────────────────────────────
const nome: string = '${s}';

nome.length;        // ${s.length}
nome.toUpperCase(); // '${s.toUpperCase()}'

// ── 2. number ───────────────────────────────────────────
const preco: number = ${n};

Math.round(preco);  // ${Math.round(n)}
preco.toFixed(2);   // '${n.toFixed(2)}'

// ── 3. boolean ──────────────────────────────────────────
const ativo: boolean = ${b};

ativo ? 'Ligado' : 'Desligado'; // '${b ? 'Ligado' : 'Desligado'}'

// ── 4. Inferência de tipo ────────────────────────────────
let texto   = 'Angular'; // TypeScript infere: string
let versao  = 19;        // TypeScript infere: number
let visivel = true;      // TypeScript infere: boolean

// ❌ erro detectado pelo compilador (antes de executar):
// texto = 42;
// → Type 'number' is not assignable to type 'string'`,
        },
      ]);
    });
  }
}

