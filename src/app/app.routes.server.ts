import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'services/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'xm-creative' },
        { slug: 'xm-tech' },
        { slug: 'xm-ai' },
        { slug: 'xm-growth' }
      ];
    }
  },
  {
    path: 'services/:slug/:detailSlug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'xm-tech', detailSlug: 'web-development-jakarta' },
        { slug: 'xm-tech', detailSlug: 'cms-development' },
        { slug: 'xm-tech', detailSlug: 'saas-platform' },
        { slug: 'xm-tech', detailSlug: 'erp-crm' },
        { slug: 'xm-tech', detailSlug: 'mobile-native-apps' },
        { slug: 'xm-tech', detailSlug: 'mobile-hybrid-apps' }
      ];
    }
  },
  {
    path: 'use-cases/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'shift-left-testing-mission-critical-systems' }
      ];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
