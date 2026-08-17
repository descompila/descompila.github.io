import { Component } from '@angular/core';
import { Button } from '../../shared/ui/button/button';
import { EpisodeCard } from '../../shared/ui/episode-card/episode-card';
import { EPISODIOS } from '../../core/data/episodios';

@Component({
  selector: 'app-home',
  imports: [Button, EpisodeCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly canalUrl = 'https://www.youtube.com/@Descompila';
  protected readonly ultimoEpisodio = EPISODIOS[0];
}
