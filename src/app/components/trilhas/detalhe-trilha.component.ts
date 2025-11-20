import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-detalhe-trilha',
  standalone: true,
  imports: [CommonModule, RouterLink, CardModule, ButtonModule, TagModule],
  template: `
    <section class="cabecalho">
      <p class="subtitulo">Trilha</p>
      <h2>Detalhe da trilha: {{ trilhaId }}</h2>
      <p class="descricao">
        Placeholder de conteúdo. Esta página exibirá metadados da trilha, progresso e lista de lições reais nas próximas fases.
      </p>
    </section>

    <section class="licoes-placeholder">
      <p-card header="Lições desta trilha" class="card-placeholder">
        <p class="texto-placeholder">Aqui veremos a lista de lições com status de conclusão e ações para navegar para cada uma.</p>
        <div class="acoes">
          <a pButton label="Voltar" styleClass="p-button-text" routerLink="/trilhas"></a>
          <a pButton label="Abrir primeira lição" icon="pi pi-play" [routerLink]="['/licoes', 'em-breve']"></a>
        </div>
      </p-card>
    </section>
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

      .card-placeholder ::ng-deep .p-card {
        background: #111827;
        border: 1px solid #1f2937;
        color: #e5e7eb;
      }

      .licoes-placeholder {
        display: grid;
        gap: 0.75rem;
      }

      .texto-placeholder {
        color: #cbd5e1;
        margin: 0 0 1rem;
      }

      .acoes {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
        flex-wrap: wrap;
      }
    `,
  ],
})
export class DetalheTrilhaComponent {
  trilhaId = this.route.snapshot.paramMap.get('id') ?? 'desconhecida';

  constructor(private readonly route: ActivatedRoute) {}
}
