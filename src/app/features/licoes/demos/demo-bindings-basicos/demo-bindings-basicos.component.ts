import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-demo-bindings-basicos',
  imports: [CommonModule, FormsModule, InputTextModule, CardModule],
  template: `
    <div class="demo-bindings-basicos">
      <p-card header="Demo: Bindings Básicos">
        <div class="demo-controls">
          <label for="nome">Digite seu nome:</label>
          <input
            id="nome"
            type="text"
            pInputText
            [ngModel]="nome()"
            (ngModelChange)="nome.set($event)"
            placeholder="Ex.: Ana"
          />
        </div>

        <div class="demo-result">
          <p>Interpolação simples:</p>
          <p class="resultado">{{ saudacao() }}</p>
        </div>

        <small class="demo-tip">
          Dica: altere o texto e observe o binding atualizar em tempo real.
        </small>
      </p-card>
    </div>
  `,
})
export class DemoBindingsBasicosComponent {
  readonly nome = signal<string>('');
  readonly saudacao = computed(() =>
    this.nome().trim()
      ? `Olá, ${this.nome()}!`
      : 'Digite seu nome acima.',
  );
}
