import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SupabaseService } from '../../core/supabase.service';
import { SiteSettings } from '../../shared/models';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container contact">
      <h2>Contact</h2>
      <p class="contact__sub">Let's work together or just say hi.</p>
      @if (settings(); as s) {
        <div class="contact__links">
          @if (s.email) {
            <a [href]="'mailto:' + s.email" class="contact__link">{{ s.email }}</a>
          }
          @if (s.github_url) {
            <a [href]="s.github_url" target="_blank" rel="noopener" class="contact__link label-caps">GitHub</a>
          }
          @if (s.linkedin_url) {
            <a [href]="s.linkedin_url" target="_blank" rel="noopener" class="contact__link label-caps">LinkedIn</a>
          }
          @if (s.resume_url) {
            <a [href]="s.resume_url" target="_blank" rel="noopener" class="contact__link label-caps">Resume</a>
          }
        </div>
      }
    </section>
  `,
  styles: [`
    .contact {
      padding-block: var(--space-xl);
      max-width: 480px;
    }
    h2 { margin-bottom: var(--space-md); }
    .contact__sub {
      color: var(--color-on-surface-variant);
      margin-bottom: var(--space-xl);
    }
    .contact__links {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }
    .contact__link {
      color: var(--color-primary);
      text-decoration: none;
      font-size: 15px;
    }
    .contact__link:hover { text-decoration: underline; }
  `]
})
export class ContactComponent implements OnInit {
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
