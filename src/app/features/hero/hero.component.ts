import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../core/supabase.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { SiteSettings } from '../../shared/models';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container hero">
      <p class="label-caps hero__eyebrow">Software Engineer</p>
      <h1 class="hero__headline">{{ settings()?.headline || 'Building precise, scalable software.' }}</h1>
      <p class="hero__bio">{{ settings()?.bio || '' }}</p>
      <div class="hero__actions">
        <app-button><a routerLink="/projects">View Projects</a></app-button>
        <app-button variant="secondary"><a routerLink="/contact">Get in Touch</a></app-button>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      padding-block: var(--space-xl);
      max-width: 720px;
    }
    .hero__eyebrow {
      color: var(--color-primary);
      margin-bottom: var(--space-md);
    }
    .hero__headline {
      margin-bottom: var(--space-md);
    }
    .hero__bio {
      color: var(--color-on-surface-variant);
      margin-bottom: var(--space-xl);
      max-width: 60ch;
    }
    .hero__actions {
      display: flex;
      gap: var(--space-md);
      flex-wrap: wrap;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
  `]
})
export class HeroComponent implements OnInit {
  private supabase = inject(SupabaseService);
  settings = signal<SiteSettings | null>(null);

  async ngOnInit() {
    const { data } = await this.supabase.client
      .from('site_settings')
      .select('*')
      .single();
    this.settings.set(data);
  }
}
