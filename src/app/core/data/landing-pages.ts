export interface LandingCurso {
  slug: string;
  titulo: string;
  promessa: string;
  beneficios: string[];
  /** URL de ação do formulário Classic do Brevo, criado para a lista deste curso. */
  formAction: string;
  /** Nome do campo de e-mail gerado pelo Brevo ao criar o formulário. */
  emailField: string;
  /** Demais campos ocultos exigidos pelo Brevo (locale, honeypot, id da lista etc.) — copiar do HTML gerado no painel. */
  hiddenFields?: Record<string, string>;
}

// Vazio até o primeiro curso ser definido (ver .claude/docs/captura-de-leads.md,
// Fase L4). Sem nenhum item aqui, a rota /lp/:slug não gera páginas no build —
// não há link nem indexação de uma landing sem conteúdo real.
export const LANDING_PAGES: LandingCurso[] = [];
