import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-licao-detalhe',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  template: `
    <section class="cabecalho">
      <p class="subtitulo">Lição</p>
      <h2>Lição selecionada: {{ licaoId }}</h2>
      <p class="descricao">
        Estrutura base da página de lição. Aqui teremos explicação, código e demonstração interativa nas próximas fases.
      </p>
    </section>

    <section class="painel-licao">
      <p-card header="Explicação" class="card-escuro">
        <p>Texto curto explicando o conceito central da lição.</p>
      </p-card>
      <p-card header="Código" class="card-escuro">
        <p>Bloco para exibir trechos TS/HTML formatados.</p>
      </p-card>
      <p-card header="Demonstração interativa" class="card-escuro">
        <p>Placeholder do componente de demonstração que reagirá às ações do usuário.</p>
        <button pButton type="button" label="Marcar como concluída" icon="pi pi-check" class="botao-concluir"></button>
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

      .painel-licao {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 0.75rem;
      }

      .card-escuro ::ng-deep .p-card {
        background: #111827;
        border: 1px solid #1f2937;
        color: #e5e7eb;
      }

      .botao-concluir {
        margin-top: 0.75rem;
      }
    `,
  ],
})
export class LicaoDetalheComponent {
  licaoId = this.route.snapshot.paramMap.get('id') ?? 'desconhecida';

  constructor(private readonly route: ActivatedRoute) {}
}
