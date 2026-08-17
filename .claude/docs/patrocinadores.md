# Estratégia de Captação de Patrocinadores

Plano de baixo/zero custo para a página `/patrocinadores` (menu "Seja Patrocinador"), pensado para a fase inicial do projeto — sem patrocinador nenhum ainda e sem orçamento para ferramentas pagas.

## Por que não uma ferramenta de e-mail marketing

O site é estático (Angular + GitHub Pages, sem backend). Captar leads de patrocinador é um problema diferente de manter uma newsletter para a audiência: baixo volume, cada lead é tratado individualmente, não precisa de automação de e-mails. Por isso, a escolha aqui é um **serviço de formulário sem backend**, não uma plataforma de e-mail marketing — essa entra depois, se e quando fizer sentido nutrir a audiência (não os patrocinadores) em escala.

## Ferramenta recomendada

- **[Formspree](https://formspree.io)** — plano free (~50 envios/mês), endpoint HTML puro (`<form action="...">`), submissão cai direto no e-mail. Suficiente para o volume esperado no início.
- Alternativa: **[Web3Forms](https://web3forms.com)** — free, sem limite de envios, mesmo princípio.
- Migrar para algo como ConvertKit (free até 10 mil contatos) só se um dia for preciso nutrir leads com e-mails automáticos — não é necessário agora.

## Estrutura da página `/patrocinadores`

1. **Proposta de valor honesta**: sem audiência grande ainda, o mídia kit vende o nicho (educação tech), o formato (podcast com convidados) e o episódio #1 como prova de conceito — não números inflados.
2. **CTA único de conversão**: formulário "Quero patrocinar" com nome, empresa, e-mail e mensagem, via Formspree/Web3Forms, caindo direto no e-mail do responsável pelo canal.
3. **Sem CRM pago**: cada lead recebido é copiado manualmente para uma planilha do Google Sheets (gratuita) com status (contatado, negociando, fechado) — suficiente até haver dezenas de leads simultâneos.
4. **Gatilho de crescimento**: só migrar para uma ferramenta mais robusta (CRM, automações) quando o volume de leads ou a necessidade de e-mails automáticos justificar.

## Onde entra no roadmap

Integrado à **Fase 2** (páginas principais) do [`plano-de-desenvolvimento.md`](plano-de-desenvolvimento.md) — a página `/patrocinadores` já nasce com o formulário funcional, mesmo em estado "em breve" de captação de patrocinadores reais.
