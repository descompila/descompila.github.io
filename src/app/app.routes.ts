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
];
