export interface Episodio {
  numero: number;
  titulo: string;
  convidado: string;
  /** Data de publicação (YYYY-MM-DD). null enquanto não confirmada. */
  data: string | null;
  youtubeId: string;
  descricao: string;
}

export const EPISODIOS: Episodio[] = [
  {
    numero: 1,
    titulo: 'O Desafio dos Professores na Era da Inteligência Artificial',
    convidado: 'Jean Lobo',
    data: null, // TODO: confirmar data exata de publicação
    youtubeId: 'DunHrDCzHuA',
    descricao:
      'Uma conversa sobre os desafios que professores enfrentam para ensinar tecnologia e se adaptar à era da inteligência artificial.',
  },
];
