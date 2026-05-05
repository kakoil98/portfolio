import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SupabaseService } from '../../core/supabase.service';
import { SiteSettings } from '../../shared/models';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container contact">
      <div class="contact__copy">
        <h1>Initialize Contact</h1>
        <p>Ready to discuss your next high-precision Angular project or technical architecture challenge.</p>
        @if (settings(); as s) {
          <div class="contact__links">
            @if (s.email) {
              <a [href]="'mailto:' + s.email" class="contact__link">
                <span class="material-symbols-outlined">mail</span>
                {{ s.email }}
              </a>
            }
            <div class="contact__socials">
              @if (s.github_url) {
                <a [href]="s.github_url" target="_blank" rel="noopener">GitHub</a>
              }
              @if (s.linkedin_url) {
                <a [href]="s.linkedin_url" target="_blank" rel="noopener">LinkedIn</a>
              }
              @if (s.resume_url) {
                <a [href]="s.resume_url" target="_blank" rel="noopener">Resume</a>
              }
            </div>
          </div>
        }
      </div>

      <form class="contact-form">
        <label>
          <span>ID_NAME</span>
          <input type="text" placeholder="Your identifier" />
        </label>
        <label>
          <span>ID_EMAIL</span>
          <input type="email" placeholder="contact@domain.com" />
        </label>
        <label>
          <span>ID_MESSAGE</span>
          <textarea rows="5" placeholder="Brief technical requirements..."></textarea>
        </label>
        <button type="button">
          Transmit Message
          <span class="material-symbols-outlined">send</span>
        </button>
      </form>
    </section>
  `,
  styles: [`
    .contact {
      display: grid;
      gap: var(--space-xl);
      grid-template-columns: 1fr minmax(320px, 560px);
      padding-block: 80px;
    }
    h1 {
      margin-bottom: var(--space-md);
    }
    .contact__copy p {
      color: var(--color-on-surface-variant);
      max-width: 460px;
    }
    .contact__links {
      display: grid;
      gap: var(--space-lg);
      margin-top: var(--space-xl);
    }
    .contact__link {
      align-items: center;
      color: var(--color-primary);
      display: inline-flex;
      font-family: var(--font-mono);
      font-size: 12px;
      gap: var(--space-sm);
      text-decoration: none;
    }
    .contact__socials {
      display: flex;
      gap: var(--space-lg);
    }
    .contact__socials a {
      color: var(--color-on-surface-variant);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-decoration: none;
      text-transform: uppercase;
    }
    .contact__socials a:hover {
      color: var(--color-primary);
    }
    .contact-form {
      background: var(--color-surface-container-lowest);
      border: 1px solid var(--color-outline-variant);
      border-radius: var(--radius-lg);
      box-shadow: 0 18px 40px color-mix(in srgb, var(--color-on-surface) 10%, transparent);
      display: grid;
      gap: var(--space-md);
      padding: var(--space-lg);
    }
    label {
      display: grid;
      gap: var(--space-xs);
    }
    label span {
      color: var(--color-on-surface-variant);
      font-family: var(--font-mono);
      font-size: 12px;
      text-transform: uppercase;
    }
    input,
    textarea {
      background: var(--color-background);
      border: 1px solid var(--color-outline-variant);
      border-radius: var(--radius-default);
      color: var(--color-on-surface);
      min-width: 0;
      outline: none;
      padding: 12px var(--space-md);
      resize: vertical;
    }
    input:focus,
    textarea:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 1px var(--color-primary);
    }
    button {
      align-items: center;
      background: var(--color-primary-container);
      border: none;
      border-radius: var(--radius-lg);
      color: var(--color-on-primary);
      cursor: pointer;
      display: inline-flex;
      font-size: 11px;
      font-weight: 700;
      gap: var(--space-sm);
      justify-content: center;
      letter-spacing: 0.05em;
      min-height: 48px;
      text-transform: uppercase;
    }
    @media (max-width: 720px) {
      .contact {
        grid-template-columns: 1fr;
        padding-block: var(--space-xl);
      }
    }
  `]
})
export class ContactComponent implements OnInit {
  private supabase = inject(SupabaseService);
  settings = signal<SiteSettings | null>(null);

  async ngOnInit() {
    if (!this.supabase.isBrowser) return;

    const { data } = await this.supabase.client
      .from('site_settings')
      .select('*')
      .single();
    this.settings.set(data);
  }
}
