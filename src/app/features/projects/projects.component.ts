import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../core/supabase.service';
import { Project } from '../../shared/models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container projects">
      <h1>Selected_Projects</h1>
      <p class="projects__intro">Production work, architecture experiments, and high-precision Angular interfaces.</p>
      <div class="projects__grid">
        @for (project of projects(); track project.id) {
          <a [routerLink]="['/projects', project.id]" class="project-link">
            <article class="project-card">
              <div class="project-card__media">
                @if (project.image_url) {
                  <img [src]="project.image_url" [alt]="project.title" />
                } @else {
                  <span class="material-symbols-outlined">dashboard</span>
                }
              </div>
              <div class="project-card__body">
                <h3>{{ project.title }}</h3>
                @if (project.featured) {
                  <span class="project-card__flag label-caps">Featured</span>
                }
              </div>
              <p class="project__desc">{{ project.description }}</p>
              <div class="project__stack">
                @for (tech of project.tech_stack; track tech) {
                  <span class="tech-pill">{{ tech }}</span>
                }
              </div>
            </article>
          </a>
        }
      </div>
    </section>
  `,
  styles: [`
    .projects {
      padding-block: 80px;
    }
    h1 {
      margin-bottom: var(--space-md);
    }
    .projects__intro {
      color: var(--color-on-surface-variant);
      margin-bottom: var(--space-xl);
      max-width: 640px;
    }
    .projects__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--space-xl);
    }
    .project-link {
      text-decoration: none;
      color: inherit;
      display: block;
      height: 100%;
    }
    .project-card {
      background: var(--color-surface-container-lowest);
      border: 1px solid var(--color-outline-variant);
      border-radius: var(--radius-lg);
      height: 100%;
      overflow: hidden;
      transition: box-shadow 0.25s, transform 0.25s;
    }
    .project-link:hover .project-card {
      box-shadow: 0 24px 48px color-mix(in srgb, var(--color-on-surface) 12%, transparent);
      transform: translateY(-2px);
    }
    .project-card__media {
      align-items: center;
      aspect-ratio: 16 / 9;
      background:
        linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 18%, transparent), transparent),
        var(--color-inverse-surface, #293040);
      color: var(--color-on-primary);
      display: flex;
      justify-content: center;
      overflow: hidden;
    }
    .project-card__media img {
      filter: grayscale(1);
      height: 100%;
      object-fit: cover;
      transition: filter 0.35s, transform 0.35s;
      width: 100%;
    }
    .project-link:hover img {
      filter: grayscale(0);
      transform: scale(1.02);
    }
    .project-card__media .material-symbols-outlined {
      font-size: 56px;
    }
    .project-card__body {
      align-items: start;
      display: flex;
      gap: var(--space-sm);
      justify-content: space-between;
      padding: var(--space-lg) var(--space-lg) 0;
    }
    .project-card__flag {
      color: var(--color-primary);
      white-space: nowrap;
    }
    .project__desc {
      color: var(--color-on-surface-variant);
      margin: var(--space-sm) var(--space-lg) var(--space-lg);
      font-size: 14px;
      line-height: 1.5;
    }
    .project__stack {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
      padding: 0 var(--space-lg) var(--space-lg);
    }
    @media (max-width: 720px) {
      .projects {
        padding-block: var(--space-xl);
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  private supabase = inject(SupabaseService);
  projects = signal<Project[]>([]);

  async ngOnInit() {
    if (!this.supabase.isBrowser) return;

    const { data } = await this.supabase.client
      .from('projects')
      .select('*')
      .order('display_order');
    this.projects.set(data ?? []);
  }
}
