# Pendências — Ações Manuais

Itens que não são código (ou dependem de um evento externo) e por isso ficam fora do roadmap de fases. Checklist para revisitar quando fizer sentido.

- [ ] **Submeter `sitemap.xml` ao Google Search Console** — verificar o domínio `descompila.github.io` no Search Console e enviar `https://descompila.github.io/sitemap.xml`. Só vale a pena depois que houver conteúdo publicado de verdade (episódio 1 no ar).
- [ ] **Marcar o episódio 1 como publicado** — no dia 23/08/2026 (ou quando sair de fato), editar `src/app/core/data/episodios.ts`: `publicado: true` e preencher `youtubeId`. Isso já liga automaticamente o player, o link do YouTube e o JSON-LD do episódio (nada mais precisa mudar).
- [ ] **Analytics** — hoje o site não tem nenhum rastreamento. Avaliar Plausible ou GA4 (respeitando LGPD) quando fizer sentido medir audiência.
- [ ] **Domínio próprio** — hoje é `descompila.github.io`; avaliar um domínio customizado no futuro caso o canal cresça (não muda a estrutura do projeto, só a config do GitHub Pages + DNS).

## Referências

Plano geral em [`plano-de-desenvolvimento.md`](plano-de-desenvolvimento.md).
