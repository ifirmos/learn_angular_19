import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TrilhasService } from '../../services/trilhas.service';

@Component({
  selector: 'app-dashboard-trilhas',
  standalone: true,
  imports: [CommonModule, RouterLink, CardModule, ButtonModule, TagModule],
  templateUrl: './dashboard-trilhas.component.html',
  styles: [
    `
      :host {
        display: block;
      }

      .resumo-progresso {
        margin-bottom: 1.25rem;
      }

      .resumo-topo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }

      .indicador-progresso {
        display: grid;
        justify-items: end;
        gap: 0.25rem;
      }

      .valor-progresso {
        font-size: 2.25rem;
        font-weight: 700;
      }

      .cabecalho {
        margin-bottom: 1.75rem;
        display: grid;
        gap: 0.5rem;
      }

      .subtitulo {
        color: #22d3ee;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-size: 0.9rem;
      }

      h1 {
        margin: 0;
        font-size: 1.6rem;
        letter-spacing: 0.01em;
      }

      .descricao {
        margin: 0;
        color: #cbd5e1;
        max-width: 720px;
      }

      .acoes {
        margin-top: 0.75rem;
      }

      .cards-trilhas {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      }

      .card-wrapper {
        transform: translateY(4px);
        transition: transform 180ms ease, box-shadow 180ms ease;
      }

      .card-wrapper:hover {
        transform: translateY(0);
      }

      .card-trilha ::ng-deep .p-card {
        background: #111827;
        border: 1px solid #1f2937;
        color: #e5e7eb;
      }

      .card-trilha ::ng-deep .p-card-title,
      .card-trilha ::ng-deep .p-card-subtitle {
        color: #e5e7eb;
      }

      .detalhes-trilha {
        display: grid;
        gap: 0.35rem;
        margin: 0.5rem 0 1rem;
        color: #cbd5e1;
      }

      .acoes-card {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
        flex-wrap: wrap;
      }

      .nivel,
      .licoes,
      .progresso {
        margin: 0;
        font-size: 0.95rem;
      }
    `,
  ],
})
export class DashboardTrilhasComponent {
  private readonly trilhasService = inject(TrilhasService);

  trilhas = this.trilhasService.trilhas;
  progressoGlobal = this.trilhasService.progressoGlobal;
}
