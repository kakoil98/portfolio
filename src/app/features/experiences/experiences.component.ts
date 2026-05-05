import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SupabaseService } from '../../core/supabase.service';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';
import { Experience } from '../../shared/models';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [BadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container experiences">
      <h2>Experience</h2>
      <div class="timeline">
        @for (exp of experiences(); track exp.id) {
          <div class="timeline__item">
            <div class="timeline__meta">
              <span class="mono-sm">{{ exp.start_date }} — {{ exp.end_date ?? 'Present' }}</span>
            </div>
            <div class="timeline__content">
              <h3>{{ exp.role }}</h3>
              <p class="timeline__company label-caps">{{ exp.company }}</p>
              <p class="timeline__desc">{{ exp.description }}</p>
              <div class="timeline__stack">
                @for (tech of exp.tech_stack; track tech) {
                  <app-badge>{{ tech }}</app-badge>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .experiences {
      padding-block: var(--space-xl);
    }
    h2 {
      margin-bottom: var(--space-xl);
    }
    .timeline {
      display: flex;
      flex-direction: column;
      gap: var(--space-xl);
    }
    .timeline__item {
      display: grid;
      grid-template-columns: 160px 1fr;
      gap: var(--space-lg);
      padding-bottom: var(--space-xl);
      border-bottom: 1px solid var(--color-outline-variant);
    }
    .timeline__item:last-child {
      border-bottom: none;
    }
    .mono-sm {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--color-on-surface-variant);
      padding-top: 4px;
    }
    .timeline__company {
      color: var(--color-primary);
      margin-block: var(--space-sm);
    }
    .timeline__desc {
      color: var(--color-on-surface-variant);
      margin-bottom: var(--space-md);
    }
    .timeline__stack {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
    }
  `]
})
export class ExperiencesComponent implements OnInit {
  private supabase = inject(SupabaseService);
  experiences = signal<Experience[]>([]);

  async ngOnInit() {
    const { data } = await this.supabase.client
      .from('experiences')
      .select('*')
      .order('display_order');
    this.experiences.set(data ?? []);
  }
}
