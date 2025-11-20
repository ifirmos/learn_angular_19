import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TrilhasService } from '../../services/trilhas.service';

@Component({
  selector: 'app-lista-trilhas',
  standalone: true,
  imports: [CommonModule, RouterLink, CardModule, ButtonModule, TagModule],
  template: `
    <header class="cabecalho-lista">
      <div>
        <p class="subtitulo">Explorar</p>
        <h2>Trilhas disponíveis</h2>
        <p class="descricao">
          Selecione uma trilha para ver suas lições e iniciar a prática. Os dados abaixo são fornecidos por um serviço único
          para evitar duplicação.
        </p>
      </div>
    </header>

    <section class="lista-trilhas">
      @for (trilha of trilhas(); track trilha.id) {
        <article class="item-trilha">
        <p-card [header]="trilha.titulo" [subheader]="trilha.descricao" class="card-trilha">
          <div class="detalhes">
            <span class="nivel">
              Nível:
              <p-tag [value]="trilha.nivel === 'iniciante' ? 'Iniciante' : 'Intermediário'" severity="info"></p-tag>
            </span>
            <span class="quantidade-licoes">{{ trilha.licoes.length }} lições</span>
          </div>
          <div class="acoes">
            <a pButton label="Ver trilha" icon="pi pi-arrow-right" [routerLink]="['/trilhas', trilha.id]"></a>
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

      .cabecalho-lista {
        margin-bottom: 1.25rem;
      }

      .subtitulo {
        color: #22d3ee;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        font-weight: 600;
        font-size: 0.9rem;
      }

      h2 {
        margin: 0;
        font-size: 1.4rem;
      }

      .descricao {
        margin: 0.25rem 0 0;
        color: #cbd5e1;
        max-width: 720px;
      }

      .lista-trilhas {
        display: grid;
        gap: 0.75rem;
      }

      .card-trilha ::ng-deep .p-card {
        background: #111827;
        border: 1px solid #1f2937;
        color: #e5e7eb;
      }

      .detalhes {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        margin: 0.5rem 0 1rem;
        color: #cbd5e1;
      }

      .acoes {
        display: flex;
        justify-content: flex-end;
      }
    `,
  ],
})
export class ListaTrilhasComponent {
  trilhas = this.trilhasService.trilhas;

  constructor(private readonly trilhasService: TrilhasService) {}
}
