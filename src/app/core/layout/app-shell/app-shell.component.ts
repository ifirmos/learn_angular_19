import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrilhasStore } from '../../services/trilhas-store.service';
import { ThemeService } from '../../services/theme.service';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  template: `
    <div class="app-shell">
      <app-header />
      
      <div class="app-body">
        <app-sidebar />
        
        <main class="app-main">
          <router-outlet></router-outlet>
        </main>
      </div>

      <app-footer />
    </div>
  `,
  styles: [`
    .app-shell {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: var(--color-bg-body);
    }

    .app-body {
      display: flex;
      flex: 1;
      position: relative;
    }

    .app-main {
      flex: 1;
      width: 100%;
      /* Garante que o conteúdo não estoure a largura em layouts flex */
      min-width: 0; 
    }
  `]
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
