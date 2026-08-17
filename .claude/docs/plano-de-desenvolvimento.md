# Plano de Desenvolvimento — Site do Descompila

## Objetivo

O Descompila volta ao ar em formato de podcast, com o episódio [#01 — "O Desafio dos Professores na Era da Inteligência Artificial"](https://www.youtube.com/watch?v=DunHrDCzHuA) (convidado: Jean Lobo) abrindo a nova fase. O site dá um lar a esse conteúdo fora do YouTube: reforça a marca, apresenta os episódios e, assim que existirem, dá visibilidade a patrocinadores e cursos.

Identidade visual detalhada em [`identidade-visual.md`](identidade-visual.md).

## Arquitetura do site

Poucas páginas, cada uma com um trabalho claro. "Cursos" e "Patrocinadores" entram como páginas reais desde o início, em estado "em breve" — nada especulativo.

| Rota               | Página            | Conteúdo                                                                 |
|---------------------|--------------------|----------------------------------------------------------------------------|
| `/`                  | Home               | Último episódio em destaque, resumo do propósito, chamada para redes      |
| `/episodios`         | Episódios          | Grade com todos os episódios, embed responsivo do YouTube, data e convidado |
| `/sobre`             | Sobre              | História do canal, propósito, quem apresenta                              |
| `/patrocinadores`    | Patrocinadores     | Vitrine de patrocinadores + CTA de contato. **Em breve**                  |
| `/cursos`            | Cursos             | Reserva para lançamento futuro; hoje captura e-mail de interesse. **Em breve** |
| rodapé               | Redes e contato    | YouTube e demais redes, sempre visíveis                                   |

## Stack técnica

Angular direto no GitHub Pages, sem backend — todo o conteúdo é estático ou vem do próprio YouTube.

- **Angular (standalone components)**, última versão estável, com *prerendering/SSG* nativo (`ng build` com rotas prerenderizadas) — essencial porque GitHub Pages não roda Angular Universal com servidor; cada rota precisa nascer como HTML pronto para o SEO funcionar.
- **Roteamento em site estático**: GitHub Pages não reescreve URLs para o Angular Router, então é preciso o truque do `404.html` (cópia do `index.html` que redireciona de volta para a rota certa).
- **Hospedagem**: página de organização do GitHub Pages, repositório `descompila.github.io` → servido na raiz (`https://descompila.github.io/`), `base-href` do Angular configurado como `/`. Dá pra apontar domínio próprio depois sem mudar a estrutura.
- **Conteúdo dos episódios**: lista mantida manualmente como array JSON/TS no repositório (id do vídeo, título, data, convidado, patrocinadores do episódio). Simples de editar a cada episódio novo, sem chave de API exposta no cliente — reavaliar integração com a YouTube Data API quando houver mais episódios.
- **GitHub Actions** para build e deploy automático a cada push na branch principal.

## SEO moderno

- Meta tags por rota via `Meta`/`Title` do Angular, geradas em build time (prerender), não só no cliente.
- Open Graph e Twitter Cards em cada página, com a logo como imagem padrão de compartilhamento.
- Dados estruturados (JSON-LD) — `PodcastSeries`/`PodcastEpisode` e `Organization` do schema.org.
- `sitemap.xml` e `robots.txt` gerados no build e enviados ao Google Search Console.
- Core Web Vitals: imagens em WebP/AVIF com lazy loading, fontes com `font-display: swap`, sem JS bloqueando o primeiro paint.
- HTML semântico e acessível (landmarks, alt text, contraste AA).
- URL canônica e `hreflang="pt-BR"`.

## Patrocinadores

Sem patrocinador hoje, mas a estrutura já nasce pronta: um componente `PatrocinadorCard` alimentado por uma lista simples (nome, logo, link, episódios patrocinados). Enquanto a lista estiver vazia, `/patrocinadores` mostra uma chamada "quero patrocinar o Descompila" com um formulário de captação (Formspree/Web3Forms, sem backend) ligado direto ao e-mail do responsável pelo canal.

Estratégia completa de captação, ferramenta escolhida e estrutura da página em [`patrocinadores.md`](patrocinadores.md).

## Roadmap de execução

Fases pequenas e sequenciais — cada uma entrega algo que já poderia ir ao ar sozinho.

1. **Fase 0 — Fundação** (~1 semana): repositório no GitHub, projeto Angular novo, ESLint/Prettier, estrutura de pastas, favicon a partir do símbolo da logo, `base-href` como `/`.
2. **Fase 1 — Design system** (~1 semana): tokens de cor e tipografia, componentes base (header, footer, card de episódio, botão), integração das variações de logo.
3. **Fase 2 — Páginas principais** (~1–2 semanas): Home, Episódios (com o episódio 1 já publicado), Sobre e Patrocinadores (com formulário de captação já funcional — ver [`patrocinadores.md`](patrocinadores.md)), com conteúdo real desde o início.
4. **Fase 3 — SEO e performance** (~3–5 dias): prerender por rota, meta tags, JSON-LD, sitemap, checagem de Core Web Vitals.
5. **Fase 4 — CI/CD e lançamento** (~2–3 dias): GitHub Actions para deploy automático, teste em produção, divulgação no canal.
6. **Fase 5 — Patrocinadores e cursos** (contínuo): páginas "em breve" evoluem para reais assim que houver patrocinador ou curso confirmado.

## Decisões já confirmadas

- **Hospedagem**: página de organização do GitHub Pages, repositório `Descompila/descompila.github.io`, servida em `https://descompila.github.io/`, não domínio próprio por enquanto.
- **Episódios**: lista mantida manualmente no código, sem integração com a API do YouTube por ora.
- **Captação de patrocinadores**: formulário via Formspree/Web3Forms (sem backend), leads controlados numa planilha simples — ver [`patrocinadores.md`](patrocinadores.md).
- **Nome do repositório**: `descompila.github.io`, na organização/usuário `Descompila` — usado no `base-href` (`/`) e nas URLs.

## Referência

Plano publicado também como artifact interativo: https://claude.ai/code/artifact/e82f9572-ca43-4e4e-919f-60862a0a2966
