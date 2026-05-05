import { Routes } from '@angular/router';
import { authGuard } from '../core/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'projects',
        loadComponent: () => import('./projects/admin-projects.component').then(m => m.AdminProjectsComponent),
      },
      {
        path: 'experiences',
        loadComponent: () =>
          import('./experiences/admin-experiences.component').then(
            m => m.AdminExperiencesComponent,
          ),
      },
      {
        path: 'skills',
        loadComponent: () =>
          import('./skills/admin-skills.component').then(m => m.AdminSkillsComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/admin-settings.component').then(m => m.AdminSettingsComponent),
      },
    ],
  },
];
