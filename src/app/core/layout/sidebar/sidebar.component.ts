import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="app-sidebar">
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <a 
              routerLink="/" 
              routerLinkActive="active" 
              [routerLinkActiveOptions]="{exact: true}" 
              class="nav-link"
              title="Início"
            >
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <span class="sr-only">Início</span>
            </a>
          </li>
          
          <li class="nav-item">
            <a 
              routerLink="/trilhas" 
              routerLinkActive="active" 
              class="nav-link"
              title="Trilhas"
            >
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <span class="sr-only">Trilhas</span>
            </a>
          </li>

          <li class="nav-item">
            <a 
              routerLink="/minhas-licoes" 
              routerLinkActive="active" 
              class="nav-link"
              title="Minhas Lições"
            >
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <span class="sr-only">Minhas Lições</span>
            </a>
          </li>
        </ul>

        <div class="sidebar-footer">
          <a routerLink="/configuracoes" class="nav-link" title="Configurações">
            <div class="icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
          </a>
        </div>
      </nav>
    </aside>
  `,
  styles: [`
    .app-sidebar {
      display: none; /* Mobile first: hidden */
      width: 72px;
      height: calc(100vh - 64px); /* Altura total - Header */
      position: sticky;
      top: 64px;
      background-color: var(--color-bg-surface);
      border-right: 1px solid var(--color-border-default);
      flex-direction: column;
      align-items: center;
      padding: var(--spacing-4) 0;
      z-index: 90;

      @media (min-width: 1024px) {
        display: flex;
      }
    }

    .sidebar-nav {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      align-items: center;
    }

    .nav-list {
      display: flex;
      flex-direction: column;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: var(--spacing-4);
      width: 100%;
      align-items: center;
    }

    .nav-item {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .nav-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      color: var(--color-text-secondary);
      transition: all var(--transition-fast);
      position: relative;

      &:hover {
        background-color: var(--color-bg-surface-alt);
        color: var(--color-text-primary);
      }

      &.active {
        color: var(--color-accent-primary);
        background-color: rgba(34, 211, 238, 0.1); /* Fallback accent color opacity */
        
        &::before {
          content: '';
          position: absolute;
          left: -12px; /* Fora do botão, na borda do sidebar */
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 24px;
          background-color: var(--color-accent-primary);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
        }
      }
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sidebar-footer {
      margin-top: auto;
      width: 100%;
      display: flex;
      justify-content: center;
      padding-bottom: var(--spacing-4);
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `]
})
export class SidebarComponent {}
