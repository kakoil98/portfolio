import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="site-header">
      <nav class="container nav">
        <a routerLink="/" class="nav__brand">han.dev</a>
        <ul class="nav__links">
          <li><a routerLink="/projects" routerLinkActive="active">Projects</a></li>
          <li><a routerLink="/experiences" routerLinkActive="active">Experience</a></li>
          <li><a routerLink="/about" routerLinkActive="active">About</a></li>
          <li><a routerLink="/contact" routerLinkActive="active">Contact</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-outlet />
    </main>
    <footer class="site-footer">
      <div class="container">
        <span class="label-caps">Built with Angular & Supabase</span>
      </div>
    </footer>
  `,
  styles: [`
    .site-header {
      position: sticky;
      top: 0;
      background: var(--color-surface);
      border-bottom: 1px solid var(--color-outline-variant);
      z-index: 10;
    }
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
    }
    .nav__brand {
      font-family: var(--font-mono);
      font-size: 14px;
      font-weight: 600;
      color: var(--color-primary);
      text-decoration: none;
    }
    .nav__links {
      display: flex;
      gap: var(--space-lg);
      list-style: none;
    }
    .nav__links a {
      text-decoration: none;
      font-size: 14px;
      color: var(--color-on-surface-variant);
      transition: color 0.15s;
    }
    .nav__links a.active,
    .nav__links a:hover {
      color: var(--color-primary);
    }
    .site-footer {
      border-top: 1px solid var(--color-outline-variant);
      padding-block: var(--space-xl);
      margin-top: var(--space-xl);
      color: var(--color-on-surface-variant);
    }
  `]
})
export class LayoutComponent {}
