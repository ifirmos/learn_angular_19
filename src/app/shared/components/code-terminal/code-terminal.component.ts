import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';

export interface CodeFile {
  name: string;
  content: string;
  language: 'html' | 'typescript' | 'css';
}

@Component({
  selector: 'app-code-terminal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './code-terminal.component.html',
  styleUrl: './code-terminal.component.scss'
})
export class CodeTerminalComponent {
  readonly files = input<CodeFile[]>([]);

  readonly activeFile = signal<CodeFile | null>(null);
  private readonly selectedTabName = signal<string | null>(null);

  constructor() {
    effect(() => {
      const value = this.files();
      if (value.length > 0) {
        const selectedName = this.selectedTabName();
        if (selectedName) {
          const match = value.find(f => f.name === selectedName);
          if (match) { this.activeFile.set(match); return; }
        }
        const currentActive = this.activeFile();
        if (currentActive) {
          const match = value.find(f => f.name === currentActive.name);
          if (match) { this.activeFile.set(match); return; }
        }
        this.activeFile.set(value[0]);
        this.selectedTabName.set(value[0].name);
      } else {
        this.activeFile.set(null);
        this.selectedTabName.set(null);
      }
    });
  }

  selectTab(name: string) {
    this.selectedTabName.set(name);
    const file = this.files().find(f => f.name === name);
    if (file) this.activeFile.set(file);
  }

  copyCode() {
    const content = this.activeFile()?.content;
    if (content) {
      navigator.clipboard.writeText(content);
      // TODO: Show toast/feedback
    }
  }
}
