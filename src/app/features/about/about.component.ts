import { Component, inject, signal, computed, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { SupabaseService } from '../../core/supabase.service';
import { Skill } from '../../shared/models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [KeyValuePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="container about">
      <div class="about__intro">
        <h1>Technical_Stack</h1>
        @if (bio()) {
          <p>{{ bio() }}</p>
        } @else {
          <p>Focused on Angular architecture, reactive systems, accessible UI, and scalable frontend delivery.</p>
        }
      </div>

      @if (skills().length) {
        <div class="skills">
          @for (group of groupedSkills() | keyvalue; track group.key) {
            <article class="skills__group">
              <p class="label-caps skills__category">{{ group.key }}</p>
              <ul>
                @for (skill of group.value; track skill.id) {
                  <li>{{ skill.name }}</li>
                }
              </ul>
            </article>
          }
        </div>
      }
    </section>
  `,
  styles: [`
    .about {
      display: grid;
      gap: 80px;
      grid-template-columns: minmax(260px, 0.75fr) 1.5fr;
      padding-block: 80px;
    }
    h1 {
      margin-bottom: var(--space-md);
    }
    .about__intro {
      position: sticky;
      top: 112px;
      align-self: start;
    }
    .about__intro p {
      color: var(--color-on-surface-variant);
      max-width: 420px;
    }
    .skills {
      display: grid;
      gap: var(--space-xl);
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .skills__group {
      border-left: 4px solid var(--color-outline-variant);
      padding-left: var(--space-lg);
    }
    .skills__group:first-child {
      border-left-color: var(--color-primary);
    }
    .skills__category {
      color: var(--color-primary);
      margin-bottom: var(--space-sm);
    }
    ul {
      display: grid;
      gap: var(--space-xs);
      list-style: none;
    }
    li {
      color: var(--color-on-surface);
      font-size: 18px;
      line-height: 1.6;
    }
    @media (max-width: 720px) {
      .about {
        display: block;
        padding-block: var(--space-xl);
      }
      .about__intro {
        position: static;
        margin-bottom: var(--space-xl);
      }
      .skills {
        grid-template-columns: 1fr;
      }
      li {
        font-size: 15px;
      }
    }
  `]
})
export class AboutComponent implements OnInit {
  private supabase = inject(SupabaseService);
  skills = signal<Skill[]>([]);
  bio = signal('');

  groupedSkills = computed(() =>
    this.skills().reduce((acc, skill) => {
      (acc[skill.category || 'Core'] ??= []).push(skill);
      return acc;
    }, {} as Record<string, Skill[]>)
  );

  async ngOnInit() {
    if (!this.supabase.isBrowser) return;

    const [settingsRes, skillsRes] = await Promise.all([
      this.supabase.client.from('site_settings').select('bio').single(),
      this.supabase.client.from('skills').select('*').order('display_order'),
    ]);
    this.bio.set(settingsRes.data?.bio ?? '');
    this.skills.set(skillsRes.data ?? []);
  }
}
