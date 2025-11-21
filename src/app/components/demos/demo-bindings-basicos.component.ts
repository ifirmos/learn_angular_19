import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { TagModule } from 'primeng/tag';
import { signal } from '@angular/core';

@Component({
  selector: 'app-demo-bindings-basicos',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, InputTextModule, SliderModule, TagModule],
  template: `
    <div class="demo-grid">
      <p-card header="Controles" class="card-escuro">
        <div class="campo">
          <label for="texto-demo">Texto para interpolar</label>
          <input
            id="texto-demo"
            type="text"
            pInputText
            [value]="texto()"
            (input)="atualizarTexto($any($event.target).value)"
          />
        </div>

        <div class="campo">
          <label for="slider-demo">Tamanho da fonte (px)</label>
          <p-slider
            inputId="slider-demo"
            [min]="14"
            [max]="40"
            [step]="1"
            [ngModel]="tamanhoFonte()"
            (onChange)="atualizarTamanho($any($event.value))"
          ></p-slider>
          <div class="valor-slider">{{ tamanhoFonte() }} px</div>
        </div>
      </p-card>

      <p-card header="Visual" class="card-escuro">
        <div class="preview">
          <p-tag value="Interpolação" severity="info"></p-tag>
          <h2 [style.fontSize.px]="tamanhoFonte()">{{ texto() }}</h2>
          <p>
            Aqui você vê <strong>interpolação</strong> ({{ texto() }}) e <strong>property binding</strong> no tamanho da fonte
            ([style.fontSize.px]="tamanhoFonte()").
          </p>
          <p class="dica">
            Experimente digitar um novo texto ou mover o slider para sentir a reatividade com signals.
          </p>
        </div>
      </p-card>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .demo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 0.75rem;
      }

      .card-escuro ::ng-deep .p-card {
        background: #0b1220;
        border: 1px solid #1f2937;
        color: #e5e7eb;
      }

      .campo {
        display: grid;
        gap: 0.35rem;
        margin-bottom: 0.75rem;
      }

      label {
        font-weight: 600;
        color: #cbd5e1;
      }

      .valor-slider {
        color: #cbd5e1;
      }

      .preview {
        display: grid;
        gap: 0.5rem;
      }

      .dica {
        color: #cbd5e1;
        margin: 0;
      }
    `,
  ],
})
export class DemoBindingsBasicosComponent {
  texto = signal('Angular 19');
  tamanhoFonte = signal(24);

  atualizarTexto(valor: string): void {
    this.texto.set(valor);
  }

  atualizarTamanho(valor: number): void {
    if (typeof valor === 'number') {
      this.tamanhoFonte.set(valor);
    }
  }
}
