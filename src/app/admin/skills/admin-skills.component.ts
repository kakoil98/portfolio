import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../core/supabase.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Skill } from '../../shared/models';

@Component({
  selector: 'app-admin-skills',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page-header">
        <h2>Skills</h2>
        <app-button (click)="openForm(null)">+ Add Skill</app-button>
      </div>
      <table class="data-table">
        <thead><tr><th class="label-caps">Name</th><th class="label-caps">Category</th><th class="label-caps">Actions</th></tr></thead>
        <tbody>
          @for (skill of skills(); track skill.id) {
            <tr>
              <td>{{ skill.name }}</td>
              <td>{{ skill.category }}</td>
              <td>
                <button class="action-btn" (click)="openForm(skill)">Edit</button>
                <button class="action-btn action-btn--danger" (click)="deleteSkill(skill.id)">Delete</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
      @if (editing()) {
        <div class="modal-overlay" (click)="closeForm()">
          <form class="modal" (click)="$event.stopPropagation()" (ngSubmit)="save()">
            <h3>{{ form.id ? 'Edit' : 'New' }} Skill</h3>
            <div class="field"><label class="label-caps">Name</label><input [(ngModel)]="form.name" name="name" required /></div>
            <div class="field"><label class="label-caps">Category</label><input [(ngModel)]="form.category" name="category" placeholder="Frontend, Backend, DevOps..." /></div>
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
    .modal { background: var(--color-white); border-radius: var(--radius-lg); padding: var(--space-xl); width: 360px; display: flex; flex-direction: column; gap: var(--space-md); }
    .field { display: flex; flex-direction: column; gap: var(--space-xs); }
    input { padding: var(--space-sm); border: 1px solid var(--color-outline-variant); border-radius: var(--radius-default); font-family: var(--font-sans); font-size: 14px; outline: none; }
    input:focus { border-color: var(--color-primary); }
    .modal-actions { display: flex; gap: var(--space-sm); margin-top: var(--space-sm); }
  `]
})
export class AdminSkillsComponent implements OnInit {
  private supabase = inject(SupabaseService);
  skills = signal<Skill[]>([]);
  editing = signal(false);
  form: any = {};

  async ngOnInit() { await this.load(); }

  async load() {
    const { data } = await this.supabase.client.from('skills').select('*').order('display_order');
    this.skills.set(data ?? []);
  }

  openForm(skill: Skill | null) {
    this.form = skill ? { ...skill } : { name: '', category: '', display_order: this.skills().length };
    this.editing.set(true);
  }

  closeForm() { this.editing.set(false); }

  async save() {
    if (this.form.id) {
      await this.supabase.client.from('skills').update(this.form).eq('id', this.form.id);
    } else {
      await this.supabase.client.from('skills').insert(this.form);
    }
    this.closeForm();
    await this.load();
  }

  async deleteSkill(id: string) {
    if (!confirm('Delete this skill?')) return;
    await this.supabase.client.from('skills').delete().eq('id', id);
    await this.load();
  }
}
