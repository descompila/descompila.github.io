import { Component, signal } from '@angular/core';
import { Button } from '../../shared/ui/button/button';
import { Card } from '../../shared/ui/card/card';

// TODO: substituir pela access key gerada em https://web3forms.com (ver .claude/docs/patrocinadores.md)
const WEB3FORMS_ACCESS_KEY = '';

@Component({
  selector: 'app-patrocinadores',
  imports: [Button, Card],
  templateUrl: './patrocinadores.html',
  styleUrl: './patrocinadores.scss',
})
export class Patrocinadores {
  protected readonly submitting = signal(false);
  protected readonly submitted = signal(false);
  protected readonly error = signal<string | null>(null);

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    this.submitting.set(true);
    this.error.set(null);

    try {
      const formData = new FormData(form);
      formData.append('access_key', WEB3FORMS_ACCESS_KEY);
      formData.append('subject', 'Novo contato de patrocínio — Descompila');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
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
