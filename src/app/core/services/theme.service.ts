import { Injectable, signal } from '@angular/core';
import {
  themes,
  type ThemeName,
  typography,
  spacing,
  radius,
  shadows,
  transitions,
} from '../../shared/theme/theme-tokens';

/**
 * ThemeService
 * 
 * Responsável por:
 * - Gerenciar o tema ativo (midnight, sandstone, focus)
 * - Aplicar tokens de design como CSS custom properties
 * - Persistir preferência de tema no localStorage
 * - Expor tema atual via signal para componentes reagirem
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'learn-angular21-theme';
  
  // Signal para tema atual (permite componentes reagirem à mudança)
  readonly currentTheme = signal<ThemeName>('midnight');

  /**
   * Inicializa o serviço de tema
   * - Carrega tema salvo ou usa 'midnight' como padrão
   * - Aplica o tema imediatamente
   */
  constructor() {
    const savedTheme = this.loadThemeFromStorage();
    this.setTheme(savedTheme);
  }

  /**
   * Define o tema ativo e aplica os tokens
   */
  setTheme(theme: ThemeName): void {
    this.currentTheme.set(theme);
    this.aplicarTema(theme);
    this.saveThemeToStorage(theme);
  }

  /**
   * Alterna entre os temas disponíveis
   */
  toggleTheme(): void {
    const current = this.currentTheme();
    const next: ThemeName = current === 'midnight' ? 'sandstone' : current === 'sandstone' ? 'focus' : 'midnight';
    this.setTheme(next);
  }

  /**
   * Aplica todos os tokens de design como CSS custom properties
   */
  private aplicarTema(theme: ThemeName): void {
    const root = document.documentElement;
    const colorTokens = themes[theme];

    // Aplicar atributo data-theme para hooks CSS adicionais
    root.setAttribute('data-theme', theme);

    // === CORES ===
    // Background
    root.style.setProperty('--color-bg-body', colorTokens.bg.body);
    root.style.setProperty('--color-bg-surface', colorTokens.bg.surface);
    root.style.setProperty('--color-bg-surface-alt', colorTokens.bg.surfaceAlt);

    // Text
    root.style.setProperty('--color-text-primary', colorTokens.text.primary);
    root.style.setProperty('--color-text-secondary', colorTokens.text.secondary);
    root.style.setProperty('--color-text-inverse', colorTokens.text.inverse);

    // Border
    root.style.setProperty('--color-border-default', colorTokens.border.default);

    // Accent
    root.style.setProperty('--color-accent-primary', colorTokens.accent.primary);
    root.style.setProperty('--color-accent-muted', colorTokens.accent.muted);

    // State
    root.style.setProperty('--color-state-success', colorTokens.state.success);
    root.style.setProperty('--color-state-warning', colorTokens.state.warning);
    root.style.setProperty('--color-state-error', colorTokens.state.error);
    root.style.setProperty('--color-state-info', colorTokens.state.info);

    // === TIPOGRAFIA ===
    // Famílias
    root.style.setProperty('--font-family-sans', typography.family.sans);
    root.style.setProperty('--font-family-mono', typography.family.mono);

    // Tamanhos
    Object.entries(typography.size).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${this.kebabCase(key)}`, value);
    });

    // Line heights
    Object.entries(typography.lineHeight).forEach(([key, value]) => {
      root.style.setProperty(`--line-height-${this.kebabCase(key)}`, String(value));
    });

    // Pesos
    Object.entries(typography.weight).forEach(([key, value]) => {
      root.style.setProperty(`--font-weight-${key}`, value);
    });

    // === ESPAÇAMENTOS ===
    Object.entries(spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    // === BORDER RADIUS ===
    Object.entries(radius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });

    // === SOMBRAS (ajustadas por tema) ===
    const shadowType = theme === 'sandstone' ? 'light' : 'dark';
    root.style.setProperty('--shadow-sm', shadows.sm[shadowType]);
    root.style.setProperty('--shadow-md', shadows.md[shadowType]);

    // === TRANSIÇÕES ===
    Object.entries(transitions).forEach(([key, value]) => {
      root.style.setProperty(`--transition-${key}`, value);
    });

    // Aplicar font-family no body
    document.body.style.fontFamily = typography.family.sans;
  }

  /**
   * Carrega tema salvo do localStorage
   */
  private loadThemeFromStorage(): ThemeName {
    if (typeof localStorage === 'undefined') {
      return 'midnight';
    }

    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved && (saved === 'midnight' || saved === 'sandstone' || saved === 'focus')) {
        return saved as ThemeName;
      }
    } catch (error) {
      console.error('Erro ao carregar tema do localStorage:', error);
    }

    return 'midnight';
  }

  /**
   * Salva tema atual no localStorage
   */
  private saveThemeToStorage(theme: ThemeName): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
    } catch (error) {
      console.error('Erro ao salvar tema no localStorage:', error);
    }
  }

  /**
   * Converte camelCase para kebab-case
   */
  private kebabCase(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }
}
