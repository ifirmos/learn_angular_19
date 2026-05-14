import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { TagModule } from 'primeng/tag';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-bindings-basicos',
  imports: [FormsModule, CardModule, InputTextModule, SliderModule, TagModule],
  templateUrl: './demo-bindings-basicos.component.html',
  styleUrl: './demo-bindings-basicos.component.scss',
})
export class DemoBindingsBasicosComponent {
  texto = signal('Angular 21');
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
