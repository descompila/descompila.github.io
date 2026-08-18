import { Component, inject } from '@angular/core';
import { Button } from '../../shared/ui/button/button';
import { Seo } from '../../core/seo/seo';

@Component({
  selector: 'app-sobre',
  imports: [Button],
  templateUrl: './sobre.html',
  styleUrl: './sobre.scss',
})
export class Sobre {
  private readonly seo = inject(Seo);

  protected readonly canalUrl = 'https://www.youtube.com/@Descompila';

  constructor() {
    this.seo.update({
      title: 'Sobre',
      description:
        'Conheça o Descompila e Samuelson Brito, desenvolvedor Java e fundador da comunidade Java Amazonas.',
      path: '/sobre/',
    });
  }
}
