import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Trilha } from '../../models/trilha.model';
import { TrilhasService } from '../../services/trilhas.service';

@Component({
  selector: 'app-detalhe-trilha',
  standalone: true,
  imports: [CommonModule, RouterLink, CardModule, ButtonModule, TagModule],
  templateUrl: './detalhe-trilha.component.html',
  styles: [
    `
      :host {
        display: block;
      }

      .cabecalho {
        display: grid;
        gap: 0.4rem;
        margin-bottom: 1.25rem;
      }

      .subtitulo {
        color: #22d3ee;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        font-weight: 600;
        font-size: 0.9rem;
      }

      .descricao {
        margin: 0;
        color: #cbd5e1;
        max-width: 720px;
      }

      .card-escuro ::ng-deep .p-card {
        background: #111827;
        border: 1px solid #1f2937;
        color: #e5e7eb;
      }

      .card-detalhes {
        margin-bottom: 1rem;
      }

      .info-basica {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
        color: #cbd5e1;
      }

      .lista-licoes {
        display: grid;
        gap: 0.75rem;
      }

      .grid-licoes {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 0.75rem;
      }

      .descricao-licao {
        color: #cbd5e1;
      }

      .meta-licao {
        display: grid;
        gap: 0.25rem;
        color: #cbd5e1;
        margin: 0.5rem 0;
      }

      .status {
        display: inline-block;
        padding: 0.15rem 0.5rem;
        border-radius: 6px;
        background: #1f2937;
        color: #e5e7eb;
      }

      .status.concluida {
        background: #0f766e;
      }

      .acoes-licao,
      .acoes {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
        flex-wrap: wrap;
      }
    `,
  ],
})
export class DetalheTrilhaComponent implements OnInit {
  trilha: Trilha | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly trilhasService: TrilhasService
  ) {}

  ngOnInit(): void {
    const trilhaId = this.route.snapshot.paramMap.get('id');
    if (trilhaId) {
      this.trilha = this.trilhasService.obterTrilhaPorId(trilhaId);
    }
  }
}
