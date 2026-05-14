import { ChangeDetectionStrategy, Component, computed, effect, output, signal } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-pipes-builtin',
  imports: [FormsModule, DatePipe, CurrencyPipe, DecimalPipe, TitleCasePipe, UpperCasePipe],
  templateUrl: './demo-pipes-builtin.component.html',
  styleUrl: './demo-pipes-builtin.component.scss',
})
export class DemoPipesBuiltinComponent {
  readonly data      = signal(new Date('2025-07-15T14:30:00'));
  readonly valor     = signal(1234.56);
  readonly numero    = signal(3.14159);
  readonly texto     = signal('angular e typescript');

  readonly dataFormatos = ['dd/MM/yyyy', 'dd MMMM yyyy', 'EEE, dd MMM', 'HH:mm:ss', 'medium'];

  readonly codeChange = output<CodeFile[]>();

  constructor() {
    effect(() => {
      const v = this.valor(), n = this.numero(), t = this.texto();
      this.codeChange.emit([{
        name: 'pipes-builtin.html', language: 'html',
        content: `<!-- Pipes transformam valores SOMENTE para exibição -->
<!-- imports: [DatePipe, CurrencyPipe, DecimalPipe, UpperCasePipe, TitleCasePipe] -->

<!-- ── date ──────────────────────────────────────────── -->
{{ data | date:'dd/MM/yyyy' }}        <!-- 15/07/2025      -->
{{ data | date:'dd MMMM yyyy' }}      <!-- 15 Julho 2025   -->
{{ data | date:'HH:mm' }}             <!-- 14:30           -->

<!-- ── currency ─────────────────────────────────────── -->
{{ ${v} | currency:'BRL':'symbol':'1.2-2' }}   <!-- R$ ${v.toLocaleString('pt-BR',{minimumFractionDigits:2})} -->
{{ ${v} | currency:'USD' }}                    <!-- $${v.toFixed(2)}         -->

<!-- ── number / decimal ──────────────────────────────── -->
{{ ${n} | number:'1.2-2' }}    <!-- ${n.toFixed(2)}    -->
{{ ${n} | number:'1.4-4' }}    <!-- ${n.toFixed(4)}  -->

<!-- ── text ───────────────────────────────────────────── -->
{{ '${t}' | uppercase }}    <!-- ${t.toUpperCase()} -->
{{ '${t}' | titlecase }}    <!-- ${t.replace(/(^|\s)\S/g, l => l.toUpperCase())} -->`,
      }]);
    });
  }
}
