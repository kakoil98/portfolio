import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../core/supabase.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Project } from '../../shared/models';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page-header">
        <h2>Projects</h2>
        <app-button (click)="openForm(null)">+ Add Project</app-button>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th class="label-caps">Title</th>
            <th class="label-caps">Featured</th>
            <th class="label-caps">Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (project of projects(); track project.id) {
            <tr>
              <td>{{ project.title }}</td>
              <td>{{ project.featured ? '✓' : '—' }}</td>
              <td>
                <button class="action-btn" (click)="openForm(project)">Edit</button>
                <button class="action-btn action-btn--danger" (click)="deleteProject(project.id)">Delete</button>
              </td>
            </tr>
          }
        </tbody>
      </table>

      @if (editing()) {
        <div class="modal-overlay" (click)="closeForm()">
          <form class="modal" (click)="$event.stopPropagation()" (ngSubmit)="save()">
            <h3>{{ form.id ? 'Edit' : 'New' }} Project</h3>
            <div class="field">
              <label class="label-caps">Title</label>
              <input [(ngModel)]="form.title" name="title" required />
            </div>
            <div class="field">
              <label class="label-caps">Description</label>
              <textarea [(ngModel)]="form.description" name="description" rows="3"></textarea>
            </div>
            <div class="field">
              <label class="label-caps">Tech Stack (comma-separated)</label>
              <input [(ngModel)]="form.tech_stack_raw" name="tech_stack" placeholder="Angular, TypeScript, Supabase" />
            </div>
            <div class="field">
              <label class="label-caps">Live URL</label>
              <input [(ngModel)]="form.url" name="url" type="url" />
            </div>
            <div class="field">
              <label class="label-caps">GitHub URL</label>
              <input [(ngModel)]="form.github_url" name="github_url" type="url" />
            </div>
            <label class="field-checkbox">
              <input type="checkbox" [(ngModel)]="form.featured" name="featured" />
              <span class="label-caps">Featured</span>
            </label>
            <div class="modal-actions">
              <app-button type="submit">Save</app-button>
              <app-button variant="secondary" (click)="closeForm()">Cancel</app-button>
            </div>
          </form>
        </div>
      }
    </div>
  `,
  styles: [`
    .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-xl); }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: var(--space-sm); border-bottom: 1px solid var(--color-outline-variant); color: var(--color-on-surface-variant); }
    .data-table td { padding: var(--space-sm); border-bottom: 1px solid var(--color-outline-variant); font-size: 14px; }
    .action-btn { background: none; border: none; cursor: pointer; color: var(--color-primary); font-size: 13px; margin-right: var(--space-sm); font-family: var(--font-sans); }
    .action-btn--danger { color: var(--color-error); }
    .modal-overlay { position: fixed; inset: 0; background: rgba(20,27,43,0.4); display: flex; align-items: center; justify-content: center; z-index: 50; }
    .modal { background: var(--color-white); border-radius: var(--radius-lg); padding: var(--space-xl); width: 480px; max-height: 90vh; overflow-y: auto; display: flex; flex-direction: column; gap: var(--space-md); }
    .field { display: flex; flex-direction: column; gap: var(--space-xs); }
    .field-checkbox { display: flex; align-items: center; gap: var(--space-sm); cursor: pointer; }
    input, textarea { padding: var(--space-sm); border: 1px solid var(--color-outline-variant); border-radius: var(--radius-default); font-family: var(--font-sans); font-size: 14px; outline: none; }
    input:focus, textarea:focus { border-color: var(--color-primary); }
    .modal-actions { display: flex; gap: var(--space-sm); margin-top: var(--space-sm); }
  `]
})
export class AdminProjectsComponent implements OnInit {
  private supabase = inject(SupabaseService);
  projects = signal<Project[]>([]);
  editing = signal(false);
  form: any = {};

  async ngOnInit() { await this.load(); }

  async load() {
    const { data } = await this.supabase.client.from('projects').select('*').order('display_order');
    this.projects.set(data ?? []);
  }

  openForm(project: Project | null) {
    this.form = project
      ? { ...project, tech_stack_raw: project.tech_stack.join(', ') }
      : { title: '', description: '', tech_stack_raw: '', url: '', github_url: '', featured: false, display_order: this.projects().length };
    this.editing.set(true);
  }

  closeForm() { this.editing.set(false); }

  async save() {
    const { tech_stack_raw, ...rest } = this.form;
    const payload = { ...rest, tech_stack: tech_stack_raw.split(',').map((s: string) => s.trim()).filter(Boolean) };
    if (payload.id) {
      await this.supabase.client.from('projects').update(payload).eq('id', payload.id);
    } else {
      await this.supabase.client.from('projects').insert(payload);
    }
    this.closeForm();
    await this.load();
  }

  async deleteProject(id: string) {
    if (!confirm('Delete this project?')) return;
    await this.supabase.client.from('projects').delete().eq('id', id);
    await this.load();
  }
}
