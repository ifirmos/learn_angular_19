import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-bindings-editor-preview',
  imports: [FormsModule],
  templateUrl: './bindings-editor-preview.component.html',
  styleUrl: './bindings-editor-preview.component.scss'
})
export class DemoBindingsEditorPreviewComponent {
  // Signals para o estado da demo
  titulo = signal('Fundamentos de Angular');
  nivel = signal<'Iniciante' | 'Intermediário' | 'Avançado'>('Iniciante');
  horas = signal(12);
  ativo = signal(true);
  destaque = signal(true);
  favorito = signal(false);

  // Computed para propriedades derivadas
  badgeVariant = computed(() => {
    switch (this.nivel()) {
      case 'Iniciante': return 'success';
      case 'Intermediário': return 'warning';
      case 'Avançado': return 'error'; // ou uma cor específica para avançado
      default: return 'default';
    }
  });

  // Actions
  toggleFavorito() {
    this.favorito.update(v => !v);
  }

  resetar() {
    this.titulo.set('Fundamentos de Angular');
    this.nivel.set('Iniciante');
    this.horas.set(12);
    this.ativo.set(true);
    this.destaque.set(true);
    this.favorito.set(false);
  }
}
