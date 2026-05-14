import { ChangeDetectionStrategy, Component, effect, output, signal } from '@angular/core';
import { CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-event-binding',
  imports: [],
  templateUrl: './demo-event-binding.component.html',
  styleUrl: './demo-event-binding.component.scss'
})
export class DemoEventBindingComponent {
  readonly contador = signal<number>(0);
  readonly historico = signal<Array<{tipo: string, texto: string}>>([]);

  readonly codeChange = output<CodeFile[]>();

  constructor() {
    effect(() => {
      // Monitoramos o contador e histórico para atualizar o código
      // (Na prática o código é estático, mas isso força a atualização quando o componente carrega)
      const count = this.contador();
      
      this.codeChange.emit([
        { 
          name: 'TypeScript', 
          language: 'typescript', 
          content: `// 1. Signal para o estado do contador
contador = signal(${count});

// 2. Métodos chamados pelos eventos
incrementar() {
  // update() usa o valor atual para calcular o próximo
  this.contador.update(valor => valor + 1);
}

decrementar() {
  this.contador.update(valor => valor - 1);
}

resetar() {
  this.contador.set(0); // set() define um novo valor absoluto
}` 
        },
        { 
          name: 'HTML', 
          language: 'html', 
          content: `<!-- O evento (click) chama o método incrementar() -->
<button (click)="incrementar()">
  Incrementar
</button>

<button (click)="decrementar()">
  Decrementar
</button>

<!-- Mostra o valor atual do signal -->
<span [class.positivo]="contador() > 0">
  {{ contador() }}
</span>` 
        },
        { 
          name: 'CSS', 
          language: 'css', 
          content: `button {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.positivo {
  color: green;
  font-weight: bold;
}` 
        }
      ]);
    });
  }

  incrementar(): void {
    this.contador.update(v => v + 1);
    this.adicionarHistorico('increment', '+1');
  }

  decrementar(): void {
    this.contador.update(v => v - 1);
    this.adicionarHistorico('decrement', '-1');
  }

  resetar(): void {
    this.contador.set(0);
    this.adicionarHistorico('reset', '0');
  }

  private adicionarHistorico(tipo: string, texto: string): void {
    this.historico.update(h => [...h.slice(-4), { tipo, texto }]);
  }
}
