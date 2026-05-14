import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Trilha } from '../../models/trilha.model';
import { TrilhasService } from '../../services/trilhas.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-detalhe-trilha',
  imports: [RouterLink, CardModule, ButtonModule, TagModule],
  templateUrl: './detalhe-trilha.component.html',
  styleUrl: './detalhe-trilha.component.scss',
})
export class DetalheTrilhaComponent {
  trilha: Trilha | null = null;

  private readonly route = inject(ActivatedRoute);
  private readonly trilhasService = inject(TrilhasService);

  constructor() {
    const trilhaId = this.route.snapshot.paramMap.get('id');
    if (trilhaId) {
      this.trilha = this.trilhasService.obterTrilhaPorId(trilhaId);
    }
  }
}
