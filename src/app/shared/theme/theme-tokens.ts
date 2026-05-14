/**
 * Design System - Plataforma Educacional Angular 21
 * 
 * Sistema de temas completo com 3 variantes:
 * - Midnight Neon (dark, padrão)
 * - Sandstone (light)
 * - Focus (high contrast/acessibilidade)
 */

export type ThemeName = 'midnight' | 'sandstone' | 'focus';

// ============================================================================
// INTERFACES DE TOKENS
// ============================================================================

export interface ColorTokens {
  bg: {
    body: string;
    surface: string;
    surfaceAlt: string;
  };
  text: {
    primary: string;
    secondary: string;
    inverse: string;
  };
  border: {
    default: string;
  };
  accent: {
    primary: string;
    muted: string;
  };
  state: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

// ============================================================================
// TEMAS
// ============================================================================

export const themes: Record<ThemeName, ColorTokens> = {
  /**
   * Midnight Neon - Tema escuro padrão
   * Focado em estudo prolongado, reduz fadiga ocular
   */
  midnight: {
    bg: {
      body: '#020617',
      surface: '#0F172A',
      surfaceAlt: '#111827',
    },
    text: {
      primary: '#E5E7EB',
      secondary: '#9CA3AF',
      inverse: '#F9FAFB',
    },
    border: {
      default: '#1F2937',
    },
    accent: {
      primary: '#22D3EE',
      muted: '#38BDF8',
    },
    state: {
      success: '#22C55E',
      warning: '#F97316',
      error: '#EF4444',
      info: '#3B82F6',
    },
  },

  /**
   * Sandstone - Tema claro
   * Neutro e confortável para leitura, sem branco puro
   */
  sandstone: {
    bg: {
      body: '#F4F4F5',
      surface: '#FFFFFF',
      surfaceAlt: '#F9FAFB',
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
      inverse: '#F9FAFB',
    },
    border: {
      default: '#E4E4E7',
    },
    accent: {
      primary: '#2563EB',
      muted: '#60A5FA',
    },
    state: {
      success: '#16A34A',
      warning: '#EA580C',
      error: '#DC2626',
      info: '#0284C7',
    },
  },

  /**
   * Focus - Alto contraste
   * Acessibilidade, ideal para baixa visão ou ambientes muito iluminados
   */
  focus: {
    bg: {
      body: '#000000',
      surface: '#050816',
      surfaceAlt: '#111827',
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#E5E7EB',
      inverse: '#000000',
    },
    border: {
      default: '#FACC15',
    },
    accent: {
      primary: '#FACC15',
      muted: '#FDE047',
    },
    state: {
      success: '#22C55E',
      warning: '#FBBF24',
      error: '#F97373',
      info: '#38BDF8',
    },
  },
};

// ============================================================================
// TIPOGRAFIA
// ============================================================================

export const typography = {
  // Famílias
  family: {
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',
    mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  
  // Tamanhos (escala racional)
  size: {
    display: '2rem',      // 32px - títulos principais
    h1: '1.5rem',         // 24px - títulos de página
    h2: '1.25rem',        // 20px - subtítulos
    body: '1rem',         // 16px - texto corrido
    caption: '0.8125rem', // 13px - labels, meta
    code: '0.875rem',     // 14px - blocos de código
  },
  
  // Line heights
  lineHeight: {
    display: '2.5rem',    // 40px
    h1: '2rem',           // 32px
    h2: '1.75rem',        // 28px
    body: '1.5rem',       // 24px
    caption: '1.125rem',  // 18px
    code: '1.5',          // relativo
  },
  
  // Pesos
  weight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

// ============================================================================
// ESPAÇAMENTOS
// ============================================================================

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '9999px',
} as const;

// ============================================================================
// SOMBRAS (ajustadas por tema via ThemeService)
// ============================================================================

export const shadows = {
  sm: {
    dark: '0 1px 3px rgba(15, 23, 42, 0.25)',
    light: '0 1px 3px rgba(15, 23, 42, 0.12)',
  },
  md: {
    dark: '0 8px 24px rgba(15, 23, 42, 0.45)',
    light: '0 8px 24px rgba(15, 23, 42, 0.25)',
  },
} as const;

// ============================================================================
// TRANSIÇÕES
// ============================================================================

export const transitions = {
  fast: '150ms ease-in-out',
  normal: '200ms ease-in-out',
  slow: '300ms ease-in-out',
} as const;

// ============================================================================
// COMPONENTES (configurações específicas)
// ============================================================================

export const components = {
  button: {
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
  },
  input: {
    height: '40px',
  },
  card: {
    padding: spacing[4],
  },
} as const;
