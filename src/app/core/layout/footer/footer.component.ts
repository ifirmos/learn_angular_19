import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="app-footer">
      <div class="app-footer__container">
        <!-- Faixa Superior: Links -->
        <div class="footer-links">
          <div class="footer-column">
            <h4 class="column-title">Plataforma</h4>
            <ul class="link-list">
              <li><a routerLink="/sobre">Sobre</a></li>
              <li><a routerLink="/roadmap">Roadmap</a></li>
              <li><a routerLink="/blog">Blog</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4 class="column-title">Ajuda</h4>
            <ul class="link-list">
              <li><a routerLink="/docs">Documentação</a></li>
              <li><a routerLink="/faq">FAQ</a></li>
              <li><a routerLink="/contato">Contato</a></li>
            </ul>
          </div>

          <div class="footer-column">
            <h4 class="column-title">Legal</h4>
            <ul class="link-list">
              <li><a routerLink="/termos">Termos de uso</a></li>
              <li><a routerLink="/privacidade">Política de privacidade</a></li>
            </ul>
          </div>
        </div>

        <!-- Faixa Inferior: Meta -->
        <div class="footer-meta">
          <div class="meta-left">
            <p class="copyright">© 2024 Plataforma Educacional Angular 19</p>
            <p class="tagline">Feito para devs que vivem Angular</p>
          </div>
          
          <div class="meta-right">
            <span class="version">v0.1.0 – Prévia</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .app-footer {
      background-color: var(--color-bg-surface);
      border-top: 1px solid var(--color-border-default);
      padding: var(--spacing-10) 0 var(--spacing-6);
      margin-top: auto; /* Empurra para o final se o conteúdo for curto */
    }

    .app-footer__container {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      padding: 0 var(--spacing-6);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-10);
    }

    /* Links */
    .footer-links {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: var(--spacing-8);
    }

    .column-title {
      font-size: var(--font-size-body);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-4);
    }

    .link-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);

      a {
        text-decoration: none;
        color: var(--color-text-secondary);
        font-size: var(--font-size-caption);
        transition: color var(--transition-fast);

        &:hover {
          color: var(--color-accent-primary);
          text-decoration: underline;
        }
      }
    }

    /* Meta */
    .footer-meta {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
      padding-top: var(--spacing-6);
      border-top: 1px solid var(--color-border-default);

      @media (min-width: 640px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }

    .meta-left {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-1);
    }

    .copyright {
      font-size: var(--font-size-caption);
      color: var(--color-text-primary);
      margin: 0;
    }

    .tagline {
      font-size: var(--font-size-caption);
      color: var(--color-text-secondary);
      margin: 0;
    }

    .version {
      font-size: var(--font-size-caption);
      color: var(--color-text-secondary);
      font-family: var(--font-family-mono);
      background-color: var(--color-bg-surface-alt);
      padding: var(--spacing-1) var(--spacing-2);
      border-radius: var(--radius-sm);
    }
  `]
})
export class FooterComponent {}
