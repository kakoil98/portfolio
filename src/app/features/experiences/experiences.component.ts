import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SupabaseService } from '../../core/supabase.service';
import { Experience } from '../../shared/models';

@Component({
  selector: 'app-experiences',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container experiences">
      <h1>Experience</h1>
      <p class="experiences__intro">A timeline of product engineering, architecture, and frontend systems work.</p>
      <div class="timeline">
        @for (exp of experiences(); track exp.id) {
          <article class="timeline__item">
            <div class="timeline__dot"></div>
            <div class="timeline__content">
              <span class="mono-sm">{{ exp.start_date }} - {{ exp.end_date ?? 'Present' }}</span>
              <h3>{{ exp.role }}</h3>
              <p class="timeline__company label-caps">{{ exp.company }}</p>
              <p class="timeline__desc">{{ exp.description }}</p>
              <div class="timeline__stack">
                @for (tech of exp.tech_stack; track tech) {
                  <span class="tech-pill">{{ tech }}</span>
                }
              </div>
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: [`
    .experiences {
      padding-block: 80px;
    }
    h1 {
      margin-bottom: var(--space-md);
    }
    .experiences__intro {
      color: var(--color-on-surface-variant);
      margin-bottom: var(--space-xl);
      max-width: 640px;
    }
    .timeline {
      display: grid;
      gap: var(--space-xl);
      max-width: 860px;
      position: relative;
    }
    .timeline::before {
      background: var(--color-outline-variant);
      bottom: 0;
      content: '';
      left: 11px;
      position: absolute;
      top: 10px;
      width: 1px;
    }
    .timeline__item {
      display: grid;
      gap: var(--space-lg);
      grid-template-columns: 24px 1fr;
      position: relative;
    }
    .timeline__dot {
      background: var(--color-primary);
      border: 4px solid var(--color-background);
      border-radius: 50%;
      height: 22px;
      position: relative;
      width: 22px;
      z-index: 1;
    }
    .mono-sm {
      color: var(--color-primary);
      display: block;
      font-family: var(--font-mono);
      font-size: 12px;
      margin-bottom: var(--space-xs);
      text-transform: uppercase;
    }
    .timeline__company {
      color: var(--color-on-surface-variant);
      margin-block: var(--space-sm);
    }
    .timeline__desc {
      color: var(--color-on-surface-variant);
      margin-bottom: var(--space-md);
      max-width: 720px;
    }
    .timeline__stack {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
    }
    @media (max-width: 720px) {
      .experiences {
        padding-block: var(--space-xl);
      }
    }
  `]
})
export class ExperiencesComponent implements OnInit {
  private supabase = inject(SupabaseService);
  experiences = signal<Experience[]>([]);

  async ngOnInit() {
    if (!this.supabase.isBrowser) return;

    const { data } = await this.supabase.client
      .from('experiences')
      .select('*')
      .order('display_order');
    this.experiences.set(data ?? []);
  }
}
