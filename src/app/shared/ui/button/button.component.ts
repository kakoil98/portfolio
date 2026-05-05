import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button [class]="'btn btn--' + variant()" [type]="type()" [disabled]="disabled()">
      <ng-content />
    </button>
  `,
  styles: [`
    :host { display: inline-block; }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      border-radius: var(--radius-default);
      font-family: var(--font-sans);
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.15s;
      line-height: 1.4;
      border: none;
    }
    .btn:hover { opacity: 0.85; }
    .btn:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    .btn--primary {
      background: var(--color-primary);
      color: var(--color-on-primary);
    }
    .btn--secondary {
      background: transparent;
      color: var(--color-on-surface);
      border: 1px solid var(--color-outline-variant);
    }
  `]
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary'>('primary');
  type = input<'button' | 'submit'>('button');
  disabled = input(false);
}
