import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'episodios',
    loadComponent: () => import('./pages/episodios/episodios').then((m) => m.Episodios),
  },
  {
    path: 'sobre',
    loadComponent: () => import('./pages/sobre/sobre').then((m) => m.Sobre),
  },
  {
    path: 'patrocinadores',
    loadComponent: () =>
      import('./pages/patrocinadores/patrocinadores').then((m) => m.Patrocinadores),
  },
  {
    path: 'cursos',
    loadComponent: () => import('./pages/cursos/cursos').then((m) => m.Cursos),
  },
  {
    path: 'privacidade',
    loadComponent: () => import('./pages/privacidade/privacidade').then((m) => m.Privacidade),
  },
  {
    // Fora do menu, de propósito — destino de links diretos (anúncio, bio, etc.),
    // não de navegação do site. Ver .claude/docs/captura-de-leads.md.
    path: 'lp/:slug',
    loadComponent: () => import('./pages/landing-curso/landing-curso').then((m) => m.LandingCurso),
  },
];
