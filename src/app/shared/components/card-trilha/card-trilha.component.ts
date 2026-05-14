import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { UiButtonComponent } from '../../ui/ui-button/ui-button.component';
import { BadgeNivelComponent, type Nivel } from '../badge-nivel/badge-nivel.component';

@Component({
  selector: 'app-card-trilha',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiButtonComponent, BadgeNivelComponent],
  templateUrl: './card-trilha.component.html',
  styleUrl: './card-trilha.component.scss',
})
export class CardTrilhaComponent {
  readonly titulo = input.required<string>();
  readonly descricao = input.required<string>();
  readonly nivel = input.required<Nivel>();
  readonly numeroLicoes = input.required<number>();
  readonly progresso = input(0);
  readonly categoria = input<string | undefined>(undefined);

  readonly acessar = output<void>();

  onAcessar(): void {
    this.acessar.emit();
  }
}
