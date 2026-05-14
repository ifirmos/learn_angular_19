import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface CodeFile {
  name: string;
  language: string;
  content: string;
}

// Interface para tipagem forte
interface Produto {
  nome: string;
  preco: number;
  emEstoque: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-demo-typescript-tipos',
  imports: [FormsModule],
  templateUrl: './demo-typescript-tipos.component.html',
  styleUrl: './demo-typescript-tipos.component.scss'
})
export class DemoTypescriptTiposComponent {
  // Signal com objeto tipado
  readonly produto = signal<Produto>({
    nome: 'Curso Angular 21',
    preco: 197.00,
    emEstoque: true
  });

  // Computed para valor formatado
  readonly precoFormatado = computed(() => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(this.produto().preco);
  });

  // Método tipado para atualização
  atualizarProduto<K extends keyof Produto>(
    chave: K, 
    valor: Produto[K]
  ): void {
    this.produto.update(p => ({
      ...p,
      [chave]: valor
    }));
  }

  // Código sincronizado para o terminal
  readonly codeFiles = computed<CodeFile[]>(() => {
    const p = this.produto();
    return [
      {
        name: 'TypeScript',
        language: 'typescript',
        content: `// Interface para tipagem forte
interface Produto {
  nome: string;
  preco: number;
  emEstoque: boolean;
}

// Objeto tipado usando a interface
const produto: Produto = {
  nome: "${p.nome}",
  preco: ${p.preco},
  emEstoque: ${p.emEstoque}
};

// TypeScript garante que o objeto
// siga a estrutura da interface!`
      },
      {
        name: 'HTML',
        language: 'html',
        content: `<div class="preview">
  <h3>{{ produto().nome }}</h3>
  <p>Preço: {{ produto().preco | currency }}</p>
  
  <span [class.disponivel]="produto().emEstoque">
    {{ produto().emEstoque ? 'Em Estoque' : 'Indisponível' }}
  </span>
</div>`
      },
      {
        name: 'CSS',
        language: 'css',
        content: `.preview {
  padding: 1.5rem;
  background: var(--color-bg-surface);
  border-radius: 8px;
  border: 1px solid var(--color-border-default);
}

.disponivel {
  color: var(--color-state-success);
  font-weight: 500;
}`
      }
    ];
  });
}
