import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private readonly router = inject(Router);

  /** Detecta se a rota atual é uma lição (/licoes/:id) */
  readonly isLicaoRoute = computed(() => {
    return this.router.url.startsWith('/licoes');
  });
}

