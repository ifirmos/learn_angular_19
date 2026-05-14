# PrimeNG 21 – Theming: Styled Mode

> Baseado na documentação oficial PrimeNG 21.1.7 (`https://primeng.org/theming/styled`).
> Use o MCP `@primeng/mcp` → `get_theming_guide` para detalhes adicionais em tempo real.

---

## 1. Arquitetura do sistema de temas

O PrimeNG 21 usa um sistema de **design tokens** em 3 camadas:

```
Primitive Tokens  →  Semantic Tokens  →  Component Tokens
(paleta de cores)    (primary.color)      (button.background)
```

- **Primitive Tokens**: paleta bruta sem contexto (ex.: `blue-500`, `green-200`).
- **Semantic Tokens**: definem o uso (ex.: `primary.color` → mapeia para `green.500`). O grupo `colorScheme` permite definir valores diferentes para light e dark mode.
- **Component Tokens**: isolados por componente (ex.: `button.background`, `inputtext.border.color`). Mapeiam para semantic tokens.

**Boas práticas**:
- Customize via primitive tokens (paleta) e semantic tokens (design global).
- Component tokens: somente para ajuste fino em um componente específico.
- Prefira `definePreset` a sobrescrever classes CSS.

---

## 2. Configuração obrigatória (`app.config.ts`)

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // NÃO adicionar provideAnimations — PrimeNG 21 usa CSS nativo
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
```

---

## 3. Presets disponíveis

Importados de `@primeuix/themes` (pacote compartilhado entre PrimeNG, PrimeVue, PrimeReact):

| Preset | Descrição |
|--------|-----------|
| `Aura` | Visão própria da PrimeTek — moderno e limpo |
| `Material` | Segue o Google Material Design v2 |
| `Lara` | Baseado no Bootstrap |
| `Nora` | Inspirado em aplicações enterprise |

```typescript
import Aura from '@primeuix/themes/aura';
import Material from '@primeuix/themes/material';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
```

> **Nota**: `@primeng/themes` está deprecated desde v20. Use sempre `@primeuix/themes`.

---

## 4. Dark Mode

### 4.1. Padrão (sistema operacional)

Por padrão, o PrimeNG usa `prefers-color-scheme: dark`:

```typescript
providePrimeNG({ theme: { preset: Aura } })
// darkModeSelector padrão = "system"
```

### 4.2. Toggle por classe CSS (recomendado para a plataforma)

```typescript
providePrimeNG({
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark'
    }
  }
})
```

Toggle no `ThemeService`:

```typescript
toggleDarkMode(): void {
  document.querySelector('html')!.classList.toggle('app-dark');
}
```

### 4.3. Dark mode sempre ativo

Aplicar a classe na inicialização e nunca remover:

```typescript
// main.ts ou AppShellComponent
document.querySelector('html')!.classList.add('app-dark');
```

### 4.4. Desabilitar dark mode

```typescript
providePrimeNG({
  theme: {
    preset: Aura,
    options: { darkModeSelector: false }
  }
})
```

---

## 5. Customização com `definePreset`

```typescript
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const MeuPreset = definePreset(Aura, {
  // 1. Primary color: substituir paleta padrão (emerald) por indigo
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}'
    },

    // 2. Surface colors para light e dark mode
    colorScheme: {
      light: {
        surface: {
          0:   '#ffffff',
          50:  '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          900: '{zinc.900}',
          950: '{zinc.950}'
        }
      },
      dark: {
        surface: {
          0:   '#ffffff',
          50:  '{slate.50}',  // tom azulado em dark mode
          900: '{slate.900}',
          950: '{slate.950}'
        }
      }
    }
  }
});

providePrimeNG({
  theme: {
    preset: MeuPreset,
    options: { darkModeSelector: '.app-dark' }
  }
})
```

### 5.1. Armadilha comum: `colorScheme` tem precedência

Se o preset original define um token via `colorScheme`, seu override direto será ignorado.
**Sempre mantenha a mesma estrutura** do preset original ao customizar.

```typescript
// ERRADO — ignorado se o preset usa colorScheme
semantic: { primary: { color: 'red' } }

