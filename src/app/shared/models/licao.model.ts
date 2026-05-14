import { Type } from '@angular/core';
import { ConfiguracaoDemo } from './configuracao-demo.model';

/** Subtópico da seção teórica */
export interface Subtopico {
  titulo: string;
  conteudo: string;
  codigoExemplo?: string;
}

/** Analogia para facilitar compreensão */
export interface Analogia {
  titulo: string;
  descricao: string;
}

/** Conteúdo teórico estruturado da lição */
export interface ConteudoTeoria {
  introducao: string;
  subtopicos: Subtopico[];
  analogia: Analogia;
}

/** Tipo de lição na trilha */
export type TipoLicao = 'conceito' | 'sintese';

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
  
  // Novos campos para progressão pedagógica
  ordem: number;
  tipoLicao: TipoLicao;
  conteudoTeoria?: ConteudoTeoria;
  habilidadesChave?: string[];
  layout?: 'padrao' | 'demo-largura-total';
}

