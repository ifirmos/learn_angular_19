import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * UiCardComponent - Componente primitivo de card
 * 
 * Fornece um container visual padrão usando os tokens semânticos de design.
 * Pode ser usado como base para componentes mais específicos.
 */
@Component({
  selector: 'app-ui-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ui-card" [class.ui-card--elevated]="elevated">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .ui-card {
      background-color: var(--color-bg-surface);
      border: 1px solid var(--color-border-default);
      border-radius: var(--radius-md);
      padding: var(--spacing-4);
      transition: var(--transition-normal);
    }

    .ui-card--elevated {
      box-shadow: var(--shadow-sm);
    }

    .ui-card:hover.ui-card--elevated {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }
  `],
})
export class UiCardComponent {
  @Input() elevated: boolean = false;
}
