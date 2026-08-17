import { Component } from '@angular/core';
import { EpisodeCard } from '../../shared/ui/episode-card/episode-card';
import { EPISODIOS } from '../../core/data/episodios';

@Component({
  selector: 'app-episodios',
  imports: [EpisodeCard],
  templateUrl: './episodios.html',
  styleUrl: './episodios.scss',
})
export class Episodios {
  protected readonly episodios = EPISODIOS;
}
