import { ChangeDetectionStrategy, Component, effect, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-bindings-editor-preview',
  imports: [FormsModule],
  templateUrl: './demo-bindings-editor-preview.component.html',
  styleUrl: './demo-bindings-editor-preview.component.scss'
})
export class DemoBindingsEditorPreviewComponent {
  // Signals
  readonly titulo = signal<string>('Curso de Angular 21');
  readonly descricao = signal<string>('Aprenda os conceitos fundamentais do framework.');
  readonly nivel = signal<'Iniciante' | 'Intermediário' | 'Avançado'>('Iniciante');
  readonly cargaHoraria = signal<number>(20);
  readonly isNovo = signal<boolean>(true);
  readonly favorito = signal<boolean>(false);
  readonly tema = signal<'light' | 'dark'>('light');

  readonly codeChange = output<CodeFile[]>();

  constructor() {
    effect(() => {
      this.emitirCodigo();
    });
  }

  toggleFavorito() {
    this.favorito.update(v => !v);
  }

  alternarTema() {
    this.tema.update(t => t === 'light' ? 'dark' : 'light');
  }

  private emitirCodigo() {
    this.codeChange.emit([
      {
        name: 'TypeScript',
        language: 'typescript',
        content: `// Signals controlando o estado da view
titulo = signal('${this.titulo()}');
nivel = signal('${this.nivel()}');
tema = signal('${this.tema()}');
favorito = signal(${this.favorito()});

toggleFavorito() {
  this.favorito.update(v => !v);
}`
      },
      {
        name: 'HTML',
        language: 'html',
        content: `<!-- 1. Property Binding [class] e [style] -->
<div class="card" 
     [class.theme-dark]="tema() === 'dark'">

  <!-- 2. Event Binding (click) + Property [class.ativo] -->
  <button (click)="toggleFavorito()" 
          [class.ativo]="favorito()">
    ♥
  </button>

  <!-- 3. Interpolação {{ }} -->
  <h3>{{ titulo() }}</h3>
  <span class="badge">{{ nivel() }}</span>
</div>`
      },
      {
        name: 'CSS',
        language: 'css',
        content: `.card {
  transition: all 0.3s ease;
  background: white;
}

.theme-dark {
  background: #1f2937;
  color: white;
}

.btn-favorito.ativo {
  color: red; /* Cor do coração quando favoritado */
}`
      }
    ]);
  }
}
