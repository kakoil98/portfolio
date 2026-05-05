import { Component, inject, signal, computed, OnInit, AfterViewInit, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { KeyValuePipe, isPlatformBrowser } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../../core/supabase.service';
import { Experience, Project, SiteSettings, Skill } from '../../shared/models';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, KeyValuePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, AfterViewInit {
  private supabase = inject(SupabaseService);
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);

  private readonly pathToSection: Record<string, string> = {
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    contact: 'Contact',
  };
  settings = signal<SiteSettings | null>(null);
  projects = signal<Project[]>([]);
  experiences = signal<Experience[]>([]);
  skills = signal<Skill[]>([]);

  fallbackStack = [
    { icon: 'terminal', title: 'Angular 17+', detail: 'Signals, SSR, Hydration' },
    { icon: 'code', title: 'TypeScript', detail: 'Strict typing, RxJS' },
    { icon: 'architecture', title: 'Nx Monorepo', detail: 'Scalable architecture' },
    { icon: 'database', title: 'Supabase', detail: 'Auth, Postgres, RLS' },
  ];

  groupedSkills = computed(() =>
    this.skills().reduce((acc, skill) => {
      (acc[skill.category || 'Core'] ??= []).push(skill);
      return acc;
    }, {} as Record<string, Skill[]>)
  );

  visibleProjects = computed(() => {
    const projects = this.projects();
    if (projects.length) return projects.slice(0, 2);
    return [
      {
        id: 'fallback-quantflow',
        title: 'QuantFlow Dashboard',
        description: 'High-frequency trading interface built with Angular, RxJS, and WebSockets for real-time telemetry.',
        tech_stack: ['Angular', 'RxJS', 'WebSockets'],
        featured: true,
        display_order: 0,
        created_at: '',
      },
      {
        id: 'fallback-coregrid',
        title: 'CoreGrid Microservices',
        description: 'A unified design system and component library supporting enterprise micro-apps.',
        tech_stack: ['Storybook', 'Nx', 'TypeScript'],
        featured: true,
        display_order: 1,
        created_at: '',
      },
    ] as Project[];
  });

  visibleExperiences = computed(() => {
    const experiences = this.experiences();
    if (experiences.length) return experiences.slice(0, 3);
    return [
      {
        id: 'fallback-lead',
        role: 'Lead Software Engineer',
        company: 'Fintech Solutions Inc.',
        start_date: '2021',
        end_date: '',
        description: 'Leading the architectural migration from legacy systems to a federated Angular micro-frontend architecture.',
        tech_stack: ['RxJS', 'AWS', 'Angular'],
        display_order: 0,
      },
      {
        id: 'fallback-senior',
        role: 'Senior Frontend Developer',
        company: 'CyberCore Data',
        start_date: '2018',
        end_date: '2021',
        description: 'Developed real-time data visualization dashboards for high-throughput monitoring tools.',
        tech_stack: ['D3.js', 'Angular'],
        display_order: 1,
      },
    ] as Experience[];
  });

  skillNames(skills: Skill[]) {
    return skills.map(skill => skill.name).join(', ');
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const path = this.route.snapshot.url[0]?.path;
    const sectionId = path ? this.pathToSection[path] : null;
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  async ngOnInit() {
    if (!this.supabase.isBrowser) return;

    const [settingsRes, projectsRes, experiencesRes, skillsRes] = await Promise.all([
      this.supabase.client.from('site_settings').select('*').single(),
      this.supabase.client.from('projects').select('*').order('display_order'),
      this.supabase.client.from('experiences').select('*').order('display_order'),
      this.supabase.client.from('skills').select('*').order('display_order'),
    ]);

    this.settings.set(settingsRes.data);
    this.projects.set(projectsRes.data ?? []);
    this.experiences.set(experiencesRes.data ?? []);
    this.skills.set(skillsRes.data ?? []);
  }
}
