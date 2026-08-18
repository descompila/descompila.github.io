# Plano de Desenvolvimento — Site do Descompila

## Objetivo

O Descompila volta ao ar em formato de podcast, com o episódio #01 — "O Desafio dos Professores na Era da Inteligência Artificial" (convidado: Jean Lobo) abrindo a nova fase. O site dá um lar a esse conteúdo fora do YouTube: reforça a marca, apresenta os episódios e, assim que existirem, dá visibilidade a patrocinadores e cursos.

**Nota**: a estreia do episódio 1 foi adiada (problema de saúde do convidado) para **23/08/2026**. O site trata episódios não publicados como "estreia em breve" — sem embed nem link do YouTube — até a data de fato acontecer e o vídeo ficar público. Não usar mais o link `DunHrDCzHuA` como referência de vídeo já publicado em nenhuma comunicação até a estreia real ser confirmada.

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

- **Angular 22 (standalone, zoneless)**, com `outputMode: "static"` — cada rota é prerenderizada em build time para um `index.html` próprio (sem servidor Node em produção, sem Express). Isso também elimina a necessidade do truque clássico do `404.html`: como cada rota já existe como arquivo estático real, o GitHub Pages serve `/episodios/`, `/sobre/` etc. diretamente, sem redirecionamento client-side.
- **Hospedagem**: página de organização do GitHub Pages, repositório `descompila.github.io` → servido na raiz (`https://descompila.github.io/`), `base-href` do Angular configurado como `/`. Dá pra apontar domínio próprio depois sem mudar a estrutura.
- **Conteúdo dos episódios**: lista mantida manualmente em `src/app/core/data/episodios.ts` (número, título, convidado, data, `publicado: boolean`, id do vídeo — `youtubeId` fica `null` enquanto não publicado). O componente `EpisodeCard` usa `publicado` para decidir entre mostrar o player/link do YouTube ou um selo "estreia em breve" com a data prevista, sem nunca linkar um vídeo que ainda não está no ar. Simples de editar a cada episódio novo, sem chave de API exposta no cliente — reavaliar integração com a YouTube Data API quando houver mais episódios.
- **GitHub Actions** (`.github/workflows/deploy.yml`) builda e publica `dist/descompila/browser` no GitHub Pages a cada push na `main`, via `actions/upload-pages-artifact` + `actions/deploy-pages`.

## SEO moderno

- ✅ Meta tags por rota via `SeoService` (`core/seo/seo.ts`, usa `Meta`/`Title` do Angular), chamado no `constructor()` de cada página — como o build prerenderiza cada rota, o `index.html` de cada página já nasce com title/description/OG/canonical corretos (confirmado inspecionando o `dist/`), não depende de JS rodar no cliente.
- ✅ Open Graph e Twitter Card em todas as páginas, com `public/og-image.png` (1200×630, gerado a partir do símbolo da logo) como imagem padrão.
- ✅ JSON-LD: `Organization` + `PodcastSeries` na Home; `PodcastEpisode` nos Episódios só para itens com `publicado: true` — nunca indexa um episódio que ainda não saiu.
- ✅ `sitemap.xml` e `robots.txt` estáticos em `public/`, com as 5 rotas. Falta só submeter ao Google Search Console (ação manual, fora do código).
- ✅ `font-display: swap` (padrão do `@fontsource`); `width`/`height` explícitos nas logos do header/footer para evitar CLS.
- ✅ HTML semântico (`header`/`main`/`footer`) e contraste WCAG AA conferido nas combinações de cor do design system (ver commit da Fase 3 — dois tokens foram trocados por não passarem 4.5:1).
- **Não implementado — `hreflang`**: descartado de propósito. `hreflang` sinaliza versões alternativas por idioma da mesma página; como o site é 100% pt-BR sem versão em outro idioma, isso não se aplica. O sinal de idioma correto já existe via `<html lang="pt-BR">` e `og:locale`.
- **Pendente**: submeter o `sitemap.xml` ao Google Search Console assim que o domínio for verificado (ação manual do Samuelson).

