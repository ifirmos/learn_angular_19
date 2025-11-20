import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Trilha, Licao } from '../../models/trilha.model';
import { TrilhasService } from '../../services/trilhas.service';
import { DemoBindingsBasicosComponent } from '../demos/demo-bindings-basicos.component';

@Component({
  selector: 'app-licao-detalhe',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TagModule, RouterLink, DemoBindingsBasicosComponent],
  template: `
    @if (licao && trilha) {
      <section class="cabecalho">
        <p class="subtitulo">Lição</p>
        <h2>{{ licao.titulo }}</h2>
        <p class="descricao">{{ licao.descricaoCurta }}</p>
        <div class="meta">
          <p-tag [value]="licao.categoria" severity="info"></p-tag>
          <span class="tempo">{{ licao.tempoEstimadoMinutos }} min</span>
          <span class="trilha">Trilha: {{ trilha.titulo }}</span>
        </div>
      </section>

      <section class="painel-licao">
        <p-card header="Explicação" class="card-escuro">
          <p>
            Esta lição mostra como interpolação, property binding e event binding deixam a interface reativa em tempo real. Use os
            controles ao lado para alterar o texto e o tamanho exibidos.
          </p>
        </p-card>
        <p-card header="Código" class="card-escuro">
          <pre class="bloco-codigo"><code>texto = signal('Angular 19');
tamanhoFonte = signal(24);

atualizarTexto(valor: string) {
  texto.set(valor);
}

atualizarTamanho(valor: number) {
  tamanhoFonte.set(valor);
}</code></pre>
          <p class="nota-codigo">O template usa {{'{{ texto() }}'}} para interpolação e [style.fontSize.px] para o binding.</p>
        </p-card>
        <p-card header="Demonstração interativa" class="card-escuro">
          @if (licao.id === 'bindings-basicos') {
            <app-demo-bindings-basicos></app-demo-bindings-basicos>
          } @else {
            <p>Demonstração interativa ainda não implementada para esta lição.</p>
          }
          <button
            pButton
            type="button"
            label="Marcar como concluída"
            icon="pi pi-check"
            class="botao-concluir"
            (click)="marcarComoConcluida()"
          ></button>
        </p-card>
      </section>
    } @else {
      <section class="cabecalho">
        <p class="subtitulo">Lição</p>
        <h2>Lição não encontrada</h2>
        <p class="descricao">Não encontramos a lição solicitada. Volte para a lista de trilhas para escolher outra.</p>
        <a pButton label="Voltar para trilhas" styleClass="p-button-text" routerLink="/trilhas"></a>
      </section>
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

      .meta {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        color: #cbd5e1;
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

      .bloco-codigo {
        background: #0b1220;
        color: #e5e7eb;
        padding: 0.75rem;
        border-radius: 8px;
        overflow: auto;
        font-family: 'SFMono-Regular', 'Consolas', 'Liberation Mono', monospace;
        font-size: 0.95rem;
      }

      .nota-codigo {
        color: #cbd5e1;
        margin-top: 0.5rem;
      }

      .botao-concluir {
        margin-top: 0.75rem;
      }
    `,
  ],
})
export class LicaoDetalheComponent implements OnInit {
  trilha: Trilha | null = null;
  licao: Licao | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly trilhasService: TrilhasService
  ) {}

  ngOnInit(): void {
    const licaoId = this.route.snapshot.paramMap.get('id');
    if (licaoId) {
      const resultado = this.trilhasService.obterLicaoPorId(licaoId);
      if (resultado) {
        this.trilha = resultado.trilha;
        this.licao = resultado.licao;
      }
    }
  }

  marcarComoConcluida(): void {
    if (!this.licao) {
      return;
    }

    this.trilhasService.marcarLicaoComoConcluida(this.licao.id);
    const resultadoAtualizado = this.trilhasService.obterLicaoPorId(this.licao.id);
    if (resultadoAtualizado) {
      this.trilha = resultadoAtualizado.trilha;
      this.licao = resultadoAtualizado.licao;
    }
  }
}
