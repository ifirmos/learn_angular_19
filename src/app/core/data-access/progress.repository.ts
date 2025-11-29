export abstract class ProgressRepository {
  abstract carregar(): Record<string, boolean>;
  abstract salvar(mapa: Record<string, boolean>): void;
}
