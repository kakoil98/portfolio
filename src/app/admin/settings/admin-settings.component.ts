import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../core/supabase.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { SiteSettings } from '../../shared/models';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <h2>Site Settings</h2>
      @if (settings(); as s) {
        <form (ngSubmit)="save()" class="settings-form">
          <div class="field"><label class="label-caps">Headline</label><input [(ngModel)]="s.headline" name="headline" /></div>
          <div class="field"><label class="label-caps">Bio</label><textarea [(ngModel)]="s.bio" name="bio" rows="4"></textarea></div>
          <div class="field"><label class="label-caps">Email</label><input [(ngModel)]="s.email" name="email" type="email" /></div>
          <div class="field"><label class="label-caps">GitHub URL</label><input [(ngModel)]="s.github_url" name="github_url" type="url" /></div>
          <div class="field"><label class="label-caps">LinkedIn URL</label><input [(ngModel)]="s.linkedin_url" name="linkedin_url" type="url" /></div>
          <div class="field"><label class="label-caps">Resume URL</label><input [(ngModel)]="s.resume_url" name="resume_url" type="url" /></div>
          <div class="form-actions">
            <app-button type="submit">Save Settings</app-button>
            @if (saved()) {
              <span class="saved-msg">✓ Saved</span>
            }
          </div>
        </form>
      }
    </div>
  `,
  styles: [`
    .page { max-width: 600px; }
    h2 { margin-bottom: var(--space-xl); }
    .settings-form { display: flex; flex-direction: column; gap: var(--space-md); }
    .field { display: flex; flex-direction: column; gap: var(--space-xs); }
    input, textarea { padding: var(--space-sm); border: 1px solid var(--color-outline-variant); border-radius: var(--radius-default); font-family: var(--font-sans); font-size: 14px; outline: none; }
    input:focus, textarea:focus { border-color: var(--color-primary); }
    .form-actions { display: flex; align-items: center; gap: var(--space-md); margin-top: var(--space-sm); }
    .saved-msg { color: var(--color-secondary); font-family: var(--font-mono); font-size: 13px; }
  `]
})
export class AdminSettingsComponent implements OnInit {
  private supabase = inject(SupabaseService);
  settings = signal<SiteSettings | null>(null);
  saved = signal(false);

  async ngOnInit() {
    const { data } = await this.supabase.client.from('site_settings').select('*').single();
    this.settings.set(data);
  }

  async save() {
    const s = this.settings();
    if (!s) return;
    await this.supabase.client.from('site_settings').upsert(s);
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2500);
  }
}
