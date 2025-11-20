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
  template: `
    @if (trilha) {
      <section class="cabecalho">
        <p class="subtitulo">Trilha</p>
        <h2>{{ trilha.titulo }}</h2>
        <p class="descricao">{{ trilha.descricao }}</p>
      </section>

      <section class="card-detalhes">
        <p-card class="card-escuro" header="Informações gerais">
          <div class="info-basica">
            <span>
              Nível:
              <p-tag [value]="trilha.nivel === 'iniciante' ? 'Iniciante' : 'Intermediário'" severity="info"></p-tag>
            </span>
            <span>{{ trilha.licoes.length }} lições</span>
            <span>Progresso estimado: {{ trilha.progresso ?? 0 }}%</span>
          </div>
        </p-card>
      </section>

      <section class="lista-licoes">
        <h3>Lições desta trilha</h3>
        <div class="grid-licoes">
          @for (licao of trilha.licoes; track licao.id) {
            <p-card class="card-escuro" [header]="licao.titulo">
              <p class="descricao-licao">{{ licao.descricaoCurta }}</p>
              <div class="meta-licao">
                <span><strong>Nível:</strong> {{ licao.nivel === 'iniciante' ? 'Iniciante' : 'Intermediário' }}</span>
                <span><strong>Tempo estimado:</strong> {{ licao.tempoEstimadoMinutos }} min</span>
                <span class="status" [class.concluida]="licao.concluida">
                  {{ licao.concluida ? 'Concluída' : 'Pendente' }}
                </span>
              </div>
              <div class="acoes-licao">
                <a pButton label="Abrir lição" icon="pi pi-arrow-right" [routerLink]="['/licoes', licao.id]"></a>
              </div>
            </p-card>
          }
        </div>
      </section>
    } @else {
      <section class="cabecalho">
        <p class="subtitulo">Trilha</p>
        <h2>Trilha não encontrada</h2>
        <p class="descricao">Não localizamos a trilha solicitada. Verifique o link ou volte para a lista.</p>
      </section>
      <div class="acoes">
        <a pButton label="Voltar para trilhas" styleClass="p-button-text" routerLink="/trilhas"></a>
      </div>
    }
  `,
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
