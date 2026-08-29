import { Component, inject } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Button } from '../../shared/ui/button/button';
import { Card } from '../../shared/ui/card/card';
import { Seo } from '../../core/seo/seo';
import { LANDING_PAGES } from '../../core/data/landing-pages';

@Component({
  selector: 'app-landing-curso',
  imports: [Button, Card, RouterLink, KeyValuePipe],
  templateUrl: './landing-curso.html',
  styleUrl: './landing-curso.scss',
})
export class LandingCurso {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(Seo);

  protected readonly year = new Date().getFullYear();
  protected readonly curso = LANDING_PAGES.find(
    (lp) => lp.slug === this.route.snapshot.paramMap.get('slug'),
  );
  protected readonly obrigado = this.route.snapshot.queryParamMap.has('obrigado');

  constructor() {
    if (this.curso) {
      this.seo.update({
        title: this.curso.titulo,
        description: this.curso.promessa,
        path: `/lp/${this.curso.slug}/`,
        noindex: true,
      });
    }
  }
}
