import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TrilhasService } from '../../services/trilhas.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dashboard-trilhas',
  imports: [RouterLink, CardModule, ButtonModule, TagModule],
  templateUrl: './dashboard-trilhas.component.html',
  styleUrl: './dashboard-trilhas.component.scss',
})
export class DashboardTrilhasComponent {
  private readonly trilhasService = inject(TrilhasService);

  trilhas = this.trilhasService.trilhas;
  progressoGlobal = this.trilhasService.progressoGlobal;
}
