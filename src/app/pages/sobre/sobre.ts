import { Component } from '@angular/core';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-sobre',
  imports: [Button],
  templateUrl: './sobre.html',
  styleUrl: './sobre.scss',
})
export class Sobre {
  protected readonly canalUrl = 'https://www.youtube.com/@Descompila';
}
