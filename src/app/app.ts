import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { Header } from './shared/layout/header/header';
import { Footer } from './shared/layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly router = inject(Router);

  // Landing pages de curso (/lp/*) têm layout próprio, sem o header/footer
  // padrão do site — não devem competir com o CTA da página.
  protected readonly isLandingPage = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.startsWith('/lp/')),
      startWith(this.router.url.startsWith('/lp/')),
    ),
    { initialValue: this.router.url.startsWith('/lp/') },
  );
}
