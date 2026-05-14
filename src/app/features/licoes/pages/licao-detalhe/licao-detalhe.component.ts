import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  DestroyRef,
  Type,
  ViewChild,
  ViewContainerRef,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { TrilhasStore } from '../../../../core/services/trilhas-store.service';
import { Licao, ConteudoTeoria } from '../../../../shared/models/licao.model';
import { Trilha } from '../../../../shared/models/trilha.model';
import { CodeTerminalComponent, CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';
import { LicaoExplicacaoComponent } from '../../components/licao-explicacao/licao-explicacao.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-licao-detalhe',
  imports: [CodeTerminalComponent, RouterLink, LicaoExplicacaoComponent],
  templateUrl: './licao-detalhe.component.html',
  styleUrl: './licao-detalhe.component.scss'
})
export class LicaoDetalheComponent {
  private readonly router = inject(Router);
  private readonly trilhasStore = inject(TrilhasStore);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('demoContainer', { read: ViewContainerRef })
  set demoContainer(vcr: ViewContainerRef | undefined) {
    this._demoContainer = vcr;
    if (vcr) {
      this.carregarDemo();
    }
  }

  private _demoContainer?: ViewContainerRef;
  private demoRef?: ComponentRef<unknown>;
  private demoInstance: any = null;
  private syncInterval: any = null;

  // withComponentInputBinding() maps route param :id to this input
  readonly id = input<string>();

