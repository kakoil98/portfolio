import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/hero/hero.component').then(m => m.HeroComponent),
      },
      {
        path: 'skills',
        loadComponent: () => import('./features/hero/hero.component').then(m => m.HeroComponent),
      },
      {
        path: 'experience',
        loadComponent: () => import('./features/hero/hero.component').then(m => m.HeroComponent),
      },
      {
        path: 'projects',
        loadComponent: () => import('./features/hero/hero.component').then(m => m.HeroComponent),
      },
      {
        path: 'contact',
        loadComponent: () => import('./features/hero/hero.component').then(m => m.HeroComponent),
      },
      {
        path: 'projects/:id',
        loadComponent: () =>
          import('./features/projects/project-detail.component').then(m => m.ProjectDetailComponent),
      },
    ],
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
  { path: '**', redirectTo: '' },
];
