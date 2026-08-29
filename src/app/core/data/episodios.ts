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

// Ordem: mais recente primeiro (Home usa EPISODIOS[0] como "último episódio").
export const EPISODIOS: Episodio[] = [
  {
    numero: 2,
    titulo: 'O Desafio dos Professores na Era da Inteligência Artificial',
    convidado: 'Jean Lobo',
    data: '2026-08-24',
    publicado: true,
    youtubeId: 'DunHrDCzHuA',
    descricao:
      'Uma conversa sobre os desafios que professores enfrentam para ensinar tecnologia e se adaptar à era da inteligência artificial.',
  },
  {
    numero: 1,
    titulo: 'Dados na prática: o que a teoria não te ensina sobre o mercado',
    convidado: 'Eduardo Brito',
    data: '2026-08-23',
    publicado: true,
    youtubeId: '3CCEgyMKMQ8',
    descricao:
      'Uma conversa sobre trabalhar com dados de verdade — o que muda entre o que se aprende na teoria e o dia a dia do mercado.',
  },
];
