import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ToolbarModule, ButtonModule, BadgeModule],
  template: `
    <div class="app-shell">
      <p-toolbar class="shell-toolbar">
        <div class="p-toolbar-group-start toolbar-left">
          <span class="app-title">Angular Interativo 19</span>
        </div>
        <div class="p-toolbar-group-center toolbar-center">
          <a pButton label="Dashboard" styleClass="p-button-text" routerLink="/"></a>
          <a pButton label="Trilhas" styleClass="p-button-text" routerLink="/trilhas"></a>
        </div>
        <div class="p-toolbar-group-end toolbar-right">
          <span class="progresso-label">Progresso geral</span>
          <span pBadge value="25%" severity="info"></span>
        </div>
      </p-toolbar>

      <main class="conteudo-principal">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background: #0f172a;
        color: #e5e7eb;
        font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
      }

      .app-shell {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .shell-toolbar {
        background: #111827;
        border: 1px solid #1f2937;
        color: #e5e7eb;
      }

      .app-title {
        font-size: 1.1rem;
        font-weight: 600;
        letter-spacing: 0.02em;
      }

      .toolbar-center a {
        margin: 0 0.35rem;
      }

      .toolbar-right {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: #9ca3af;
      }

      .progresso-label {
        font-size: 0.9rem;
      }

      .conteudo-principal {
        flex: 1;
        padding: 1.5rem 1.25rem 2rem;
      }

      a.p-button-text {
        color: #e5e7eb;
      }

      a.p-button-text:hover {
        color: #22d3ee;
        background: transparent;
      }
    `,
  ],
})
export class AppShellComponent {}
