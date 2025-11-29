import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { UiButtonComponent } from '../../../shared/ui/ui-button/ui-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="app-header">
      <div class="app-header__container">
        <!-- Zona Esquerda: Brand -->
        <div class="app-header__brand">
          <a routerLink="/" class="brand-link">
            <div class="brand-logo">
              <!-- Ícone Angular simplificado (placeholder) -->
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 22H22L12 2Z" fill="var(--color-accent-primary)" stroke="var(--color-accent-primary)" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="brand-text">Learn Angular 19</span>
          </a>
        </div>

        <!-- Zona Central: Navegação -->
        <nav class="app-header__nav">
          <ul class="nav-list">
            <li class="nav-item">
              <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
                Início
              </a>
            </li>
            <li class="nav-item">
              <a routerLink="/trilhas" routerLinkActive="active" class="nav-link">
                Trilhas
              </a>
            </li>
            <li class="nav-item">
              <a routerLink="/minhas-licoes" routerLinkActive="active" class="nav-link">
                Minhas lições
              </a>
            </li>
          </ul>
        </nav>

        <!-- Zona Direita: Ações -->
        <div class="app-header__actions">
          <button 
            class="theme-toggle" 
            (click)="toggleTheme()" 
            [title]="'Tema atual: ' + themeService.currentTheme()"
            aria-label="Alternar tema"
          >
            <!-- Ícone Sol (Light) -->
            <svg *ngIf="themeService.currentTheme() === 'sandstone'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            
            <!-- Ícone Lua (Dark/Midnight) -->
            <svg *ngIf="themeService.currentTheme() !== 'sandstone'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>

          <div class="user-avatar">
            <span>U</span>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: rgba(var(--color-bg-body-rgb), 0.8); /* Fallback se não tiver RGB vars */
      background-color: var(--color-bg-body); /* Ajustar para suportar transparência se possível */
      border-bottom: 1px solid var(--color-border-default);
      backdrop-filter: blur(8px);
      height: 64px;
      display: flex;
      align-items: center;
      transition: background-color var(--transition-normal), border-color var(--transition-normal);
    }

    .app-header__container {
      width: 100%;
      max-width: 1440px; /* Largura máxima do shell */
      margin: 0 auto;
      padding: 0 var(--spacing-6);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* Brand */
    .app-header__brand {
      display: flex;
      align-items: center;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      text-decoration: none;
      color: var(--color-text-primary);
    }

    .brand-logo {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .brand-text {
      font-family: var(--font-family-sans);
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-h2);
      letter-spacing: -0.02em;
    }

    /* Nav */
    .app-header__nav {
      display: none; /* Mobile first: esconde nav principal */
      
      @media (min-width: 768px) {
        display: block;
      }
    }

    .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: var(--spacing-6);
    }

    .nav-link {
      text-decoration: none;
      color: var(--color-text-secondary);
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-body);
      transition: color var(--transition-fast);
      padding: var(--spacing-2) 0;
      position: relative;

      &:hover {
        color: var(--color-text-primary);
      }

      &.active {
        color: var(--color-accent-primary);
        
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--color-accent-primary);
          border-radius: var(--radius-full);
        }
      }
    }

    /* Actions */
    .app-header__actions {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
    }

    .theme-toggle {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-text-secondary);
      padding: var(--spacing-2);
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-fast);

      &:hover {
        color: var(--color-text-primary);
        background-color: var(--color-bg-surface-alt);
      }
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-full);
      background-color: var(--color-accent-primary);
      color: var(--color-text-inverse);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-caption);
    }
  `]
})
export class HeaderComponent {
  themeService = inject(ThemeService);

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
