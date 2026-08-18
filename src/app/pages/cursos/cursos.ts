import { Component, inject } from '@angular/core';
import { Seo } from '../../core/seo/seo';

@Component({
  selector: 'app-cursos',
  imports: [],
  templateUrl: './cursos.html',
  styleUrl: './cursos.scss',
})
export class Cursos {
  private readonly seo = inject(Seo);

  constructor() {
    this.seo.update({
      title: 'Cursos (em breve)',
      description:
        'Em breve, cursos de tecnologia com a mesma proposta do Descompila: educação simplificada para todos.',
      path: '/cursos/',
    });
  }
}
