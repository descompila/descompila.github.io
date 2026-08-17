import { Component } from '@angular/core';
import { Button } from '../../shared/ui/button/button';
import { Card } from '../../shared/ui/card/card';

@Component({
  selector: 'app-home',
  imports: [Button, Card],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly episodio1Url = 'https://www.youtube.com/watch?v=DunHrDCzHuA';
  protected readonly canalUrl = 'https://www.youtube.com/@Descompila';
}
