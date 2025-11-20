import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TrilhasService } from '../../services/trilhas.service';
import { Trilha } from '../../models/trilha.model';

@Component({
  selector: 'app-dashboard-trilhas',
  standalone: true,
  imports: [CommonModule, RouterLink, CardModule, ButtonModule, TagModule],
  template: `
    <section class="resumo-progresso">
      <p-card class="card-trilha">
        <div class="resumo-topo">
          <div>
            <p class="subtitulo">Acompanhamento</p>
            <h2>Progresso global das lições</h2>
            <p class="descricao">
              Veja rapidamente quanto você já explorou. Conforme as lições são marcadas como concluídas, este indicador se
              atualiza automaticamente via signals.
            </p>
          </div>
          <div class="indicador-progresso">
            <span class="valor-progresso">{{ progressoGlobal() }}%</span>
            <p-tag value="Andamento" severity="success"></p-tag>
          </div>
        </div>
      </p-card>
    </section>

    <section class="cabecalho">
      <p class="subtitulo">Plataforma guiada</p>
      <h1>Trilhas para aprender Angular 19 fazendo</h1>
      <p class="descricao">
        Explore trilhas curtas, com lições interativas e exemplos claros. Comece pelo dashboard ou siga para a lista completa
        de trilhas.
      </p>
      <div class="acoes">
        <a pButton label="Ver todas as trilhas" routerLink="/trilhas" icon="pi pi-arrow-right"></a>
      </div>
    </section>

    <section class="cards-trilhas">
      @for (trilha of trilhas(); track trilha.id) {
        <article class="card-wrapper">
        <p-card [header]="trilha.titulo" [subheader]="trilha.descricao" class="card-trilha">
          <div class="detalhes-trilha">
            <p class="nivel">
              Nível: <p-tag [value]="trilha.nivel === 'iniciante' ? 'Iniciante' : 'Intermediário'" severity="info"></p-tag>
            </p>
            <p class="licoes">{{ trilha.licoes.length }} lições</p>
            <p class="progresso">Progresso estimado: {{ trilha.progresso ?? 0 }}%</p>
          </div>
          <div class="acoes-card">
            <a pButton label="Detalhes" styleClass="p-button-outlined" [routerLink]="['/trilhas', trilha.id]"></a>
            <a pButton label="Começar" icon="pi pi-play" [routerLink]="['/licoes', trilha.licoes[0].id]"></a>
          </div>
        </p-card>
        </article>
      }
    </section>
  `,
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
  trilhas = this.trilhasService.trilhas;
  progressoGlobal = this.trilhasService.progressoGlobal;

  constructor(private readonly trilhasService: TrilhasService) {}
}
