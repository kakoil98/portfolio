import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="admin-shell">
      <nav class="sidebar">
        <p class="sidebar__brand label-caps">Admin</p>
        <ul class="sidebar__nav">
          <li><a routerLink="/admin/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Dashboard</a></li>
          <li><a routerLink="/admin/projects" routerLinkActive="active">Projects</a></li>
          <li><a routerLink="/admin/experiences" routerLinkActive="active">Experience</a></li>
          <li><a routerLink="/admin/skills" routerLinkActive="active">Skills</a></li>
          <li><a routerLink="/admin/settings" routerLinkActive="active">Settings</a></li>
        </ul>
        <button class="sidebar__signout" (click)="signOut()">Sign Out</button>
      </nav>
      <main class="admin-main">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .admin-shell {
      display: grid;
      grid-template-columns: 200px 1fr;
      min-height: 100vh;
    }
    .sidebar {
      background: var(--color-surface-container-low);
      border-right: 1px solid var(--color-outline-variant);
      padding: var(--space-lg);
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }
    .sidebar__brand {
      color: var(--color-on-surface-variant);
      margin-bottom: var(--space-sm);
    }
    .sidebar__nav {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    .sidebar__nav a {
      display: block;
      padding: var(--space-sm) var(--space-md);
      border-radius: var(--radius-default);
      text-decoration: none;
      font-size: 14px;
      color: var(--color-on-surface-variant);
      transition: background 0.1s, color 0.1s;
    }
    .sidebar__nav a.active,
    .sidebar__nav a:hover {
      background: var(--color-surface-container);
      color: var(--color-primary);
    }
    .sidebar__signout {
      background: none;
      border: 1px solid var(--color-outline-variant);
      border-radius: var(--radius-default);
      padding: var(--space-sm);
      cursor: pointer;
      font-size: 13px;
      font-family: var(--font-sans);
      color: var(--color-on-surface-variant);
      transition: color 0.1s;
    }
    .sidebar__signout:hover {
      color: var(--color-error);
      border-color: var(--color-error);
    }
    .admin-main {
      padding: var(--space-xl);
      overflow-y: auto;
    }
  `]
})
export class AdminLayoutComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  async signOut() {
    await this.auth.signOut();
    this.router.navigate(['/admin/login']);
  }
}
