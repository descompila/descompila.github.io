import { Component, inject } from '@angular/core';
import { Button } from '../../shared/ui/button/button';
import { EpisodeCard } from '../../shared/ui/episode-card/episode-card';
import { EPISODIOS } from '../../core/data/episodios';
import { Seo } from '../../core/seo/seo';

@Component({
  selector: 'app-home',
  imports: [Button, EpisodeCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly seo = inject(Seo);

  protected readonly canalUrl = 'https://www.youtube.com/@Descompila';
  protected readonly ultimoEpisodio = EPISODIOS[0];

  constructor() {
    this.seo.update({
      title: 'Educação de tecnologia, simplificada para todos',
      description:
        'Descompila é um podcast de tecnologia com conversas diretas sobre carreira, IA e o dia a dia de quem trabalha ou quer entrar na área — sem jargão desnecessário.',
      path: '/',
    });

    this.seo.setJsonLd('organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Descompila',
      url: 'https://descompila.github.io/',
      logo: 'https://descompila.github.io/brand/logo-horizontal-azul.png',
      description: 'Educação de tecnologia, simplificada para todos.',
      sameAs: ['https://www.youtube.com/@Descompila'],
    });

    this.seo.setJsonLd('podcast-series', {
      '@context': 'https://schema.org',
      '@type': 'PodcastSeries',
      name: 'Descompila',
      url: 'https://descompila.github.io/episodios/',
      description:
        'Podcast de educação em tecnologia — carreira, IA e desenvolvimento de software.',
      webFeed: 'https://www.youtube.com/@Descompila',
    });
  }
}
