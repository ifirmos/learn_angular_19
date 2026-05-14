import { Injectable } from '@angular/core';
import { ProgressRepository } from './progress.repository';

const STORAGE_KEY = 'learn-angular21-progress';

@Injectable({ providedIn: 'root' })
export class LocalStorageProgressRepository implements ProgressRepository {
  carregar(): Record<string, boolean> {
    if (typeof localStorage === 'undefined') {
      return {};
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      return JSON.parse(raw) as Record<string, boolean>;
    } catch {
      return {};
    }
  }

  salvar(mapa: Record<string, boolean>): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mapa));
    } catch {
      // TODO: adicionar logging
    }
  }
}
