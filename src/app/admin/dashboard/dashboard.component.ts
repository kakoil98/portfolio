import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dashboard">
      <h2>Dashboard</h2>
      <p class="dashboard__sub">Manage your portfolio content.</p>
      <div class="dashboard__grid">
        <a routerLink="/admin/projects" class="dashboard__card">
          <span class="label-caps">Projects</span>
          <p>Add, edit, and reorder your portfolio projects.</p>
        </a>
        <a routerLink="/admin/experiences" class="dashboard__card">
          <span class="label-caps">Experience</span>
          <p>Manage your work history and roles.</p>
        </a>
        <a routerLink="/admin/skills" class="dashboard__card">
          <span class="label-caps">Skills</span>
          <p>Update your technology and skill tags.</p>
        </a>
        <a routerLink="/admin/settings" class="dashboard__card">
          <span class="label-caps">Settings</span>
          <p>Edit bio, headline, and contact links.</p>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { max-width: 720px; }
    h2 { margin-bottom: var(--space-sm); }
    .dashboard__sub {
      color: var(--color-on-surface-variant);
      margin-bottom: var(--space-xl);
    }
    .dashboard__grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-md);
    }
    .dashboard__card {
      display: block;
      padding: var(--space-lg);
      border: 1px solid var(--color-outline-variant);
      border-radius: var(--radius-lg);
      text-decoration: none;
      color: inherit;
      background: var(--color-white);
      transition: border-color 0.15s;
    }
    .dashboard__card:hover { border-color: var(--color-primary); }
    .dashboard__card p {
      margin-top: var(--space-sm);
      color: var(--color-on-surface-variant);
      font-size: 14px;
    }
  `]
})
export class DashboardComponent {}
