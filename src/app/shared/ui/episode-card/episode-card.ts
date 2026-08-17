import { Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Card } from '../card/card';
import { Button } from '../button/button';
import type { Episodio } from '../../../core/data/episodios';

@Component({
  selector: 'app-episode-card',
  imports: [Card, Button, DatePipe],
  templateUrl: './episode-card.html',
  styleUrl: './episode-card.scss',
})
export class EpisodeCard {
  private readonly sanitizer = inject(DomSanitizer);

  readonly episodio = input.required<Episodio>();
  readonly showPlayer = input(false);

  protected readonly embedUrl = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${this.episodio().youtubeId}`,
    ),
  );
}