// CORRETO — seguir a estrutura original
semantic: {
  colorScheme: {
    light: { primary: { color: 'red' } },
    dark:  { primary: { color: 'pink' } }
  }
}
```

### 5.2. Focus Ring

```typescript
definePreset(Aura, {
  semantic: {
    focusRing: {
      width: '3px',
      style: 'solid',
      color: '{primary.color}',
      offset: '2px'
    }
  }
})
```

### 5.3. Form fields

```typescript
definePreset(Aura, {
  semantic: {
    // hover.border.color aplica em todos os campos: input, select, textarea...
    colorScheme: {
      light: {
        formField: { hover: { borderColor: '{primary.color}' } }
      },
      dark: {
        formField: { hover: { borderColor: '{primary.color}' } }
      }
    }
  }
})
```

### 5.4. Modo Noir (preto/branco como primary)

```typescript
definePreset(Aura, {
  semantic: {
    primary: {
      50: '{zinc.50}', 100: '{zinc.100}', /* ... */
      950: '{zinc.950}'
    },
    colorScheme: {
      light: { primary: { color: '{zinc.950}', contrastColor: '#ffffff',
                           hoverColor: '{zinc.900}', activeColor: '{zinc.800}' } },
      dark:  { primary: { color: '{zinc.50}',  contrastColor: '{zinc.950}',
                           hoverColor: '{zinc.100}', activeColor: '{zinc.200}' } }
    }
  }
})
```

### 5.5. Extend — tokens customizados

```typescript
definePreset(Aura, {
  components: {
    button: {
      extend: {
        accent: {
          color: '{teal.500}',
          inverse: { color: '#ffffff' }
        }
      }
    }
  }
})
```

---

## 6. Scoped Tokens (por instância)

Use a prop `dt` para personalizar tokens em um componente específico sem `::ng-deep`:

```html
<!-- Token global -->
<p-toggleswitch />

<!-- Token sobrescrito apenas nesta instância -->
<p-toggleswitch [dt]="{ handle: { borderRadius: '4px' }, colorScheme: { dark: { root: { checkedBackground: '{indigo.400}' } } } }" />
```

---

## 7. Utilitários de runtime

```typescript
import { usePreset, updatePreset, updatePrimaryPalette,
         updateSurfacePalette, $dt, palette } from '@primeuix/themes';

// Substituir preset completo
usePreset(Lara);

// Merge parcial de tokens
updatePreset({
  semantic: { primary: { 500: '#ff6b6b' } }
});

// Atalho para mudar cor primária
updatePrimaryPalette({ 500: '#22d3ee', 600: '#06b6d4' });

// Atalho para mudar surface
updateSurfacePalette({ 0: '#ffffff', 950: '#0f172a' });

// Acessar valor de um token programaticamente
const token = $dt('primary.color');
// token.name  → 'p-primary-color'
// token.value → '#22c55e'  (ou objeto com light/dark)

// Gerar paleta de uma cor
const shades = palette('#22d3ee');
// { 50: '#...', 100: '#...', ..., 950: '#...' }
```

---

## 8. CSS Layer (controle de especificidade)

Por padrão, `cssLayer` é desabilitado. Para habilitar (útil com Tailwind CSS):

```typescript
providePrimeNG({
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: 'primeng',
        order: 'tailwind-base, primeng, tailwind-utilities'
      }
    }
  }
})
```

Isso envolve os estilos do PrimeNG em `@layer primeng { ... }`, facilitando overrides com Tailwind sem usar `!important`.

---

## 9. Escala (rem)

PrimeNG usa `rem`. O tamanho base é o `font-size` do `html`:

```css
/* styles.scss — padrão da plataforma */
html {
  font-size: 14px; /* 1rem = 14px */
}
```

Ajuste globalmente sem tocar em nenhum componente individualmente.

---

## 10. Variáveis CSS geradas

Os tokens são expostos como CSS variables com o prefixo `--p-` (configurável via `prefix`):

```css
/* Exemplos gerados pelo preset Aura */
--p-primary-color: #22c55e;
--p-primary-contrast-color: #ffffff;
--p-surface-0: #ffffff;
--p-surface-950: #020617;
--p-accordion-header-color: var(--p-text-color);
--p-button-background: var(--p-primary-color);
```

Acesse nos seus estilos SCSS:

```scss
.meu-componente {
  background: var(--p-surface-950);
  color: var(--p-text-color);
  border: 1px solid var(--p-primary-color);
}
```

---

## 11. Preset recomendado para esta plataforma

```typescript
// src/app/core/config/theme.preset.ts
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const PlataformaPreset = definePreset(Aura, {
  semantic: {
    primary: {
      // Ciano (#22D3EE) como cor de destaque — alinhado ao design system
      50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc',
      300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4',
      600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344'
    },
    colorScheme: {
      dark: {
        surface: {
          0:   '#ffffff',
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          700: '#1F2937',
          800: '#111827',
          900: '#0F172A',
          950: '#020617'
        }
      }
    }
  }
});
```

```typescript
// app.config.ts
providePrimeNG({
  theme: {
    preset: PlataformaPreset,
    options: { darkModeSelector: '.app-dark' }
  }
})
```
