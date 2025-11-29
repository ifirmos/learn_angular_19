import { Type } from '@angular/core';
import { ConfiguracaoDemo } from './configuracao-demo.model';

export interface Licao {
  id: string;
  trilhaId: string;
  titulo: string;
  descricaoCurta: string;
  nivel: 'iniciante' | 'intermediario';
  categoria: string;
  tempoEstimadoMinutos: number;
  concluida: boolean;
  componenteDemo: Type<unknown>;
  configuracaoDemo?: ConfiguracaoDemo;
}
