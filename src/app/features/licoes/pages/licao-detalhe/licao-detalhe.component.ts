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
import { CodeTerminalComponent, CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';

@Component({
  standalone: true,
  selector: 'app-licao-detalhe',
  imports: [CommonModule, CodeTerminalComponent],
  template: `
    <ng-container *ngIf="licao() as licaoAtual; else carregando">
      <div class="licao-container">
        <!-- Header da Lição -->
        <header class="licao-header">
          <div class="header-content">
            <h2 class="licao-title">{{ licaoAtual.titulo }}</h2>
            <div class="licao-meta">
              <span class="badge-nivel">{{ licaoAtual.nivel }}</span>
              <span class="separator">·</span>
              <span class="duration">{{ licaoAtual.tempoEstimadoMinutos }} min</span>
            </div>
          </div>
          <p class="licao-description">{{ licaoAtual.descricaoCurta }}</p>
        </header>

        <!-- Layout Principal: 3 Colunas (Desktop) / Stack (Mobile) -->
        <div class="licao-layout">
          
          <!-- 1. Painel Explicação -->
          <section class="painel-explicacao">
            <h3 class="painel-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              Explicação
            </h3>
            <div class="conteudo-texto">
              <!-- TODO: Conteúdo dinâmico vindo da lição -->
              <p>Nesta lição, você vai aprender os conceitos fundamentais de Binding no Angular:</p>
              <ul>
                <li><strong>Interpolação:</strong> Exibir valores dinâmicos no template.</li>
                <li><strong>Property Binding:</strong> Controlar propriedades de elementos HTML e componentes.</li>
                <li><strong>Event Binding:</strong> Reagir a ações do usuário.</li>
                <li><strong>Two-way Binding:</strong> Sincronizar dados entre template e classe.</li>
              </ul>
              <p>Use o editor ao lado para ver esses conceitos em ação.</p>
            </div>
          </section>

          <!-- 2. Painel Código (Terminal) -->
          <section class="painel-codigo">
            <h3 class="painel-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              Código
            </h3>
            <app-code-terminal [files]="codeFiles()"></app-code-terminal>
          </section>

          <!-- 3. Painel Demo -->
          <section class="painel-demo">
            <h3 class="painel-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              Demo Interativa
            </h3>
            
            <div class="demo-wrapper">
              <ng-container #demoContainer></ng-container>
            </div>

            <div class="demo-actions">
              <button class="btn-concluir" (click)="marcarComoConcluida()">
                Marcar como concluída
              </button>
            </div>
          </section>

        </div>
      </div>
    </ng-container>

    <ng-template #carregando>
      <div class="loading-state">
        <p>Carregando lição...</p>
      </div>
    </ng-template>
  `,
  styles: [`
    .licao-container {
      padding: var(--spacing-6);
      max-width: 1600px;
      margin: 0 auto;
    }

    .licao-header {
      margin-bottom: var(--spacing-8);
      border-bottom: 1px solid var(--color-border-default);
      padding-bottom: var(--spacing-6);
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
      margin-bottom: var(--spacing-2);
      flex-wrap: wrap;
    }

    .licao-title {
      font-size: var(--font-size-h2);
      font-weight: var(--font-weight-bold);
      margin: 0;
      color: var(--color-text-primary);
    }

    .licao-meta {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      font-size: var(--font-size-body);
      color: var(--color-text-secondary);
    }

    .badge-nivel {
      background-color: var(--color-bg-surface-alt);
      padding: 2px 8px;
      border-radius: var(--radius-sm);
      font-size: var(--font-size-caption);
      font-weight: var(--font-weight-medium);
      text-transform: uppercase;
    }

    .licao-description {
      font-size: var(--font-size-body);
      color: var(--color-text-secondary);
      margin: 0;
      max-width: 800px;
    }

    /* Layout Grid de 3 Colunas */
    .licao-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--spacing-8);

      /* Desktop: 3 colunas */
      @media (min-width: 1280px) {
        grid-template-columns: 300px 1fr 400px; /* Explicação | Código | Demo */
        align-items: start;
      }
      
      /* Tablet Large: 2 colunas (Explicação full, Código | Demo) */
      @media (min-width: 1024px) and (max-width: 1279px) {
        grid-template-columns: 1fr 1fr;
        
        .painel-explicacao {
          grid-column: 1 / -1;
        }
      }
    }

    .painel-title {
      font-size: var(--font-size-h4);
      font-weight: var(--font-weight-semibold);
      margin-bottom: var(--spacing-4);
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      color: var(--color-text-primary);
      
      svg {
        color: var(--color-accent-primary);
      }
    }

    .conteudo-texto {
      color: var(--color-text-secondary);
      line-height: 1.6;
      
      ul {
        padding-left: var(--spacing-5);
        margin-bottom: var(--spacing-4);
      }
      
      li {
        margin-bottom: var(--spacing-2);
      }
    }

    .demo-wrapper {
      margin-bottom: var(--spacing-6);
    }

    .btn-concluir {
      width: 100%;
      padding: var(--spacing-3);
      background-color: var(--color-accent-primary);
      color: var(--color-text-inverse);
      border: none;
      border-radius: var(--radius-md);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: opacity var(--transition-fast);

      &:hover {
        opacity: 0.9;
      }
    }

    .loading-state {
      display: flex;
      justify-content: center;
      padding: var(--spacing-10);
      color: var(--color-text-secondary);
    }
  `]
})
export class LicaoDetalheComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly trilhasStore = inject(TrilhasStore);

  // Usar setter para reagir quando o container estiver disponível no DOM
  @ViewChild('demoContainer', { read: ViewContainerRef })
  set demoContainer(vcr: ViewContainerRef | undefined) {
    if (vcr) {
      this._demoContainer = vcr;
      this.carregarDemo();
    }
  }

  private _demoContainer?: ViewContainerRef;
  private demoRef?: ComponentRef<unknown>;

  private readonly licaoId = signal<string | null>(null);

  readonly licao = computed<Licao | undefined>(() => {
    const id = this.licaoId();
    if (!id) return undefined;
    return this.trilhasStore.obterLicao(id);
  });

  // Mock de arquivos para o terminal (idealmente viria do modelo da lição)
  readonly codeFiles = signal<CodeFile[]>([
    {
      name: 'demo.component.ts',
      language: 'typescript',
      content: `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html'
})
export class DemoComponent {
  titulo = signal('Curso Angular');
  nivel = signal('Iniciante');
  
  atualizarTitulo(novoTitulo: string) {
    this.titulo.set(novoTitulo);
  }
}`
    },
    {
      name: 'demo.component.html',
      language: 'html',
      content: `<div class="card">
  <!-- Interpolação -->
  <h3>{{ titulo() }}</h3>
  
  <!-- Property Binding -->
  <span [class]="nivel()">{{ nivel() }}</span>
  
  <!-- Event Binding -->
  <input 
    [value]="titulo()" 
    (input)="atualizarTitulo($event.target.value)"
  >
</div>`
    },
    {
      name: 'demo.component.css',
      language: 'css',
      content: `.card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

h3 {
  color: #333;
}`
    }
  ]);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.licaoId.set(id);
      // Tenta carregar demo caso o container já exista (navegação entre lições)
      this.carregarDemo();
    });
  }

  ngOnDestroy(): void {
    this.demoRef?.destroy();
  }

  private carregarDemo(): void {
    if (!this._demoContainer) return;
    
    this._demoContainer.clear();
    const l = this.licao();
    if (!l) return;

    const componente = l.componenteDemo as Type<unknown>;
    if (componente) {
      this.demoRef = this._demoContainer.createComponent(componente);
    }
  }

  marcarComoConcluida(): void {
    const id = this.licaoId();
    if (!id) return;

    this.trilhasStore.marcarLicaoConcluida(id, true);
  }
}
