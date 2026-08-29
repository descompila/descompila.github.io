import { DOCUMENT } from '@angular/common';
import { Service, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

const SITE_URL = 'https://descompila.github.io';
const SITE_NAME = 'Descompila';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export interface SeoConfig {
  title: string;
  description: string;
  /** Caminho da rota, começando com "/" (ex: "/episodios/"). */
  path: string;
  image?: string;
  /** Marca a página para não ser indexada (ex: landing pages de tráfego pago). */
  noindex?: boolean;
}

@Service()
export class Seo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(config: SeoConfig): void {
    const url = `${SITE_URL}${config.path}`;
    const image = config.image ?? DEFAULT_IMAGE;
    const fullTitle = `${config.title} · ${SITE_NAME}`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({
      name: 'robots',
      content: config.noindex ? 'noindex,nofollow' : 'index,follow',
    });

    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: 'pt_BR' });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setCanonical(url);
  }

  /** Injeta (ou atualiza) um bloco JSON-LD identificado por `id` no <head>. */
  setJsonLd(id: string, data: object): void {
    const selector = `script[type="application/ld+json"][data-seo-id="${id}"]`;
    let script = this.document.head.querySelector(selector) as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-id', id);
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
