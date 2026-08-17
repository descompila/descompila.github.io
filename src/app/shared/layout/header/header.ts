import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly links = [
    { path: '/', label: 'Home' },
    { path: '/episodios', label: 'Episódios' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/patrocinadores', label: 'Seja Patrocinador' },
    { path: '/cursos', label: 'Cursos' },
  ];
}
