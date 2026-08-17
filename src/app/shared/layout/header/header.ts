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
    { path: '/', label: 'Home', highlight: false },
    { path: '/episodios', label: 'Episódios', highlight: false },
    { path: '/sobre', label: 'Sobre', highlight: false },
    { path: '/cursos', label: 'Cursos', highlight: false },
    { path: '/patrocinadores', label: 'Seja Patrocinador', highlight: true },
  ];
}
