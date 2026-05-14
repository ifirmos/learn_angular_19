import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface Metrica {
  valor: number;
  label: string;
  icone?: string;
}

@Component({
  selector: 'app-metricas-rapidas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './metricas-rapidas.component.html',
  styleUrl: './metricas-rapidas.component.scss',
})
export class MetricasRapidasComponent {
  readonly metricas = input.required<Metrica[]>();
}
