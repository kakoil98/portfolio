import { Injectable, inject, signal, computed } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Session } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = inject(SupabaseService);
  private _session = signal<Session | null>(null);
  private sessionLoad: Promise<Session | null> | null = null;

  readonly isLoggedIn = computed(() => this._session() !== null);
  readonly user = computed(() => this._session()?.user ?? null);

  constructor() {
    if (this.supabase.isBrowser) {
      this.loadSession();
      this.supabase.client.auth.onAuthStateChange((_, session) => {
        this._session.set(session);
      });
    }
  }

  async loadSession(): Promise<Session | null> {
    if (!this.supabase.isBrowser) return null;

    this.sessionLoad ??= this.supabase.client.auth
      .getSession()
      .then(({ data }) => {
        this._session.set(data.session);
        return data.session;
      })
      .catch(() => {
        this._session.set(null);
        return null;
      });

    return this.sessionLoad;
  }

  async signIn(email: string, password: string) {
    const result = await this.supabase.client.auth.signInWithPassword({ email, password });
    this._session.set(result.data.session);
    this.sessionLoad = Promise.resolve(result.data.session);
    return result;
  }

  async signOut() {
    const result = await this.supabase.client.auth.signOut();
    this._session.set(null);
    this.sessionLoad = Promise.resolve(null);
    return result;
  }
}
