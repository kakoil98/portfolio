import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupabaseService } from '../../core/supabase.service';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Project } from '../../shared/models';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, BadgeComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container detail">
      @if (project(); as p) {
        <a routerLink="/projects" class="back label-caps">← Projects</a>
        <h1>{{ p.title }}</h1>
        <p class="detail__desc">{{ p.description }}</p>
        <div class="detail__stack">
          @for (tech of p.tech_stack; track tech) {
            <app-badge>{{ tech }}</app-badge>
          }
        </div>
        <div class="detail__links">
          @if (p.url) {
            <app-button><a [href]="p.url" target="_blank" rel="noopener">Live Site</a></app-button>
          }
          @if (p.github_url) {
            <app-button variant="secondary"><a [href]="p.github_url" target="_blank" rel="noopener">GitHub</a></app-button>
          }
        </div>
      }
    </section>
  `,
  styles: [`
    .detail {
      padding-block: var(--space-xl);
      max-width: 720px;
    }
    .back {
      display: inline-block;
      color: var(--color-primary);
      text-decoration: none;
      margin-bottom: var(--space-lg);
    }
    .back:hover { text-decoration: underline; }
    h1 { margin-bottom: var(--space-md); }
    .detail__desc {
      color: var(--color-on-surface-variant);
      margin-bottom: var(--space-lg);
    }
    .detail__stack {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      margin-bottom: var(--space-xl);
    }
    .detail__links {
      display: flex;
      gap: var(--space-md);
    }
    a { text-decoration: none; color: inherit; }
  `]
})
export class ProjectDetailComponent implements OnInit {
  private supabase = inject(SupabaseService);
  private route = inject(ActivatedRoute);
  project = signal<Project | null>(null);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    const { data } = await this.supabase.client
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    this.project.set(data);
  }
}
