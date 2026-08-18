import { Component, inject, signal } from '@angular/core';
import { Button } from '../../shared/ui/button/button';
import { Card } from '../../shared/ui/card/card';
import { Seo } from '../../core/seo/seo';

const WEB3FORMS_ACCESS_KEY = '26565cff-e293-40b4-8dd4-300180fca945';

@Component({
  selector: 'app-patrocinadores',
  imports: [Button, Card],
  templateUrl: './patrocinadores.html',
  styleUrl: './patrocinadores.scss',
})
export class Patrocinadores {
  private readonly seo = inject(Seo);

  protected readonly submitting = signal(false);
  protected readonly submitted = signal(false);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.seo.update({
      title: 'Seja Patrocinador',
      description:
        'Patrocine o podcast Descompila e alcance uma audiência interessada em tecnologia, carreira e educação.',
      path: '/patrocinadores/',
    });
  }

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    this.submitting.set(true);
    this.error.set(null);

    try {
      const payload = {
        ...Object.fromEntries(new FormData(form)),
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'Novo contato de patrocínio — Descompila',
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (data.success) {
        this.submitted.set(true);
        form.reset();
      } else {
        this.error.set('Não foi possível enviar agora. Tente de novo ou mande um e-mail direto.');
      }
    } catch {
      this.error.set('Não foi possível enviar agora. Tente de novo ou mande um e-mail direto.');
    } finally {
      this.submitting.set(false);
    }
  }
}
