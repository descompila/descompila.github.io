export interface Episodio {
  numero: number;
  titulo: string;
  convidado: string;
  /** Data de publicação (se já publicado) ou de estreia prevista (YYYY-MM-DD). */
  data: string;
  publicado: boolean;
  youtubeId: string | null;
  descricao: string;
}

export const EPISODIOS: Episodio[] = [
  {
    numero: 1,
    titulo: 'O Desafio dos Professores na Era da Inteligência Artificial',
    convidado: 'Jean Lobo',
    data: '2026-08-23',
    publicado: false,
    youtubeId: null,
    descricao:
      'Uma conversa sobre os desafios que professores enfrentam para ensinar tecnologia e se adaptar à era da inteligência artificial.',
  },
];
