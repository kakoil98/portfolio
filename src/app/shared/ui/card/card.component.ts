import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="card"><ng-content /></div>`,
  styles: [`
    .card {
      background: var(--color-white);
      border: 1px solid var(--color-outline-variant);
      border-radius: var(--radius-lg);
      padding: var(--space-lg);
    }
  `]
})
export class CardComponent {}
