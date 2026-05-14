import { ChangeDetectionStrategy, Component, computed, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';

type Status = 'ativo' | 'pausado' | 'concluido' | 'erro';
type Tamanho = 'P' | 'M' | 'G' | 'GG';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-ts-tipos-union',
  imports: [FormsModule],
  templateUrl: './demo-ts-tipos-union.component.html',
  styleUrl: './demo-ts-tipos-union.component.scss',
})
export class DemoTsTiposUnionComponent {
  readonly entrada    = signal<string>('42');
  readonly status     = signal<Status>('ativo');
  readonly tamanho    = signal<Tamanho>('M');
  readonly opcional   = signal<string>('');
  readonly tentativa  = signal<string>('');

  readonly statusList: Status[]   = ['ativo', 'pausado', 'concluido', 'erro'];
  readonly tamanhoList: Tamanho[] = ['P', 'M', 'G', 'GG'];

  readonly tamanhoEntries = [
    { key: 'P'  as Tamanho, val: 29  },
    { key: 'M'  as Tamanho, val: 49  },
    { key: 'G'  as Tamanho, val: 79  },
    { key: 'GG' as Tamanho, val: 119 },
  ] as const;

  readonly tipoAtual = computed<'number' | 'string' | 'vazio'>(() => {
    const v = this.entrada();
    if (v === '') return 'vazio';
    return isNaN(Number(v)) ? 'string' : 'number';
  });

  readonly guardResult = computed(() => {
    const v = this.entrada();
    if (v === '') return 'entrada vazia';
    if (!isNaN(Number(v))) return `number → dobro: ${Number(v) * 2}`;
    return `string → maiúsculas: "${v.toUpperCase()}"`;
  });

  readonly opcionalResult = computed(() => {
    const v = this.opcional().trim();
    return v === '' ? 'undefined (sem valor)' : `"${v}"`;
  });

  readonly tentativaValida = computed(() =>
    (this.statusList as string[]).includes(this.tentativa())
  );

  readonly tamanhoPreco = computed(() => {
    const mapa: Record<Tamanho, number> = { P: 29, M: 49, G: 79, GG: 119 };
    return mapa[this.tamanho()];
  });

  readonly recordKeys    = signal<Set<Tamanho>>(new Set<Tamanho>(['P', 'M', 'G', 'GG']));
  readonly recordValido  = computed(() => this.tamanhoList.every(k => this.recordKeys().has(k)));
  readonly recordFaltando = computed(() => this.tamanhoList.filter(k => !this.recordKeys().has(k)));

  toggleRecordKey(key: Tamanho): void {
    this.recordKeys.update(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }

  readonly codeChange = output<CodeFile[]>();

  constructor() {
    effect(() => {
      const s = this.status(), t = this.tamanho();
      const e = this.entrada(), o = this.opcional().trim() || undefined;
      const tv = this.tentativa();
      const tvValid = (this.statusList as string[]).includes(tv);
      const guardEx = e === '' ? 'entrada vazia'
        : !isNaN(Number(e)) ? `dobro: ${Number(e) * 2}`
        : `maiúsculas: "${e.toUpperCase()}"`;
      const tvLine = tv === ''
        ? `// (nenhum valor tentado ainda)`
        : tvValid
          ? `let s2: Status = '${tv}'; // ✓ válido`
          : `let s2: Status = '${tv}';\n// TS2322: Type '"${tv}"' is not assignable\n//         to type 'Status'`;
      const preco = ({ P: 29, M: 49, G: 79, GG: 119 } as Record<string, number>)[t];
      const rk = this.recordKeys();
      const allKeys: Tamanho[] = ['P', 'M', 'G', 'GG'];
      const allPrecos: Record<Tamanho, number> = { P: 29, M: 49, G: 79, GG: 119 };
      const recordLines = allKeys
        .map(k => rk.has(k) ? `  ${k}: ${allPrecos[k]},   // ✓` : `  // ${k}: ???  ← FALTANDO!`)
        .join('\n');
      const faltando = allKeys.filter(k => !rk.has(k));
      const recordStatus = faltando.length === 0
        ? `// ✓ Record completo — TypeScript aprovado`
        : `// TS2741: Property '${faltando.join("', '")}' is missing\n// in type 'Record<Tamanho, number>'`;
      this.codeChange.emit([{
        name: 'tipos-union.ts', language: 'typescript',
        content: `// ── 1. string | number + Type Guard ──────────────────────
function processar(val: string | number): string {
  if (typeof val === 'number') return \`dobro: \${val * 2}\`;
  return \`maiúsculas: \${val.toUpperCase()}\`;
}
// Entrada: "${e}" → ${guardEx}

// ── 2. Literal Union (apenas valores conhecidos) ──────────
type Status = 'ativo' | 'pausado' | 'concluido' | 'erro';
let status: Status = '${s}'; // ✓ TypeScript valida em compile-time

// ── 3. Tentando um valor fora da union ────────────────────
${tvLine}

// ── 4. Tipo opcional  (string | undefined) ───────────────
function saudar(nome?: string): string {
  if (nome === undefined) return 'Olá, visitante!';
  return \`Olá, \${nome}!\`;
}
// nome = ${o === undefined ? 'undefined' : `"${o}"`}  →  ${o === undefined ? 'Olá, visitante!' : `Olá, ${o}!`}

// ── 5. Record<K, V> — todas as chaves são obrigatórias ────
type Tamanho = 'P' | 'M' | 'G' | 'GG';
const precos: Record<Tamanho, number> = {
${recordLines}
};
${recordStatus}`,
      }]);
    });
  }
}
