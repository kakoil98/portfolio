import { Component, inject, signal, computed, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { SupabaseService } from '../../core/supabase.service';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';
import { Skill, SiteSettings } from '../../shared/models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [BadgeComponent, KeyValuePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container about">
      <h2>About</h2>
      @if (bio()) {
        <p class="about__bio">{{ bio() }}</p>
      }

      @if (skills().length) {
        <div class="skills">
          @for (group of groupedSkills() | keyvalue; track group.key) {
            <div class="skills__group">
              <p class="label-caps skills__category">{{ group.key }}</p>
              <div class="skills__tags">
                @for (skill of group.value; track skill.id) {
                  <app-badge variant="tech">{{ skill.name }}</app-badge>
                }
              </div>
            </div>
          }
        </div>
      }
    </section>
  `,
  styles: [`
    .about {
      padding-block: var(--space-xl);
    }
    h2 {
      margin-bottom: var(--space-md);
    }
    .about__bio {
      color: var(--color-on-surface-variant);
      max-width: 65ch;
      margin-bottom: var(--space-xl);
    }
    .skills {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }
    .skills__category {
      color: var(--color-on-surface-variant);
      margin-bottom: var(--space-sm);
    }
    .skills__tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-sm);
    }
  `]
})
export class AboutComponent implements OnInit {
  private supabase = inject(SupabaseService);
  skills = signal<Skill[]>([]);
  bio = signal('');

  groupedSkills = computed(() =>
    this.skills().reduce((acc, skill) => {
      (acc[skill.category] ??= []).push(skill);
      return acc;
    }, {} as Record<string, Skill[]>)
  );

  async ngOnInit() {
    const [settingsRes, skillsRes] = await Promise.all([
      this.supabase.client.from('site_settings').select('bio').single(),
      this.supabase.client.from('skills').select('*').order('display_order'),
    ]);
    this.bio.set(settingsRes.data?.bio ?? '');
    this.skills.set(skillsRes.data ?? []);
  }
}
