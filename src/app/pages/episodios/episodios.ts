import { Component, inject } from '@angular/core';
import { EpisodeCard } from '../../shared/ui/episode-card/episode-card';
import { EPISODIOS } from '../../core/data/episodios';
import { Seo } from '../../core/seo/seo';

@Component({
  selector: 'app-episodios',
  imports: [EpisodeCard],
  templateUrl: './episodios.html',
  styleUrl: './episodios.scss',
})
export class Episodios {
  private readonly seo = inject(Seo);

  protected readonly episodios = EPISODIOS;

  constructor() {
    this.seo.update({
      title: 'Episódios',
      description:
        'Todos os episódios do podcast Descompila: conversas sobre tecnologia, carreira e educação.',
      path: '/episodios/',
    });

    const publicados = EPISODIOS.filter((ep) => ep.publicado);
    if (publicados.length > 0) {
      this.seo.setJsonLd('episodes', {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: publicados.map((ep, index) => ({
          '@type': 'PodcastEpisode',
          position: index + 1,
          name: ep.titulo,
          datePublished: ep.data,
          url: `https://www.youtube.com/watch?v=${ep.youtubeId}`,
          partOfSeries: { '@type': 'PodcastSeries', name: 'Descompila' },
        })),
      });
    }
  }
}
