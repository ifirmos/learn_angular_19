import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrilhasStore } from '../../services/trilhas-store.service';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet],
  template: `
    <div class="app-shell">
      <header class="app-header">
        <h1>Plataforma Educacional Angular 19</h1>
      </header>

      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppShellComponent {
  private readonly trilhasStore = inject(TrilhasStore);

  constructor() {
    // Inicializa dados de trilhas e lições ao carregar a aplicação
    this.trilhasStore
      .inicializar()
      .catch((err) =>
        console.error('Erro ao inicializar TrilhasStore', err),
      );
  }
}
