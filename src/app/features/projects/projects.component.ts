import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../core/supabase.service';
import { CardComponent } from '../../shared/ui/card/card.component';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';
import { Project } from '../../shared/models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink, CardComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container projects">
      <h2>Projects</h2>
      <div class="projects__grid">
        @for (project of projects(); track project.id) {
          <a [routerLink]="['/projects', project.id]" class="project-link">
            <app-card>
              <h3>{{ project.title }}</h3>
              <p class="project__desc">{{ project.description }}</p>
              <div class="project__stack">
                @for (tech of project.tech_stack; track tech) {
                  <app-badge>{{ tech }}</app-badge>
                }
              </div>
            </app-card>
          </a>
        }
      </div>
    </section>
  `,
  styles: [`
    .projects {
      padding-block: var(--space-xl);
    }
    h2 {
      margin-bottom: var(--space-xl);
    }
    .projects__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--space-md);
    }
    .project-link {
      text-decoration: none;
      color: inherit;
      display: block;
      height: 100%;
    }
    .project-link:hover app-card {
      border-color: var(--color-primary);
    }
    .project__desc {
      color: var(--color-on-surface-variant);
      margin-block: var(--space-md);
      font-size: 14px;
      line-height: 1.5;
    }
    .project__stack {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
    }
  `]
})
export class ProjectsComponent implements OnInit {
  private supabase = inject(SupabaseService);
  projects = signal<Project[]>([]);

  async ngOnInit() {
    const { data } = await this.supabase.client
      .from('projects')
      .select('*')
      .order('display_order');
    this.projects.set(data ?? []);
  }
}
