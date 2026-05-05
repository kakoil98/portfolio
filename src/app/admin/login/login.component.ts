import { Component, inject, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="login-wrap">
      <form class="login-form" (ngSubmit)="onSubmit()">
        <h1 class="login-form__title">Admin</h1>
        <div class="field">
          <label class="label-caps" for="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            [(ngModel)]="email"
            autocomplete="email"
            required
            [disabled]="submitting()"
          />
        </div>
        <div class="field">
          <label class="label-caps" for="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            [(ngModel)]="password"
            autocomplete="current-password"
            required
            [disabled]="submitting()"
          />
        </div>
        @if (error()) {
          <p class="error" role="alert">{{ error() }}</p>
        }
        <app-button type="submit" [disabled]="submitting()">
          {{ submitting() ? 'Signing in...' : 'Sign In' }}
        </app-button>
      </form>
    </div>
  `,
  styles: [`
    .login-wrap {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-surface-container-low);
    }
    .login-form {
      background: var(--color-white);
      border: 1px solid var(--color-outline-variant);
      border-radius: var(--radius-lg);
      padding: var(--space-xl);
      width: 360px;
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }
    .login-form__title {
      font-size: 18px;
      margin-bottom: var(--space-sm);
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }
    input {
      padding: var(--space-sm) var(--space-md);
      border: 1px solid var(--color-outline-variant);
      border-radius: var(--radius-default);
      font-family: var(--font-sans);
      font-size: 15px;
      outline: none;
    }
    input:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary) 15%, transparent);
    }
    input:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }
    .error {
      color: var(--color-error);
      font-size: 13px;
    }
  `]
})
export class LoginComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = signal('');
  submitting = signal(false);

  async ngOnInit() {
    const session = await this.auth.loadSession();
    if (session) {
      await this.router.navigate(['/admin/dashboard']);
    }
  }

  async onSubmit() {
    if (this.submitting()) return;

    this.error.set('');
    this.submitting.set(true);

    try {
      const { error } = await this.auth.signIn(this.email, this.password);
      if (error) {
        this.error.set(error.message);
      } else {
        await this.router.navigate(['/admin/dashboard']);
      }
    } finally {
      this.submitting.set(false);
    }
  }
}
