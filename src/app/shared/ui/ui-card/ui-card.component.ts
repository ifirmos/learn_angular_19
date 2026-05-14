import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ui-card.component.html',
  styleUrl: './ui-card.component.scss',
})
export class UiCardComponent {
  readonly elevated = input(false);
}
