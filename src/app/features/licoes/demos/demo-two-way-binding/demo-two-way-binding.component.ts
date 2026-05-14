import { ChangeDetectionStrategy, Component, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-two-way-binding',
  imports: [FormsModule],
  templateUrl: './demo-two-way-binding.component.html',
  styleUrl: './demo-two-way-binding.component.scss',
})
export class DemoTwoWayBindingComponent {
  // two-way with ngModel (uses regular mutable fields for simplicity)
  nomeModel    = 'Angular';
  idadeModel   = 21;
  nivelModel   = 'iniciante';
  textoManual  = '';

  readonly nivelList = ['iniciante', 'intermediário', 'avançado'];

  // reactive mirror of textoManual for code panel
  readonly textoSig = signal('');

  readonly codeChange = output<CodeFile[]>();

  constructor() {
    effect(() => {
      this.codeChange.emit([{
        name: 'two-way-binding.html', language: 'html',
        content: `<!-- ── 1. [(ngModel)] — açúcar sintático ──────────────── -->
<!-- Requer: imports: [FormsModule] no componente          -->
<input [(ngModel)]="nomeModel" />
<p>Olá, {{ nomeModel }}!</p>

<!-- ── 2. Sintaxe equivalente explícita ───────────────── -->
<input
  [ngModel]="textoManual"
  (ngModelChange)="textoManual = $event"
/>

<!-- ── 3. Number input ─────────────────────────────────── -->
<input type="number" [(ngModel)]="idadeModel" />
<p>Idade: {{ idadeModel }}</p>

<!-- ── 4. Select two-way ─────────────────────────────── -->
<select [(ngModel)]="nivelModel">
  @for (n of nivelList; track n) {
    <option [value]="n">{{ n }}</option>
  }
</select>`,
      }]);
    });
  }
}
