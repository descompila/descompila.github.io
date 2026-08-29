# Plano — Newsletter e Landing Pages de Curso

## Contexto

Duas frentes novas de captura, além do formulário de patrocinadores (ver [`patrocinadores.md`](patrocinadores.md)):

1. **Newsletter** — captura de e-mail genérica, visível no site inteiro, para construir a base antes de precisar dela.
2. **Landing page de curso** — página fora do menu, com URL própria, usada para validar interesse em um curso específico (ainda não definido) antes de criar o curso de fato. Pensada para receber tráfego de anúncio/divulgação direta, não navegação orgânica do site.

Os dois casos têm a mesma necessidade de fundo: guardar o lead em algum lugar que permita, no futuro, montar sequências de e-mail automáticas (funil) — o que o Web3Forms não faz (ele só envia um e-mail avulso, sem lista, sem automação, sem descadastro).

## Ferramenta escolhida: Brevo

Comparei 3 opções gratuitas (pesquisa de ago/2026, os planos grátis mudam com frequência — vale reconferir se isso for revisitado daqui uns meses):

| | Contatos armazenados | Automação grátis | Observação |
|---|---|---|---|
| **Brevo** ✅ | Ilimitado | Até 2.000 contatos em automação, sem limite de nº de fluxos | 300 e-mails/dia no grátis |
| MailerLite | 250 (caiu de 500 em jul/2026) | Só 3 automações | Ficou apertado demais pro estágio atual |
| Systeme.io | 2.000 | Só 1 regra de automação | Inclui funil+curso+checkout prontos, mas 1 automação não cobre newsletter + curso rodando ao mesmo tempo |

Escolhido: **Brevo**. Sem teto de lista (não trava o crescimento da newsletter), automação de verdade no grátis, e — importante pro padrão já usado no site — dá pra criar um formulário "Classic" no painel do Brevo que gera uma **URL de ação pública por lista** (não é a chave secreta da conta). Isso permite reproduzir o mesmo padrão do formulário de patrocinadores: inputs com o visual do próprio site, `fetch`/POST direto pra essa URL, sem backend e sem expor nenhum segredo sensível no código.

Se no futuro o Descompila decidir vender curso com pagamento, isso é resolvido depois com uma ferramenta de checkout separada (Hotmart, Stripe, etc.) — o Brevo aqui é só e-mail/lista, de propósito, pra não empacotar duas decisões numa só.

## Segmentação: uma lista por origem

Cada ponto de captura manda pra uma **lista separada** dentro do Brevo, para permitir automações diferentes por interesse mais adiante:

- **"Newsletter Descompila"** — quem se inscreveu pelo site em geral.
- **"Interesse — \<nome do curso\>"** — uma lista por landing page de curso, criada quando o Samuelson definir o curso a validar.

Sem isso, todo mundo cai no mesmo balaio e fica impossível mandar "só pra quem quis o curso X" depois.

## LGPD — consentimento mínimo

Como é captura de e-mail pra fins de marketing, o formulário precisa de:

- Checkbox de consentimento explícito, não pré-marcado: *"Aceito receber e-mails do Descompila e sei que posso cancelar quando quiser."*
- Um lugar simples explicando o que é feito com o dado — não precisa ser um documento jurídico complexo pra um criador individual, mas precisa existir. Proposta: página curta `/privacidade` (poucos parágrafos: o que é coletado, pra quê, que fica na Brevo, como cancelar) linkada nos dois formulários.
- Link de descadastro: o Brevo já inclui isso automaticamente em todo e-mail disparado pela plataforma — não precisa construir nada.

## Arquitetura técnica

### Newsletter (site inteiro)

- Componente novo `NewsletterSignup` em `shared/ui/`, reaproveitando os componentes `Card`/`Button` já existentes — só e-mail + checkbox de consentimento + botão.
- Fica no rodapé (`Footer`), já é a área "sempre visível" do site — sem precisar redesenhar nenhuma página.
- `fetch` POST pra URL pública da lista "Newsletter Descompila" no Brevo, mesmo padrão do `patrocinadores.ts`.

### Landing page de curso (`/lp/:slug`)

Pensada pra reaproveitar quando houver mais de um curso a validar, no mesmo padrão já usado pra episódios (`episodios.ts` como fonte de dados única):

- `src/app/core/data/landing-pages.ts` — lista de objetos `{ slug, titulo, promessa, beneficios[], listaId/formAction, publicado }`.
- Um componente genérico `LandingCurso` (rota `/lp/:slug`), lê o `slug` da URL e busca o conteúdo correspondente — não precisa criar um componente novo por curso.
- **Fora do menu**: o array de links do `Header` não muda, a rota existe mas não é linkada.
- **Fora do `sitemap.xml`**: não entra nas URLs estáticas — é destino de link direto (anúncio, bio do Instagram, etc.), não de descoberta orgânica.
- **`noindex`**: precisa de um pequeno ajuste no `SeoService` (`core/seo/seo.ts`) pra aceitar uma flag `noindex` e emitir `<meta name="robots" content="noindex,nofollow">` — hoje o serviço não tem essa opção.
- **Sem header/footer padrão do site**: página de captura de tráfego pago não deve ter menu de navegação competindo com o CTA (prática padrão de landing page de funil — todo link que não seja o formulário é uma saída da conversão). Precisa de uma pequena mudança em `app.html`: esconder `<app-header>`/`<app-footer>` quando a rota atual começar com `/lp/`, mantendo só a logo (sem link) e um rodapé mínimo com o link de `/privacidade`.
- O formulário da página posta pra lista específica daquele curso no Brevo (`listaId`/`formAction` vem do `landing-pages.ts`).

## Roadmap de execução

1. **Fase L0 — Conta Brevo**: criar conta grátis, criar a lista "Newsletter Descompila", gerar o formulário Classic e pegar a URL de ação pública + nomes dos campos. *(ação manual do Samuelson — mesmo tipo de passo que foi feito pro Web3Forms)*
2. **Fase L1 — Newsletter no ar**: componente `NewsletterSignup` no rodapé, ligado à lista do Brevo, com checkbox de consentimento.
3. **Fase L2 — Infraestrutura de landing page**: rota `/lp/:slug`, `landing-pages.ts`, componente `LandingCurso`, layout sem header/footer padrão, `noindex` no `SeoService`.
4. **Fase L3 — Página `/privacidade`**: texto curto de LGPD, linkado nos dois formulários.
5. **Fase L4 — Primeira landing page real**: quando o Samuelson definir o curso a validar (nome, promessa, benefícios), criar a lista dedicada no Brevo e publicar o primeiro item em `landing-pages.ts`.

Fases L0–L3 são genéricas (infraestrutura, não dependem de decisão de conteúdo) e podem ser implementadas já. L4 depende de uma decisão de conteúdo do Samuelson.

## Pendências (adicionar em `pendencias.md`)

- Criar conta Brevo e enviar: URL de ação do formulário + nome do campo de e-mail da lista "Newsletter Descompila".
- Quando decidir o curso a validar: nome do curso, promessa (1 frase), 3–5 benefícios, e criar a lista dedicada correspondente no Brevo.
- Escolher o slug da primeira landing page (ex.: `/lp/logica-de-programacao`) — ou seguir com um placeholder até decidir.

## Status

📋 Plano — aguardando aprovação para implementar as Fases L0–L3.
