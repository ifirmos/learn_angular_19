import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UiBadgeComponent } from '../../ui/ui-badge/ui-badge.component';

export type Nivel = 'iniciante' | 'intermediario';

@Component({
  selector: 'app-badge-nivel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiBadgeComponent],
  templateUrl: './badge-nivel.component.html',
  styleUrl: './badge-nivel.component.scss',
})
export class BadgeNivelComponent {
  readonly nivel = input.required<Nivel>();
}