## Patrocinadores

Sem patrocinador hoje, mas a estrutura já nasce pronta: um componente `PatrocinadorCard` alimentado por uma lista simples (nome, logo, link, episódios patrocinados). Enquanto a lista estiver vazia, `/patrocinadores` mostra uma chamada "quero patrocinar o Descompila" com um formulário de captação (Formspree/Web3Forms, sem backend) ligado direto ao e-mail do responsável pelo canal.

Estratégia completa de captação, ferramenta escolhida e estrutura da página em [`patrocinadores.md`](patrocinadores.md).

## Roadmap de execução

Fases pequenas e sequenciais — cada uma entrega algo que já poderia ir ao ar sozinho.

1. **Fase 0 — Fundação** ✅ concluída: repositório `descompila/descompila.github.io` criado, projeto Angular 22 (standalone, zoneless, `outputMode: static`) com ESLint + Prettier, estrutura de pastas (`pages/`, `shared/layout/`), rotas lazy para as 5 páginas com header/footer navegáveis, favicon/ícones gerados a partir do símbolo da logo, `base-href` `/`.
2. **Fase 1 — Design system** ✅ concluída: tokens de cor/tipografia (CSS custom properties, com suporte a tema claro/escuro via `prefers-color-scheme`), IBM Plex Sans/Mono self-hosted via `@fontsource`, componentes `Button` e `Card` reutilizáveis, Header/Footer com as logos reais.
3. **Fase 2 — Páginas principais** ✅ concluída: Home (hero + próximo episódio), Episódios (grid alimentado por `episodios.ts`, trata publicado vs. "estreia em breve"), Sobre (propósito real + bio do apresentador) e Patrocinadores (formulário funcional via Web3Forms, ver [`patrocinadores.md`](patrocinadores.md)) com conteúdo real.
4. **Fase 3 — SEO e performance** ✅ concluída: meta tags por rota, Open Graph/Twitter Card, JSON-LD condicionado a conteúdo publicado, sitemap/robots.txt, contraste WCAG AA revisado.
5. **Fase 4 — CI/CD e lançamento**: ✅ pipeline no ar (`.github/workflows/deploy.yml`, deploy automático a cada push na `main`); falta apenas o episódio 1 sair de verdade (23/08) e divulgar no canal.
6. **Fase 5 — Patrocinadores e cursos** (contínuo): páginas "em breve" evoluem para reais assim que houver patrocinador ou curso confirmado.
7. **Fase 6 — Responsividade** ✅ concluída: corrigido o bug de overflow na grade de Episódios (320px), alvos de toque do menu/botões elevados a 44px, breakpoints padronizados (640px/768px). Detalhes em [`responsividade.md`](responsividade.md).

**Status atual**: site no ar em <https://descompila.github.io/> com identidade visual, conteúdo real, SEO técnico e responsividade revisada. Falta essencialmente aguardar a estreia do episódio 1 (23/08/2026) para marcar `publicado: true` em `episodios.ts`.

## Decisões já confirmadas

- **Hospedagem**: página de organização do GitHub Pages, repositório `Descompila/descompila.github.io`, servida em `https://descompila.github.io/`, não domínio próprio por enquanto.
- **Episódios**: lista mantida manualmente no código, sem integração com a API do YouTube por ora.
- **Captação de patrocinadores**: formulário via Web3Forms (sem backend), access key já configurada em `patrocinadores.ts`; leads controlados numa planilha simples — ver [`patrocinadores.md`](patrocinadores.md).
- **Nome do repositório**: `descompila.github.io`, na organização `descompila` (github.com/descompila) — usado no `base-href` (`/`) e nas URLs. Site publicado em <https://descompila.github.io/>.

## Referência

Plano publicado também como artifact interativo: https://claude.ai/code/artifact/e82f9572-ca43-4e4e-919f-60862a0a2966
