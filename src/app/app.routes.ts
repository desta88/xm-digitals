import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
        import('./pages/home/landing/home/home.component').then(c => c.HomeComponent)
      },
      {
        path: 'use-cases',
        children: [
          {
            path: ':slug',
            loadComponent: () =>
            import('./pages/use-cases/landing/use-cases/use-cases.component').then(c => c.UseCasesComponent)
          }
        ]
      },
      {
        path: 'services',
        children: [
          {
            path: ':slug',
            loadComponent: () =>
            import('./pages/services/landing/services/services.component').then(c => c.ServicesComponent),
          },
          {
            path: ':slug/:detailSlug',
            loadComponent: () =>
            import('./pages/services/landing/detail-services/detail-services.component').then(c => c.DetailServicesComponent),
          }
        ]
      },
      {
        path: 'insight',
        loadComponent: () =>
        import('./pages/insight/landing/insight/insight.component').then(c => c.InsightComponent),
      },
      {
        path: 'about-us',
        loadComponent: () =>
        import('./pages/about-us/landing/about-us/about-us.component').then(c => c.AboutUsComponent),
      },
      {
        path: 'contact-us',
        loadComponent: () =>
        import('./pages/home/landing/home/home.component').then(c => c.HomeComponent),
      },
      {
        path: 'error-404',
        loadComponent: () =>
        import('./pages/error/landing/error-404/error-404.component').then(c => c.Error404Component),
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/error-404'
  }
];
