import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { UiBadgeComponent } from '../../ui/ui-badge/ui-badge.component';

@Component({
  selector: 'app-resumo-progresso',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiBadgeComponent],
  templateUrl: './resumo-progresso.component.html',
  styleUrl: './resumo-progresso.component.scss',
})
export class ResumoProgressoComponent {
  readonly progresso = input.required<number>();
  readonly recomendacao = input<string | undefined>(undefined);
  readonly areasChave = input<string[] | undefined>(undefined);

  // Cálculo para o círculo SVG
  readonly circumference = 2 * Math.PI * 54; // r=54

  readonly strokeDashoffset = computed(() => {
    const progress = Math.min(100, Math.max(0, this.progresso()));
    return this.circumference - (progress / 100) * this.circumference;
  });
}
