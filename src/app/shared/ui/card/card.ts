import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  host: {
    '[class.elevated]': 'elevated()',
  },
})
export class Card {
  readonly elevated = input(true);
}
