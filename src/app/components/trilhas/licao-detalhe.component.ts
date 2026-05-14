import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TrilhasService } from '../../services/trilhas.service';
import { Trilha, Licao } from '../../models/trilha.model';
import { DemoBindingsBasicosComponent } from '../demos/demo-bindings-basicos.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-licao-detalhe',
  imports: [RouterLink, CardModule, ButtonModule, TagModule, DemoBindingsBasicosComponent],
  templateUrl: './licao-detalhe.component.html',
  styleUrls: ['./licao-detalhe.component.scss'],
})
export class LicaoDetalheComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly trilhasService = inject(TrilhasService);

  trilha: Trilha | null = null;
  licao: Licao | null = null;

  constructor() {
    const licaoId = this.route.snapshot.paramMap.get('id');
    if (licaoId) {
      const resultado = this.trilhasService.obterLicaoPorId(licaoId);
      if (resultado) {
        this.trilha = resultado.trilha;
        this.licao = resultado.licao;
      }
    }
  }

  marcarComoConcluida(): void {
    if (!this.licao) return;

    this.trilhasService.marcarLicaoComoConcluida(this.licao.id);
  }
}
