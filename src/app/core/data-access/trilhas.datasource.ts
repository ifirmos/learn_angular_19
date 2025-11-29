import { Trilha } from '../../shared/models/trilha.model';
import { Licao } from '../../shared/models/licao.model';

export abstract class TrilhasDataSource {
  abstract listarTrilhas(): Promise<Trilha[]>;
  abstract obterTrilhaPorId(id: string): Promise<Trilha | undefined>;
  abstract listarLicoes(): Promise<Licao[]>;
  abstract obterLicaoPorId(id: string): Promise<Licao | undefined>;
}
