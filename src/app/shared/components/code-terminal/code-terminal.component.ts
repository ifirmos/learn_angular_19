import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CodeFile {
  name: string;
  content: string;
  language: 'html' | 'typescript' | 'css';
}

@Component({
  selector: 'app-code-terminal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="code-terminal">
      <div class="terminal-header">
        <div class="window-controls">
          <span class="control red"></span>
          <span class="control yellow"></span>
          <span class="control green"></span>
        </div>
        <div class="tabs">
          <button
            *ngFor="let file of files"
            class="tab-button"
            [class.active]="activeFile() === file"
            (click)="activeFile.set(file)"
          >
            {{ file.name }}
          </button>
        </div>
        <div class="actions">
          <button class="copy-btn" (click)="copyCode()" title="Copiar código">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="terminal-body">
        <pre><code [class]="'language-' + activeFile()?.language" ngNonBindable>{{ activeFile()?.content }}</code></pre>
      </div>
    </div>
  `,
  styles: [`
    .code-terminal {
      background-color: var(--color-bg-surface-alt); /* Dark background */
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--color-border-default);
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 300px;
      box-shadow: var(--shadow-md);
    }

    .terminal-header {
      display: flex;
      align-items: center;
      background-color: #1e1e1e; /* Darker header */
      padding: var(--spacing-2) var(--spacing-4);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      gap: var(--spacing-4);
    }

    .window-controls {
      display: flex;
      gap: 6px;
      margin-right: var(--spacing-2);
    }

    .control {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .control.red { background-color: #ff5f56; }
    .control.yellow { background-color: #ffbd2e; }
    .control.green { background-color: #27c93f; }

    .tabs {
      display: flex;
      gap: 2px;
      flex: 1;
      overflow-x: auto;
      scrollbar-width: none; /* Hide scrollbar */
      
      &::-webkit-scrollbar {
        display: none;
      }
    }

    .tab-button {
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      padding: var(--spacing-2) var(--spacing-3);
      font-family: var(--font-family-mono);
      font-size: var(--font-size-caption);
      cursor: pointer;
      border-radius: var(--radius-sm) var(--radius-sm) 0 0;
      transition: all var(--transition-fast);
      white-space: nowrap;

      &:hover {
        color: rgba(255, 255, 255, 0.9);
        background-color: rgba(255, 255, 255, 0.05);
      }

      &.active {
        color: var(--color-accent-primary);
        background-color: rgba(255, 255, 255, 0.1);
        font-weight: var(--font-weight-medium);
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -9px; /* Align with border-bottom of header */
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--color-accent-primary);
        }
      }
    }

    .actions {
      margin-left: auto;
    }

    .copy-btn {
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      padding: var(--spacing-1);
      border-radius: var(--radius-sm);
      transition: color var(--transition-fast);

      &:hover {
        color: var(--color-text-inverse);
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    .terminal-body {
      flex: 1;
      padding: var(--spacing-4);
      overflow: auto;
      background-color: #1e1e1e; /* Match header or slightly different */
      color: #d4d4d4; /* VS Code default text color */
      font-family: var(--font-family-mono);
      font-size: 14px;
      line-height: 1.5;
    }

    pre {
      margin: 0;
    }

    code {
      font-family: inherit;
    }
  `]
})
export class CodeTerminalComponent {
  private _files: CodeFile[] = [];

  @Input()
  set files(value: CodeFile[]) {
    this._files = value;
    if (value.length > 0 && !this.activeFile()) {
      this.activeFile.set(value[0]);
    }
  }
  get files(): CodeFile[] {
    return this._files;
  }

  activeFile = signal<CodeFile | null>(null);

  copyCode() {
    const content = this.activeFile()?.content;
    if (content) {
      navigator.clipboard.writeText(content);
      // TODO: Show toast/feedback
    }
  }
}
