import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-demo-bindings-editor-preview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="demo-container">
      <!-- Painel Editor (Esquerda) -->
      <div class="editor-panel">
        <h3 class="panel-title">Editor</h3>
        
        <div class="form-group">
          <label for="titulo">Título do Curso</label>
          <input 
            type="text" 
            id="titulo" 
            [ngModel]="titulo()" 
            (ngModelChange)="titulo.set($event)"
            class="form-input"
            placeholder="Ex: Fundamentos de Angular"
          >
          <span class="hint">Interpolação: {{ '{' + '{ titulo() }' + '}' }}</span>
        </div>

        <div class="form-group">
          <label for="nivel">Nível</label>
          <select 
            id="nivel" 
            [ngModel]="nivel()" 
            (ngModelChange)="nivel.set($event)"
            class="form-select"
          >
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
          <span class="hint">Property Binding: [variant]="..."</span>
        </div>

        <div class="form-group">
          <label for="horas">Carga Horária (horas)</label>
          <input 
            type="range" 
            id="horas" 
            min="1" 
            max="40" 
            [ngModel]="horas()" 
            (ngModelChange)="horas.set($event)"
            class="form-range"
          >
          <div class="range-value">{{ horas() }}h</div>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              [ngModel]="ativo()" 
              (ngModelChange)="ativo.set($event)"
            >
            Curso Ativo
          </label>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              [ngModel]="destaque()" 
              (ngModelChange)="destaque.set($event)"
            >
            Mostrar badge "NOVO"
          </label>
        </div>

        <div class="editor-actions">
          <button class="btn btn-secondary btn-sm" (click)="resetar()">
            Resetar
          </button>
        </div>
      </div>

      <!-- Painel Preview (Direita) -->
      <div class="preview-panel">
        <h3 class="panel-title">Preview</h3>
        
        <div class="card-preview" [class.pausado]="!ativo()">
          <div class="card-header">
            <div class="badges">
              <span class="badge" [class]="'badge-' + badgeVariant()">{{ nivel() }}</span>
              <span class="badge badge-success" *ngIf="destaque()">NOVO</span>
            </div>
            <button 
              class="favorite-btn" 
              [class.active]="favorito()"
              (click)="toggleFavorito()"
              title="Favoritar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [attr.fill]="favorito() ? 'currentColor' : 'none'">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          <div class="card-body">
            <h4 class="card-title">{{ titulo() || 'Sem título' }}</h4>
            <div class="card-meta">
              <span class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                {{ horas() }} horas
              </span>
              <span class="meta-item status" [class.inactive]="!ativo()">
                <span class="status-dot"></span>
                {{ ativo() ? 'Disponível' : 'Pausado' }}
              </span>
            </div>
          </div>

          <div class="card-footer">
            <button class="btn btn-primary btn-md full-width">
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-6);
      background-color: var(--color-bg-surface);
      border: 1px solid var(--color-border-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-6);

      @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
      }
    }

    .panel-title {
      font-size: var(--font-size-h4);
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--spacing-4);
      color: var(--color-text-primary);
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }

    /* Editor Styles */
    .editor-panel {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
      padding-right: var(--spacing-4);
      border-right: 1px solid var(--color-border-default);

      @media (max-width: 767px) {
        padding-right: 0;
        border-right: none;
        border-bottom: 1px solid var(--color-border-default);
        padding-bottom: var(--spacing-6);
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-1);
    }

    label {
      font-size: var(--font-size-caption);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-secondary);
    }

    .form-input, .form-select {
      padding: var(--spacing-2) var(--spacing-3);
      border: 1px solid var(--color-border-default);
      border-radius: var(--radius-md);
      background-color: var(--color-bg-surface-alt);
      color: var(--color-text-primary);
      font-family: inherit;
      transition: border-color var(--transition-fast);

      &:focus {
        outline: none;
        border-color: var(--color-accent-primary);
        box-shadow: 0 0 0 2px rgba(var(--color-accent-primary-rgb), 0.2);
      }
    }

    .form-range {
      width: 100%;
      accent-color: var(--color-accent-primary);
    }

    .range-value {
      font-size: var(--font-size-caption);
      color: var(--color-text-secondary);
      text-align: right;
    }

    .checkbox-group {
      flex-direction: row;
      align-items: center;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      cursor: pointer;
      color: var(--color-text-primary);
    }

    .hint {
      font-size: 11px;
      color: var(--color-text-tertiary);
      font-family: var(--font-family-mono);
    }

    .editor-actions {
      margin-top: auto;
      padding-top: var(--spacing-4);
    }

    /* Preview Styles */
    .preview-panel {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: var(--color-bg-surface-alt); /* Ligeiramente diferente para destacar o card */
      border-radius: var(--radius-md);
      padding: var(--spacing-6);
    }

    .card-preview {
      width: 100%;
      max-width: 320px;
      background-color: var(--color-bg-surface);
      border: 1px solid var(--color-border-default);
      border-radius: var(--radius-lg);
      padding: var(--spacing-5);
      box-shadow: var(--shadow-md);
      transition: all var(--transition-normal);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);

      &.pausado {
        opacity: 0.8;
        filter: grayscale(0.5);
        border-style: dashed;
      }
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .badges {
      display: flex;
      gap: var(--spacing-2);
    }

    .favorite-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-text-tertiary);
      padding: 4px;
      border-radius: 50%;
      transition: all var(--transition-fast);

      &:hover {
        background-color: var(--color-bg-surface-alt);
        color: var(--color-accent-primary);
      }

      &.active {
        color: #ef4444; /* Red for favorite */
      }
    }

    .card-title {
      font-size: var(--font-size-h4);
      font-weight: var(--font-weight-bold);
      margin: 0;
      line-height: 1.3;
    }

    .card-meta {
      display: flex;
      gap: var(--spacing-4);
      margin-top: var(--spacing-2);
      font-size: var(--font-size-caption);
      color: var(--color-text-secondary);
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-1);
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #22c55e; /* Green */
    }

    .status.inactive .status-dot {
      background-color: #f59e0b; /* Amber */
    }

    .full-width {
      width: 100%;
      display: block;
    }

    /* Styles for standard elements replacing UI components */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-md);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: all var(--transition-fast);
      border: 1px solid transparent;
      font-family: inherit;
    }

    .btn-sm {
      padding: var(--spacing-1) var(--spacing-3);
      font-size: var(--font-size-caption);
    }

    .btn-md {
      padding: var(--spacing-2) var(--spacing-4);
      font-size: var(--font-size-body);
    }

    .btn-primary {
      background-color: var(--color-accent-primary);
      color: var(--color-text-inverse);
      
      &:hover {
        opacity: 0.9;
      }
    }

    .btn-secondary {
      background-color: var(--color-bg-surface-alt);
      color: var(--color-text-primary);
      border-color: var(--color-border-default);

      &:hover {
        background-color: var(--color-bg-surface);
        border-color: var(--color-text-secondary);
      }
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 2px 8px;
      border-radius: var(--radius-sm);
      font-size: 11px;
      font-weight: var(--font-weight-bold);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .badge-default {
      background-color: var(--color-bg-surface-alt);
      color: var(--color-text-secondary);
      border: 1px solid var(--color-border-default);
    }

    .badge-success {
      background-color: rgba(34, 197, 94, 0.1);
      color: #22c55e;
      border: 1px solid rgba(34, 197, 94, 0.2);
    }

    .badge-warning {
      background-color: rgba(245, 158, 11, 0.1);
      color: #f59e0b;
      border: 1px solid rgba(245, 158, 11, 0.2);
    }

    .badge-error {
      background-color: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }
  `]
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
