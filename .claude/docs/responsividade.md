# Plano de Responsividade — Site do Descompila

## Contexto

O design system (Fase 1) já nasceu com boas bases para responsividade — tipografia fluida com `clamp()`, layout em flex/grid, unidades relativas (`rem`) — mas isso nunca foi auditado sistematicamente em telas reais. Este plano fecha essa lacuna.

## Metodologia da auditoria

Screenshot real do site publicado (`https://descompila.github.io`) nas 5 páginas × 5 larguras (320, 375, 414, 768, 1024px), mais um script que compara `document.documentElement.scrollWidth` com `window.innerWidth` em cada combinação para detectar overflow horizontal automaticamente — não só "olhar e achar bonito", mas medir.

## O que já funciona bem (não precisa mexer)

- Tipografia com `clamp()` no `h1`/`h2` já escala suavemente sem precisar de media query.
- Header e footer já têm tratamento mobile (nav quebra em 2 linhas, padding reduz) abaixo de 640px.
- Grade de Episódios usa `auto-fill` (não trava em N colunas fixas).
- Formulário de Patrocinadores empilha em 1 coluna abaixo de 720px.
- Inputs do formulário já usam `font-size: 16px` — evita o zoom automático do iOS ao focar um campo.
- Player do YouTube usa `aspect-ratio: 16/9`, nunca estoura a viewport.
- Nenhuma página testada (exceto uma, ver abaixo) teve overflow horizontal.

## Problemas encontrados

### P1 — Bug real: overflow horizontal na grade de Episódios em telas de 320px

`episodios.scss` usa `grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr))`. Em viewports de exatamente 320px (iPhone SE e similares), o mínimo de coluna de `20rem` (320px) não cabe dentro do padding lateral do `.container` (24px de cada lado) — a grade força 320px de conteúdo dentro de 272px disponíveis, estourando ~24px pra fora da tela.

Confirmado via script: `scrollWidth` 344px em uma viewport de 320px.

**Correção**: `minmax(min(20rem, 100%), 1fr)` — trava o mínimo da coluna em 100% do espaço disponível quando ele for menor que `20rem`. Padrão conhecido para esse problema específico do CSS Grid.

### P2 — Alvos de toque abaixo do tamanho ideal

Links do menu (~38px de altura) e o botão do formulário (~41px) estão acima do mínimo de acessibilidade (24px, WCAG 2.5.8 AA) mas abaixo do tamanho confortável recomendado por Apple HIG / Material Design (44px). Em tela de toque, ficam um pouco apertados pra acertar com o dedo.

**Correção**: aumentar o padding vertical dos itens de navegação e do botão para garantir ≥44px de altura em telas de toque.

### P3 — Breakpoints inconsistentes entre componentes

Cada componente escolheu seu próprio ponto de quebra sem um padrão compartilhado: header/footer usam 640px, patrocinadores usa 720px. Funciona hoje, mas tende a virar inconsistência visual conforme o site cresce — cada seção "quebra" o layout numa largura diferente, sem motivo funcional pra isso.

**Correção**: padronizar em dois breakpoints documentados e usá-los em todo componente novo daqui pra frente:

- **640px** — telefone → onde nav/menu já quebra hoje.
- **768px** — tablet retrato → ponto de colapso de layouts em 2 colunas (patrocinadores muda de 720px para 768px).

CSS custom properties não funcionam dentro de `@media` (media query não lê `var()`), então a padronização é por convenção documentada aqui, não por variável reaproveitável — mas fica registrado para os próximos componentes seguirem o mesmo padrão em vez de escolher um valor novo.

## Roadmap de execução

Fases pequenas, cada uma testável isoladamente:

1. **Fase R0 — Corrigir o overflow (P1)**: fix de 1 linha em `episodios.scss`, baixo risco.
2. **Fase R1 — Alvos de toque (P2)**: ajustar padding de `nav a` (header) e `.btn` (button component) para ≥44px de altura.
3. **Fase R2 — Padronizar breakpoints (P3)**: unificar `patrocinadores.scss` de 720px para 768px.
4. **Fase R3 — Reteste completo**: repetir a auditoria (5 páginas × 5 larguras) depois das correções e confirmar zero overflow e alvos de toque ≥44px.

## Como testar no futuro

O script de auditoria (Playwright headless + verificação de `scrollWidth`) deve virar prática recorrente antes de qualquer mudança visual grande — não só nesta rodada. Ele mora fora do repositório (é só uma ferramenta de verificação, não faz parte do site), mas o padrão está documentado aqui para ser reproduzido:

1. Abrir cada rota nas larguras 320/375/414/768/1024px.
2. Comparar `document.documentElement.scrollWidth` com `window.innerWidth` — qualquer diferença é overflow.
3. Conferir visualmente o screenshot de cada combinação.

## Status

📋 Plano — aguardando aprovação para implementar as fases R0–R3.
