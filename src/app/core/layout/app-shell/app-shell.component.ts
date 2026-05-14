import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrilhasStore } from '../../services/trilhas-store.service';
import { ThemeService } from '../../services/theme.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-shell',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {
  private readonly trilhasStore = inject(TrilhasStore);
  // ThemeService é injetado e automaticamente inicializado via constructor
  private readonly themeService = inject(ThemeService);

  constructor() {
    // Tema já é aplicado automaticamente no constructor do ThemeService
    
    // Inicializa dados de trilhas e lições ao carregar a aplicação
    this.trilhasStore
      .inicializar()
      .catch((err) =>
        console.error('Erro ao inicializar TrilhasStore', err),
      );
  }
}
