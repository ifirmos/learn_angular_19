import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TrilhasService } from '../../services/trilhas.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-lista-trilhas',
  imports: [RouterLink, CardModule, ButtonModule, TagModule],
  templateUrl: './lista-trilhas.component.html',
  styleUrl: './lista-trilhas.component.scss',
})
export class ListaTrilhasComponent {
  private readonly trilhasService = inject(TrilhasService);

  trilhas = this.trilhasService.trilhas;
}
