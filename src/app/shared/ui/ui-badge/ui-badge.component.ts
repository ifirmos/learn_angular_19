import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'app-ui-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ui-badge.component.html',
  styleUrl: './ui-badge.component.scss',
})
export class UiBadgeComponent {
  readonly variant = input<BadgeVariant>('default');
  readonly size = input<BadgeSize>('md');
}