  // Signal para armazenar os codeFiles sincronizados da demo
  readonly demoCodeFiles = signal<CodeFile[] | null>(null);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.demoRef?.destroy();
      if (this.syncInterval) {
        clearInterval(this.syncInterval);
      }
    });
  }

  readonly licao = computed<Licao | undefined>(() => {
    const id = this.id();
    if (!id) return undefined;
    return this.trilhasStore.obterLicao(id);
  });

  readonly trilhaAtual = computed<Trilha | undefined>(() => {
    const l = this.licao();
    if (!l) return undefined;
    return this.trilhasStore.obterTrilha(l.trilhaId);
  });

  readonly totalLicoes = computed(() => {
    const trilha = this.trilhaAtual();
    return trilha?.licoes.length || 0;
  });

  readonly licaoAnterior = computed<Licao | undefined>(() => {
    const trilha = this.trilhaAtual();
    const atual = this.licao();
    if (!trilha || !atual) return undefined;
    
    const ordenada = [...trilha.licoes].sort((a, b) => a.ordem - b.ordem);
    const idx = ordenada.findIndex(l => l.id === atual.id);
    return idx > 0 ? ordenada[idx - 1] : undefined;
  });

  readonly licaoProxima = computed<Licao | undefined>(() => {
    const trilha = this.trilhaAtual();
    const atual = this.licao();
    if (!trilha || !atual) return undefined;
    
    const ordenada = [...trilha.licoes].sort((a, b) => a.ordem - b.ordem);
    const idx = ordenada.findIndex(l => l.id === atual.id);
    return idx < ordenada.length - 1 ? ordenada[idx + 1] : undefined;
  });

  // Computed que usa os codeFiles sincronizados ou gera fallback
  readonly codeFiles = computed<CodeFile[]>(() => {
    // Usa os codeFiles sincronizados da demo se disponíveis
    const demoFiles = this.demoCodeFiles();
    if (demoFiles) {
      return demoFiles;
    }
    
    // Fallback para código estático
    const l = this.licao();
    if (!l) return [];
    
    return this.gerarCodigoEstatico(l.id);
  });

  private gerarCodigoEstatico(licaoId: string): CodeFile[] {
    // Fallback estático para ts-tipos-primitivos
    if (licaoId === 'ts-tipos-primitivos') {
      return [
        { name: 'TypeScript', language: 'typescript', content: `// Tipos primitivos
let nome: string = "Angular";
let idade: number = 19;
let ativo: boolean = true;

// TypeScript infere o tipo automaticamente
let framework = "Angular"; // string` },
        { name: 'HTML', language: 'html', content: `<div class="preview">
  <p>Nome: {{ nome() }}</p>
  <p>Idade: {{ idade() }}</p>
  <p>Ativo: {{ ativo() }}</p>
</div>` },
        { name: 'CSS', language: 'css', content: `.preview {
  padding: 1rem;
  background: var(--color-bg-surface-alt);
  border-radius: 8px;
}` }
      ];
    }
    
    if (licaoId === 'bindings-interpolacao') {
      return [
        { name: 'TypeScript', language: 'typescript', content: `import { signal } from '@angular/core';

mensagem = signal('Olá, Angular 21!');` },
        { name: 'HTML', language: 'html', content: `<!-- Interpolação com {{ }} -->
<h1>{{ mensagem() }}</h1>

<!-- Expressões também funcionam -->
<p>{{ 2 + 2 }}</p>
<p>{{ mensagem().toUpperCase() }}</p>` },
        { name: 'CSS', language: 'css', content: `h1 {
  color: var(--color-text-primary);
}` }
      ];
    }
    
    if (licaoId === 'bindings-property') {
      return [
        { name: 'TypeScript', language: 'typescript', content: `corFundo = signal('#3B82F6');
tamanho = signal(18);` },
        { name: 'HTML', language: 'html', content: `<!-- Property binding com [ ] -->
<div [style.background]="corFundo()">
  Cor dinâmica
</div>

<p [style.fontSize.px]="tamanho()">
  Tamanho dinâmico
</p>

<button [disabled]="carregando()">
  Enviar
</button>` },
        { name: 'CSS', language: 'css', content: `div {
  padding: 2rem;
  border-radius: 8px;
  transition: all 0.2s;
}` }
      ];
    }
    
    if (licaoId === 'bindings-event') {
      return [
        { name: 'TypeScript', language: 'typescript', content: `contador = signal(0);

incrementar() {
  this.contador.update(v => v + 1);
}

decrementar() {
  this.contador.update(v => v - 1);
}` },
        { name: 'HTML', language: 'html', content: `<!-- Event binding com ( ) -->
<button (click)="incrementar()">+</button>
<span>{{ contador() }}</span>
<button (click)="decrementar()">-</button>

<!-- Acesso ao evento -->
<input (input)="onInput($event)" />` },
        { name: 'CSS', language: 'css', content: `button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}` }
      ];
    }
    
    // Default para lições de síntese
    return [
      { name: 'TypeScript', language: 'typescript', content: `// Código completo da demo` },
      { name: 'HTML', language: 'html', content: `<!-- Template da demo -->` },
      { name: 'CSS', language: 'css', content: `/* Estilos da demo */` }
    ];
  }

  private carregarDemo(): void {
    if (!this._demoContainer) return;
    
    const licaoAtual = this.licao();
    if (!licaoAtual?.componenteDemo) return;

    // Limpa sincronização anterior
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
    this.demoCodeFiles.set(null);

    this._demoContainer.clear();
    this.demoRef?.destroy();

    this.demoRef = this._demoContainer.createComponent(
      licaoAtual.componenteDemo as Type<unknown>
    );
    
    // Guarda referência à instância do demo para acessar codeFiles reativo
    this.demoInstance = this.demoRef.instance;
    const instance = this.demoInstance as any;

    // 1. Verifica se o componente tem Output 'codeChange'
    if (instance.codeChange && typeof instance.codeChange.subscribe === 'function') {
      instance.codeChange.subscribe((files: CodeFile[]) => {
        this.demoCodeFiles.set(files);
      });
    }

    // 2. Fallback: Inicia polling para demos legados ou que expõem signals diretos
    // Função que tenta gerar codeFiles baseado nos signals do demo
    const gerarCodeFilesDinamico = (): CodeFile[] | null => {
      try {
        // Tenta usar codeFiles() se existir
        if (typeof instance.codeFiles === 'function') {
          const files = instance.codeFiles();
          if (Array.isArray(files) && files.length > 0) {
            return files;
          }
        }

        // Fallback manual para Primitivos
        if (instance.nome && instance.idade && instance.ativo) {
          const nome = typeof instance.nome === 'function' ? instance.nome() : instance.nome;
          const idade = typeof instance.idade === 'function' ? instance.idade() : instance.idade;
          const ativo = typeof instance.ativo === 'function' ? instance.ativo() : instance.ativo;
          
          return [
            {
              name: 'TypeScript',
              language: 'typescript',
              content: `// Tipos primitivos
let nome: string = "${nome}";
let idade: number = ${idade};
let ativo: boolean = ${ativo};

// TypeScript infere o tipo automaticamente
let framework = "Angular"; // string`
            },
            {
              name: 'HTML',
              language: 'html',
              content: `<div class="preview">
  <p>Nome: {{ nome() }}</p>
  <p>Idade: {{ idade() }}</p>
  <p>Ativo: {{ ativo() }}</p>
</div>`
            },
            {
              name: 'CSS',
              language: 'css',
              content: `.preview {
  padding: 1rem;
  background: var(--color-bg-surface-alt);
  border-radius: 8px;
}`
            }
          ];
        }
      } catch (e) {
        // Ignora erros
      }
      return null;
    };
    
    // Atualiza imediatamente se possível
    const initialFiles = gerarCodeFilesDinamico();
    if (initialFiles) {
      this.demoCodeFiles.set(initialFiles);
    }
    
    // Inicia polling para manter sincronizado (50ms para responsividade)
    this.syncInterval = setInterval(() => {
      const files = gerarCodeFilesDinamico();
      if (files) {
        this.demoCodeFiles.set(files);
      }
    }, 50);
  }

  marcarComoConcluida(): void {
    const id = this.id();
    if (id) {
      this.trilhasStore.toggleConclusao(id);
    }
  }

  navegarParaLicao(licao: Licao | undefined): void {
    if (licao) {
      this.router.navigate(['/licoes', licao.id]);
    }
  }
}
