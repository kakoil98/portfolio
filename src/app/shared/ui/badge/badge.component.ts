import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [class]="'badge badge--' + variant()"><ng-content /></span>`,
  styles: [`
    :host { display: inline-block; }
    .badge {
      display: inline-block;
      padding: 2px var(--space-sm);
      border-radius: 2px;
      font-size: 12px;
      font-family: var(--font-mono);
      font-weight: 450;
      line-height: 1.5;
    }
    .badge--tech {
      background: var(--color-surface-container-low);
      color: var(--color-primary);
    }
    .badge--meta {
      background: var(--color-surface-container);
      color: var(--color-on-surface-variant);
    }
  `]
})
export class BadgeComponent {
  variant = input<'tech' | 'meta'>('tech');
}
