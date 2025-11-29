import {
  Component,
  ComponentRef,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { TrilhasStore } from '../../../../core/services/trilhas-store.service';
import { Licao } from '../../../../shared/models/licao.model';

@Component({
  standalone: true,
  selector: 'app-licao-detalhe',
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="licao() as licaoAtual; else carregando">
      <section class="licao-detalhe">
        <header class="licao-header">
          <h2>{{ licaoAtual.titulo }}</h2>
          <p>{{ licaoAtual.descricaoCurta }}</p>
          <p>
            Nível: {{ licaoAtual.nivel }} ·
            Duração: {{ licaoAtual.tempoEstimadoMinutos }} min
          </p>
        </header>

        <div class="licao-layout">
          <section class="painel-explicacao">
            <h3>Explicação</h3>
            <ul>
              <li>
                Entenda como tipos básicos em TypeScript são usados em
                componentes Angular.
              </li>
              <li>
                Observe o fluxo: valor digitado → signal → template via
                interpolação.
              </li>
              <li>
                Foque na relação entre o campo de input e a mensagem derivada.
              </li>
            </ul>
          </section>

          <section class="painel-codigo">
            <h3>Trechos de código</h3>

            <h4>TypeScript</h4>
            <pre><code>
readonly nome = signal&lt;string&gt;('');
readonly saudacao = computed(
  () =&gt; this.nome().trim()
    ? 'Olá, ' + this.nome() + '!'
    : 'Digite seu nome acima.'
);
            </code></pre>

            <h4>Template</h4>
            <pre><code>
&lt;input
  type="text"
  [ngModel]="nome()"
  (ngModelChange)="nome.set($event)"
/>

&lt;p&gt;{{ saudacao() }}&lt;/p&gt;
            </code></pre>
          </section>

          <section class="painel-demo">
            <h3>Demo interativa</h3>

            <ng-container #demoContainer></ng-container>

            <button type="button" (click)="marcarComoConcluida()">
              Marcar lição como concluída
            </button>
          </section>
        </div>
      </section>
    </ng-container>

    <ng-template #carregando>
      <p>Carregando lição...</p>
    </ng-template>
  `,
})
export class LicaoDetalheComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly trilhasStore = inject(TrilhasStore);

  @ViewChild('demoContainer', { read: ViewContainerRef, static: true })
  demoContainer!: ViewContainerRef;

  private demoRef?: ComponentRef<unknown>;

  private readonly licaoId = signal<string | null>(null);

  readonly licao = computed<Licao | undefined>(() => {
    const id = this.licaoId();
    if (!id) return undefined;
    return this.trilhasStore.obterLicao(id);
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.licaoId.set(id);
      this.carregarDemo();
    });
  }

  ngOnDestroy(): void {
    this.demoRef?.destroy();
  }

  private carregarDemo(): void {
    this.demoContainer.clear();
    const l = this.licao();
    if (!l) return;

    const componente = l.componenteDemo as Type<unknown>;
    this.demoRef = this.demoContainer.createComponent(componente);
  }

  marcarComoConcluida(): void {
    const id = this.licaoId();
    if (!id) return;

    this.trilhasStore.marcarLicaoConcluida(id, true);
  }
}
