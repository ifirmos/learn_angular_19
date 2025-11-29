export interface Licao {
  id: string;
  titulo: string;
  descricaoCurta: string;
  nivel: 'iniciante' | 'intermediario';
  categoria: string;
  tempoEstimadoMinutos: number;
  concluida: boolean;
}

export interface Trilha {
  id: string;
  titulo: string;
  descricao: string;
  nivel: 'iniciante' | 'intermediario';
  licoes: Licao[];

  progresso?: number; // usado no dashboard como progresso estimado
}
