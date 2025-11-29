import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiBadgeComponent } from '../../ui/ui-badge/ui-badge.component';

export type Nivel = 'iniciante' | 'intermediario';

/**
 * BadgeNivelComponent
 * 
 * Badge específico para exibir níveis de trilhas/lições
 * com cores consistentes do design system.
 */
@Component({
  selector: 'app-badge-nivel',
  standalone: true,
  imports: [CommonModule, UiBadgeComponent],
  template: `
    <app-ui-badge
      [variant]="nivel === 'iniciante' ? 'success' : 'info'"
      size="sm"
    >
      {{ nivel === 'iniciante' ? 'INICIANTE' : 'INTERMEDIÁRIO' }}
    </app-ui-badge>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
  `],
})
export class BadgeNivelComponent {
  @Input({ required: true }) nivel!: Nivel;
}
