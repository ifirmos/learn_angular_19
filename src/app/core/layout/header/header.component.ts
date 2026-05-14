import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { UiButtonComponent } from '../../../shared/ui/ui-button/ui-button.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly router = inject(Router);
  themeService = inject(ThemeService);

  /** Detecta se a rota atual é uma lição (/licoes/:id) */
  readonly isLicaoRoute = computed(() => {
    return this.router.url.startsWith('/licoes');
  });

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}

