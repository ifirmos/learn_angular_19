import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Metrica {
  valor: number;
  label: string;
  icone?: string;
}

/**
 * MetricasRapidasComponent
 * 
 * Exibe métricas rápidas da plataforma
 * (número de trilhas, lições, tempo estimado, etc.)
 */
@Component({
  selector: 'app-metricas-rapidas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="metricas-rapidas">
      <div class="metrica" *ngFor="let metrica of metricas">
        <span class="metrica__valor">{{ metrica.valor }}</span>
        <span class="metrica__label">{{ metrica.label }}</span>
      </div>
    </div>
  `,
  styles: [`
    .metricas-rapidas {
      display: flex;
      gap: var(--spacing-6);
      flex-wrap: wrap;
    }

    .metrica {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-1);
    }

    .metrica__valor {
      font-size: var(--font-size-h1);
      font-weight: var(--font-weight-bold);
      color: var(--color-accent-primary);
      line-height: 1;
    }

    .metrica__label {
      font-size: var(--font-size-caption);
      color: var(--color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    @media (max-width: 640px) {
      .metricas-rapidas {
        gap: var(--spacing-4);
      }

      .metrica__valor {
        font-size: var(--font-size-h2);
      }
    }
  `],
})
export class MetricasRapidasComponent {
  @Input({ required: true }) metricas!: Metrica[];
}
