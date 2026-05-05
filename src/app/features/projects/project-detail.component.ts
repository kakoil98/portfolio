import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupabaseService } from '../../core/supabase.service';
import { Project } from '../../shared/models';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container detail">
      @if (project(); as p) {
        <a routerLink="/projects" class="back label-caps">
          <span class="material-symbols-outlined">arrow_back</span>
          Projects
        </a>
        <div class="detail__hero">
          <div>
            <h1>{{ p.title }}</h1>
            <p class="detail__desc">{{ p.description }}</p>
            <div class="detail__stack">
              @for (tech of p.tech_stack; track tech) {
                <span class="tech-pill">{{ tech }}</span>
              }
            </div>
            <div class="detail__links">
              @if (p.url) {
                <a class="detail__button detail__button--primary" [href]="p.url" target="_blank" rel="noopener">Live Site</a>
              }
              @if (p.github_url) {
                <a class="detail__button" [href]="p.github_url" target="_blank" rel="noopener">GitHub</a>
              }
            </div>
          </div>
          <div class="detail__media">
            @if (p.image_url) {
              <img [src]="p.image_url" [alt]="p.title" />
            } @else {
              <span class="material-symbols-outlined">analytics</span>
            }
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    .detail {
      padding-block: 80px;
    }
    .back {
      align-items: center;
      color: var(--color-primary);
      display: inline-flex;
      gap: var(--space-xs);
      margin-bottom: var(--space-xl);
      text-decoration: none;
    }
    .back:hover {
      text-decoration: underline;
    }
    .detail__hero {
      display: grid;
      gap: var(--space-xl);
      grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1.1fr);
      align-items: start;
    }
    h1 {
      margin-bottom: var(--space-md);
    }
    .detail__desc {
      color: var(--color-on-surface-variant);
      margin-bottom: var(--space-lg);
      max-width: 620px;
    }
    .detail__stack {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
      margin-bottom: var(--space-xl);
    }
    .detail__links {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-md);
    }
    .detail__button {
      align-items: center;
      border: 1px solid var(--color-outline);
      border-radius: var(--radius-default);
      color: var(--color-on-surface);
      display: inline-flex;
      font-size: 11px;
      font-weight: 700;
      justify-content: center;
      letter-spacing: 0.05em;
      min-height: 48px;
      padding: 0 32px;
      text-decoration: none;
      text-transform: uppercase;
    }
    .detail__button--primary {
      background: var(--color-primary-container);
      border-color: var(--color-primary-container);
      color: var(--color-on-primary);
    }
    .detail__media {
      align-items: center;
      aspect-ratio: 16 / 10;
      background:
        linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 18%, transparent), transparent),
        var(--color-inverse-surface, #293040);
      border: 1px solid var(--color-outline-variant);
      border-radius: var(--radius-lg);
      color: var(--color-on-primary);
      display: flex;
      justify-content: center;
      overflow: hidden;
    }
    .detail__media img {
      filter: grayscale(1);
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
    .detail__media .material-symbols-outlined {
      font-size: 72px;
    }
    @media (max-width: 840px) {
      .detail {
        padding-block: var(--space-xl);
      }
      .detail__hero {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProjectDetailComponent implements OnInit {
  private supabase = inject(SupabaseService);
  private route = inject(ActivatedRoute);
  project = signal<Project | null>(null);

  async ngOnInit() {
    if (!this.supabase.isBrowser) return;

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
