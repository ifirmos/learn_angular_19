import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-bindings-basicos',
  imports: [FormsModule, InputTextModule, CardModule],
  templateUrl: './demo-bindings-basicos.component.html',
})
export class DemoBindingsBasicosComponent {
  readonly nome = signal<string>('');
  readonly saudacao = computed(() =>
    this.nome().trim()
      ? `Olá, ${this.nome()}!`
      : 'Digite seu nome acima.',
  );
}
