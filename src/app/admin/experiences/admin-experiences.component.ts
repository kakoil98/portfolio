import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../core/supabase.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Experience } from '../../shared/models';

@Component({
  selector: 'app-admin-experiences',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page-header">
        <h2>Experience</h2>
        <app-button (click)="openForm(null)">+ Add Experience</app-button>
      </div>
      <table class="data-table">
        <thead><tr><th class="label-caps">Role</th><th class="label-caps">Company</th><th class="label-caps">Actions</th></tr></thead>
        <tbody>
          @for (exp of experiences(); track exp.id) {
            <tr>
              <td>{{ exp.role }}</td>
              <td>{{ exp.company }}</td>
              <td>
                <button class="action-btn" (click)="openForm(exp)">Edit</button>
                <button class="action-btn action-btn--danger" (click)="deleteExp(exp.id)">Delete</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
      @if (editing()) {
        <div class="modal-overlay" (click)="closeForm()">
          <form class="modal" (click)="$event.stopPropagation()" (ngSubmit)="save()">
            <h3>{{ form.id ? 'Edit' : 'New' }} Experience</h3>
            <div class="field"><label class="label-caps">Role</label><input [(ngModel)]="form.role" name="role" required /></div>
            <div class="field"><label class="label-caps">Company</label><input [(ngModel)]="form.company" name="company" required /></div>
            <div class="field"><label class="label-caps">Start Date (YYYY-MM)</label><input [(ngModel)]="form.start_date" name="start_date" placeholder="2023-01" /></div>
            <div class="field"><label class="label-caps">End Date (blank = Present)</label><input [(ngModel)]="form.end_date" name="end_date" placeholder="2024-06" /></div>
            <div class="field"><label class="label-caps">Description</label><textarea [(ngModel)]="form.description" name="description" rows="3"></textarea></div>
            <div class="field"><label class="label-caps">Tech Stack (comma-separated)</label><input [(ngModel)]="form.tech_stack_raw" name="tech_stack" /></div>
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
    input, textarea { padding: var(--space-sm); border: 1px solid var(--color-outline-variant); border-radius: var(--radius-default); font-family: var(--font-sans); font-size: 14px; outline: none; }
    input:focus, textarea:focus { border-color: var(--color-primary); }
    .modal-actions { display: flex; gap: var(--space-sm); margin-top: var(--space-sm); }
  `]
})
export class AdminExperiencesComponent implements OnInit {
  private supabase = inject(SupabaseService);
  experiences = signal<Experience[]>([]);
  editing = signal(false);
  form: any = {};

  async ngOnInit() { await this.load(); }

  async load() {
    const { data } = await this.supabase.client.from('experiences').select('*').order('display_order');
    this.experiences.set(data ?? []);
  }

  openForm(exp: Experience | null) {
    this.form = exp
      ? { ...exp, tech_stack_raw: exp.tech_stack.join(', ') }
      : { role: '', company: '', start_date: '', end_date: '', description: '', tech_stack_raw: '', display_order: this.experiences().length };
    this.editing.set(true);
  }

  closeForm() { this.editing.set(false); }

  async save() {
    const { tech_stack_raw, ...rest } = this.form;
    const payload = { ...rest, tech_stack: tech_stack_raw.split(',').map((s: string) => s.trim()).filter(Boolean) };
    if (payload.id) {
      await this.supabase.client.from('experiences').update(payload).eq('id', payload.id);
    } else {
      await this.supabase.client.from('experiences').insert(payload);
    }
    this.closeForm();
    await this.load();
  }

  async deleteExp(id: string) {
    if (!confirm('Delete this experience?')) return;
    await this.supabase.client.from('experiences').delete().eq('id', id);
    await this.load();
  }
}
