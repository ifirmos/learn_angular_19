import { Licao } from './licao.model';

export interface Trilha {
  id: string;
  titulo: string;
  descricao: string;
  nivel: 'iniciante' | 'intermediario';
  categoriaPrincipal?: string;
  licoes: Licao[];
}
