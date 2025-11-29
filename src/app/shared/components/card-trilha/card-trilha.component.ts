import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCardComponent } from '../../ui/ui-card/ui-card.component';
import { UiButtonComponent } from '../../ui/ui-button/ui-button.component';
import { BadgeNivelComponent, type Nivel } from '../badge-nivel/badge-nivel.component';

/**
 * CardTrilhaComponent
 * 
 * Card premium de trilha seguindo especificações do briefing:
 * - Header: badge de nível, meta de lições
 * - Corpo: título, descrição
 * - Rodapé: progresso (% + barra), ação, categoria
 * - Hover: lift + shadow + border color
 */
@Component({
  selector: 'app-card-trilha',
  standalone: true,
  imports: [CommonModule, UiButtonComponent, BadgeNivelComponent],
  template: `
    <div 
      class="card-trilha"
      [class.card-trilha--hover]="true"
    >
      <!-- Header -->
      <div class="card-trilha__header">
        <app-badge-nivel [nivel]="nivel" />
        <span class="card-trilha__meta">{{ numeroLicoes }} lições</span>
      </div>

      <!-- Corpo -->
      <div class="card-trilha__body">
        <h3 class="card-trilha__titulo">{{ titulo }}</h3>
        <p class="card-trilha__descricao">{{ descricao }}</p>
      </div>

      <!-- Rodapé -->
      <div class="card-trilha__footer">
        <!-- Progresso -->
        <div class="progresso">
          <div class="progresso__info">
            <span class="progresso__percentual">{{ progresso }}%</span>
            <span class="progresso__label">concluído</span>
          </div>
          <div class="progresso__barra">
            <div 
              class="progresso__preenchimento"
              [style.width.%]="progresso"
            ></div>
          </div>
        </div>

        <!-- Categoria -->
        <span class="card-trilha__categoria" *ngIf="categoria">
          {{ categoria }}
        </span>

        <!-- Ação -->
        <app-ui-button
          variant="primary"
          size="md"
          (click)="onAcessar()"
          class="card-trilha__acao"
        >
          {{ progresso > 0 ? 'Continuar' : 'Iniciar' }} trilha
        </app-ui-button>
      </div>
    </div>
  `,
  styles: [`
    .card-trilha {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
      padding: var(--spacing-5);
      background: var(--color-bg-surface);
      border: 1px solid var(--color-border-default);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      transition: all var(--transition-normal);
      cursor: pointer;
      height: 100%;
    }

    .card-trilha--hover:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
      border-color: var(--color-accent-primary);
    }

    /* Header */
    .card-trilha__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-trilha__meta {
      font-size: var(--font-size-caption);
      color: var(--color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Corpo */
    .card-trilha__body {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
      flex: 1;
    }

    .card-trilha__titulo {
      font-size: var(--font-size-h2);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin: 0;
      line-height: 1.3;
    }

    .card-trilha__descricao {
      font-size: var(--font-size-body);
      line-height: var(--line-height-body);
      color: var(--color-text-secondary);
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Rodapé */
    .card-trilha__footer {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-3);
      margin-top: auto;
    }

    /* Progresso */
    .progresso {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-1);
    }

    .progresso__info {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .progresso__percentual {
      font-size: var(--font-size-h2);
      font-weight: var(--font-weight-semibold);
      color: var(--color-accent-primary);
    }

    .progresso__label {
      font-size: var(--font-size-caption);
      color: var(--color-text-secondary);
    }

    .progresso__barra {
      width: 100%;
      height: 6px;
      background: var(--color-bg-surface-alt);
      border-radius: var(--radius-full);
      overflow: hidden;
    }

    .progresso__preenchimento {
      height: 100%;
      background: linear-gradient(
        90deg,
        var(--color-accent-primary),
        var(--color-accent-muted)
      );
      border-radius: var(--radius-full);
      transition: width var(--transition-slow);
    }

    /* Categoria */
    .card-trilha__categoria {
      font-size: var(--font-size-caption);
      color: var(--color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Ação */
    .card-trilha__acao {
      width: 100%;
    }

    /* Focus state */
    .card-trilha:focus-within {
      outline: 2px solid var(--color-accent-primary);
      outline-offset: 2px;
    }
  `],
})
export class CardTrilhaComponent {
  @Input({ required: true }) titulo!: string;
  @Input({ required: true }) descricao!: string;
  @Input({ required: true }) nivel!: Nivel;
  @Input({ required: true }) numeroLicoes!: number;
  @Input() progresso: number = 0;
  @Input() categoria?: string;
  
  @Output() acessar = new EventEmitter<void>();

  onAcessar(): void {
    this.acessar.emit();
  }
}
