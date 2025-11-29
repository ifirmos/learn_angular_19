import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * UiButtonComponent - Componente primitivo de botão
 * 
 * Implementa o sistema de design com variantes e tamanhos.
 * Usa tokens semânticos para cores e espaçamentos.
 */
@Component({
  selector: 'app-ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="ui-button"
      [class]="'ui-button--' + variant + ' ui-button--' + size"
      [type]="type"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .ui-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-2);
      font-family: var(--font-family-sans);
      font-size: var(--font-size-body);
      font-weight: var(--font-weight-medium);
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: var(--transition-fast);
      white-space: nowrap;
    }

    .ui-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ui-button:focus-visible {
      outline: 2px solid var(--color-accent-primary);
      outline-offset: 2px;
    }

    /* Sizes */
    .ui-button--sm {
      height: 32px;
      padding: 0 var(--spacing-3);
      font-size: var(--font-size-caption);
    }

    .ui-button--md {
      height: 40px;
      padding: 0 var(--spacing-4);
    }

    .ui-button--lg {
      height: 48px;
      padding: 0 var(--spacing-6);
      font-size: var(--font-size-h2);
    }

    /* Variants */
    .ui-button--primary {
      background-color: var(--color-accent-primary);
      color: var(--color-text-inverse);
    }

    .ui-button--primary:hover:not(:disabled) {
      filter: brightness(1.1);
    }

    .ui-button--primary:active:not(:disabled) {
      filter: brightness(0.95);
    }

    .ui-button--secondary {
      background-color: var(--color-bg-surface-alt);
      color: var(--color-text-primary);
      border: 1px solid var(--color-border-default);
    }

    .ui-button--secondary:hover:not(:disabled) {
      background-color: var(--color-bg-surface);
      box-shadow: var(--shadow-sm);
    }

    .ui-button--ghost {
      background-color: transparent;
      color: var(--color-accent-primary);
    }

    .ui-button--ghost:hover:not(:disabled) {
      background-color: rgba(34, 211, 238, 0.08);
    }

    .ui-button--danger {
      background-color: var(--color-state-error);
      color: var(--color-text-inverse);
    }

    .ui-button--danger:hover:not(:disabled) {
      filter: brightness(1.1);
    }
  `],
})
export class UiButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
}
