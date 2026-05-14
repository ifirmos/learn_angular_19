import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface ConfiguracaoDemo {
  objetivo: string;
  acoesPrincipais: string[];
  entradaEsperada?: string;
  resultadoEsperado?: string;
  dicasObservacao?: string[];
}

@Component({
  selector: 'app-licao-explicacao',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './licao-explicacao.component.html',
  styleUrl: './licao-explicacao.component.scss'
})
export class LicaoExplicacaoComponent {
  readonly config = input<ConfiguracaoDemo | undefined>(undefined);
}
