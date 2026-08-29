import { Component, inject } from '@angular/core';
import { Seo } from '../../core/seo/seo';

@Component({
  selector: 'app-privacidade',
  imports: [],
  templateUrl: './privacidade.html',
  styleUrl: './privacidade.scss',
})
export class Privacidade {
  private readonly seo = inject(Seo);

  constructor() {
    this.seo.update({
      title: 'Privacidade',
      description: 'Como o Descompila trata os dados de quem se inscreve na newsletter ou em um curso.',
      path: '/privacidade/',
    });
  }
}
