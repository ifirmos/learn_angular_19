import { ChangeDetectionStrategy, Component, effect, output, signal } from '@angular/core';
import { CodeFile } from '../../../../shared/components/code-terminal/code-terminal.component';
import { FormsModule } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-property-binding',
  imports: [FormsModule],
  templateUrl: './demo-property-binding.component.html',
  styleUrl: './demo-property-binding.component.scss'
})
export class DemoPropertyBindingComponent {
  readonly cores = [
    { nome: 'Azul', valor: '#3B82F6' },
    { nome: 'Verde', valor: '#22C55E' },
    { nome: 'Roxo', valor: '#8B5CF6' },
    { nome: 'Rosa', valor: '#EC4899' }
  ];
  
  readonly corSelecionada = signal<string>('#3B82F6');
  readonly tamanhoTexto = signal<number>(18);

  readonly codeChange = output<CodeFile[]>();

  constructor() {
    effect(() => {
      const cor = this.corSelecionada();
      const tamanho = this.tamanhoTexto();

      this.codeChange.emit([
        { 
          name: 'TypeScript', 
          language: 'typescript', 
          content: `// 1. Array de objetos com os dados das cores
readonly cores = [
  { nome: 'Azul',  valor: '#3B82F6' },
  { nome: 'Verde', valor: '#22C55E' },
  { nome: 'Roxo',  valor: '#8B5CF6' },
  { nome: 'Rosa',  valor: '#EC4899' }
];

// 2. Signal que armazena a cor atual (Começa com Azul)
// Valor atual: "${cor}"
corFundo = signal('${cor}');

// Signal para o tamanho (pixels)
tamanho = signal(${tamanho});` 
        },
        { 
          name: 'HTML', 
          language: 'html', 
          content: `<!-- --- EXEMPLE 1: Binding em Botões --- -->
<!-- O [style.background] aplica a cor de cada botão -->
<button 
  *for="let cor of cores"
  [style.background]="cor.valor"
  (click)="corFundo.set(cor.valor)">
  {{ cor.nome }}
</button>

<!-- --- EXEMPLO 2: Binding no Elemento Alvo --- -->
<!-- O estilo muda dinamicamente quando o signal atualiza -->
<div [style.background]="corFundo()">
  Cor dinâmica: {{ corFundo() }}
</div>

<p [style.fontSize.px]="tamanho()">
  Tamanho: {{ tamanho() }}px
</p>` 
        },
        { 
          name: 'CSS', 
          language: 'css', 
          content: `button {
  border: 2px solid white;
  margin-right: 8px;
  /* ... outros estilos ... */
}

div {
  padding: 2rem;
  border-radius: 8px;
  color: white;
  transition: all 0.2s; /* Animação suave */
}` 
        }
      ]);
    });
  }
}
