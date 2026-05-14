import { Licao } from './licao.model';

/** Camada pedagógica da trilha */
export type CamadaTrilha = 
  | 'onboarding'           // Camada 0: Setup e tour
  | 'fundamentos-ts'       // Camada 1: TypeScript básico
  | 'bindings-diretivas'   // Camada 2: Templates e Bindings
  | 'reatividade-forms'    // Camada 3: Signals e Formulários
  | 'arquitetura';         // Camada 4: Padrões e Qualidade

export interface Trilha {
  id: string;
  titulo: string;
  descricao: string;
  nivel: 'iniciante' | 'intermediario';
  categoriaPrincipal?: string;
  licoes: Licao[];
  
  // Novos campos para organização por camadas
  camada: CamadaTrilha;
  ordem: number;  // Posição dentro da camada
}

