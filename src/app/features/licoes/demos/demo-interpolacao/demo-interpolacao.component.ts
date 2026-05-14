import { ChangeDetectionStrategy, Component, computed, effect, output, signal } from '@angular/core';
import { CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';
import { FormsModule } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-interpolacao',
  imports: [FormsModule],
  templateUrl: './demo-interpolacao.component.html',
  styleUrl: './demo-interpolacao.component.scss'
})
export class DemoInterpolacaoComponent {
  // ── Signals para cada cenário ──
  readonly nome  = signal('Angular 21');
  readonly numA  = signal(42);
  readonly numB  = signal(8);
  readonly texto = signal('angular');
  readonly ativo = signal(true);

  readonly soma = computed(() => this.numA() + this.numB());

  readonly codeChange = output<CodeFile[]>();

  constructor() {
    effect(() => {
      const n  = this.nome();
      const a  = this.numA(), b = this.numB();
      const t  = this.texto();
      const ok = this.ativo();

      this.codeChange.emit([
        {
          name: 'TypeScript',
          language: 'typescript',
          content: `import { Component, signal, computed } from '@angular/core';

@Component({ selector: 'app-exemplo', template: '...' })
export class ExemploComponent {
  // ① Variável – nome() no template exibe o valor atual
  nome = signal('${n}');

  // ② Expressão – signals numéricos
  a    = signal(${a});
  b    = signal(${b});
  // computed: derivado de a() e b(), atualiza automaticamente
  soma = computed(() => this.a() + this.b()); // = ${a + b}

  // ③ Método – qualquer método JS pode ser chamado em {{ }}
  texto = signal('${t}');

  // ④ Ternário – lógica condicional simples
  ativo = signal(${ok});
}`
        },
        {
          name: 'HTML',
          language: 'html',
          content: `<!-- ① Variável: exibe o valor do signal diretamente -->
<p>{{ nome() }}</p>

<!-- ② Expressão: operações JS diretamente no template -->
<p>{{ a() + b() }}</p>
<!-- prefira computed para operações reutilizadas: -->
<p>{{ soma() }}</p>

<!-- ③ Método: chame métodos de string, array, etc. -->
<p>{{ texto().toUpperCase() }}</p>
<p>Caracteres: {{ texto().length }}</p>

<!-- ④ Ternário: lógica condicional simples -->
<p>{{ ativo() ? 'Ativo ✓' : 'Inativo ✗' }}</p>

<!-- ⚠️ Evite lógica complexa em {{ }} -->
<!-- ❌ {{ items().filter(i => i.ok).sort(...).slice(0, 3) }} -->
<!-- ✅ Mova isso para um computed() no componente!         -->`
        }
      ]);
    });
  }
}
