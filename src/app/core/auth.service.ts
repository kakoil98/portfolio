import { Injectable, inject, signal, computed } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Session } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = inject(SupabaseService);
  private _session = signal<Session | null>(null);

  readonly isLoggedIn = computed(() => this._session() !== null);
  readonly user = computed(() => this._session()?.user ?? null);

  constructor() {
    if (this.supabase.isBrowser) {
      this.supabase.client.auth.getSession().then(({ data }) => {
        this._session.set(data.session);
      }).catch(() => {
        this._session.set(null);
      });
      this.supabase.client.auth.onAuthStateChange((_, session) => {
        this._session.set(session);
      });
    }
  }

  async signIn(email: string, password: string) {
    return this.supabase.client.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    return this.supabase.client.auth.signOut();
  }
}
