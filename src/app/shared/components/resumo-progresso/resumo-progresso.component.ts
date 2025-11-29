import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiBadgeComponent } from '../../ui/ui-badge/ui-badge.component';

/**
 * ResumoProgressoComponent
 * 
 * Painel de progresso global com:
 * - Círculo/anel de progresso visual
 * - Barra linear como reforço
 * - Texto de recomendação contextual
 * - Badges de áreas-chave
 */
@Component({
  selector: 'app-resumo-progresso',
  standalone: true,
  imports: [CommonModule, UiBadgeComponent],
  template: `
    <div class="resumo-progresso">
      <div class="resumo-progresso__header">
        <h3 class="resumo-progresso__titulo">Seu Progresso</h3>
      </div>

      <!-- Círculo de progresso -->
      <div class="progresso-circular">
        <svg class="progresso-circular__svg" viewBox="0 0 120 120">
          <!-- Background circle -->
          <circle
            class="progresso-circular__background"
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="var(--color-bg-surface-alt)"
            stroke-width="8"
          />
          <!-- Progress circle -->
          <circle
            class="progresso-circular__progress"
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="url(#gradient)"
            stroke-width="8"
            [attr.stroke-dasharray]="circumference"
            [attr.stroke-dashoffset]="strokeDashoffset()"
            stroke-linecap="round"
          />
          <!-- Gradient definition -->
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="var(--color-accent-primary)" />
              <stop offset="100%" stop-color="var(--color-accent-muted)" />
            </linearGradient>
          </defs>
        </svg>
        <div class="progresso-circular__valor">
          <span class="progresso-circular__numero">{{ progresso }}</span>
          <span class="progresso-circular__simbolo">%</span>
        </div>
      </div>

      <!-- Barra linear -->
      <div class="barra-progresso">
        <div 
          class="barra-progresso__preenchimento"
          [style.width.%]="progresso"
        ></div>
      </div>

      <!-- Texto de recomendação -->
      <p class="resumo-progresso__recomendacao" *ngIf="recomendacao">
        {{ recomendacao }}
      </p>

      <!-- Badges de áreas-chave -->
      <div class="areas-chave" *ngIf="areasChave && areasChave.length > 0">
        <app-ui-badge 
          *ngFor="let area of areasChave"
          variant="default"
          size="sm"
        >
          {{ area }}
        </app-ui-badge>
      </div>
    </div>
  `,
  styles: [`
    .resumo-progresso {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-5);
      padding: var(--spacing-6);
      background: var(--color-bg-surface);
      border: 1px solid var(--color-border-default);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
    }

    .resumo-progresso__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .resumo-progresso__titulo {
      font-size: var(--font-size-h2);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin: 0;
    }

    /* Círculo de progresso */
    .progresso-circular {
      position: relative;
      width: 120px;
      height: 120px;
      align-self: center;
    }

    .progresso-circular__svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .progresso-circular__progress {
      transition: stroke-dashoffset var(--transition-slow);
    }

    .progresso-circular__valor {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: baseline;
      gap: 2px;
    }

    .progresso-circular__numero {
      font-size: 2rem;
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
      line-height: 1;
    }

    .progresso-circular__simbolo {
      font-size: var(--font-size-body);
      color: var(--color-text-secondary);
      font-weight: var(--font-weight-medium);
    }

    /* Barra linear */
    .barra-progresso {
      width: 100%;
      height: 8px;
      background: var(--color-bg-surface-alt);
      border-radius: var(--radius-full);
      overflow: hidden;
    }

    .barra-progresso__preenchimento {
      height: 100%;
      background: linear-gradient(
        90deg,
        var(--color-accent-primary),
        var(--color-accent-muted)
      );
      border-radius: var(--radius-full);
      transition: width var(--transition-slow);
    }

    /* Recomendação */
    .resumo-progresso__recomendacao {
      font-size: var(--font-size-body);
      line-height: var(--line-height-body);
      color: var(--color-text-secondary);
      margin: 0;
    }

    /* Áreas-chave */
    .areas-chave {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-2);
    }
  `],
})
export class ResumoProgressoComponent {
  @Input({ required: true }) progresso!: number;
  @Input() recomendacao?: string;
  @Input() areasChave?: string[];

  // Cálculo para o círculo SVG
  readonly circumference = 2 * Math.PI * 54; // r=54

  strokeDashoffset = computed(() => {
    const progress = Math.min(100, Math.max(0, this.progresso));
    return this.circumference - (progress / 100) * this.circumference;
  });
}
