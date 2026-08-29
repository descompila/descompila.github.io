import { RenderMode, ServerRoute } from '@angular/ssr';
import { LANDING_PAGES } from './core/data/landing-pages';

export const serverRoutes: ServerRoute[] = [
  {
    // Só prerenderiza os slugs que existem em landing-pages.ts — sem
    // nenhum item lá, nenhuma página /lp/* é gerada no build.
    path: 'lp/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return LANDING_PAGES.map((lp) => ({ slug: lp.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
