# Design System — Trainer Fitness

> **Referência:** captura de uma landing page de personal trainer, com seções de apresentação, serviços, biografia, vídeo, depoimentos, planos, transformações, FAQ e rodapé. **Precisão:** cores e medidas são estimativas visuais da captura, não valores extraídos do código-fonte. Os valores abaixo são tokens propostos para uma implementação consistente. A imagem mostra principalmente a versão desktop; comportamentos responsivos e estados interativos são recomendações de implementação.

## 1. Visão geral do estilo visual

A direção é **fitness premium, editorial e energética**, combinando áreas brancas amplas, blocos verde-petróleo quase pretos, fotografias de treino e acentos verde-lima elétricos. O contraste entre fundos escuros e CTAs vibrantes cria foco imediato em conversão, sem recorrer a efeitos visuais pesados.

- **Estética:** minimalismo esportivo contemporâneo, cards arredondados, tipografia sans-serif geométrica, imagens fotográficas de pessoas reais.
- **Sensação:** confiança, disciplina, progresso, proximidade e orientação individualizada.
- **Sofisticação:** alta, porém acessível; composição arejada e poucas cores de destaque.
- **Contraste:** branco/preto para leitura, verde-lima em números e ações, painéis verde-escuros para momentos de maior impacto.
- **Hierarquia:** hero com headline grande e treinador em destaque; títulos de seção concisos; cards de serviços; prova de autoridade; depoimentos; preços; galeria de resultados; FAQ.
- **Personalidade:** treinador humano, seguro e motivador, mais focado em resultados concretos do que em agressividade visual.
- **Assinaturas visuais:** botões em cápsula com círculo de seta, títulos em negrito, número “14+” verde-lima, palavras grandes translúcidas como textura de fundo, imagens com cantos arredondados.

## 2. Paleta de cores

Todos os HEX abaixo são **aproximados**, estimados visualmente a partir da referência.

| Token semântico | HEX aproximado | Uso no layout | Função visual |
|---|---|---|---|
| `--color-bg` | `#FFFFFF` | Fundo geral e áreas editoriais | Respiro e clareza |
| `--color-surface` | `#F4F5F3` | Cards de planos e FAQ | Agrupamento suave |
| `--color-surface-sage` | `#EDF1E9` | Cards alternativos de serviços/preços | Variação discreta de superfície |
| `--color-brand` | `#063B38` | Hero, vídeo, plano em destaque, rodapé | Identidade e contraste |
| `--color-brand-deep` | `#032F2D` | Áreas escuras e hover | Profundidade e solidez |
| `--color-accent` | `#B7FF18` | CTA, números, estrelas e destaques | Energia e prioridade |
| `--color-accent-hover` | `#A1E80B` | Hover de CTA (proposto) | Feedback interativo |
| `--color-text` | `#171B1A` | Títulos e texto principal | Legibilidade |
| `--color-text-muted` | `#626B68` | Descrições e metadados | Hierarquia secundária |
| `--color-text-inverse` | `#FFFFFF` | Textos em blocos escuros | Contraste inverso |
| `--color-border` | `#E5E9E6` | Contornos, separadores e inputs | Delimitação sutil |
| `--color-icon-dark` | `#071B19` | Círculos de setas | Contraste em botões |
| `--color-success` | `#87C915` | Checks e avaliações (inferido) | Reforço positivo |
| `--color-disabled` | `#B9C1BD` | Controles indisponíveis (proposto) | Estado inativo |

**Regras:** use verde-lima em pequenas doses, prioritariamente em ações, indicadores e números; não o aplique como cor de parágrafo. Garanta contraste mínimo WCAG AA (4,5:1 em texto normal; 3:1 em texto grande e componentes relevantes). Texto branco sobre lima pode falhar: prefira texto escuro.

```css
:root {
  --color-bg: #ffffff;
  --color-surface: #f4f5f3;
  --color-surface-sage: #edf1e9;
  --color-brand: #063b38;
  --color-brand-deep: #032f2d;
  --color-accent: #b7ff18;
  --color-accent-hover: #a1e80b;
  --color-text: #171b1a;
  --color-text-muted: #626b68;
  --color-text-inverse: #ffffff;
  --color-border: #e5e9e6;
  --color-success: #87c915;
  --color-disabled: #b9c1bd;
}
```

## 3. Tipografia

A fonte exata não é verificável na imagem. **Manrope** ou **Satoshi** reproduzem bem a aparência geométrica e encorpada; **Inter** ou **Geist** são alternativas seguras. Sugestão de implementação: `Manrope, Inter, sans-serif`.

| Papel/token | Desktop | Peso | Line-height | Letter-spacing | Uso |
|---|---:|---:|---:|---:|---|
| `display` | 56–64px | 800 | 1.05 | -0.045em | Headline do hero |
| `h1` | 44–52px | 800 | 1.1 | -0.04em | Títulos de grande destaque |
| `h2` | 32–40px | 750–800 | 1.15 | -0.035em | Títulos de seção |
| `h3` | 22–28px | 700–800 | 1.2 | -0.025em | Títulos de blocos |
| `h4` | 17–20px | 700 | 1.3 | -0.015em | Cards e subtítulos |
| `body` | 15–16px | 400–500 | 1.6 | 0 | Parágrafos |
| `body-sm` | 13–14px | 400–500 | 1.5 | 0 | Descrições de cards |
| `caption` | 11–12px | 500–600 | 1.4 | 0.01em | Rótulos, credenciais |
| `button` | 13–14px | 700 | 1.2 | 0 | CTAs |
| `eyebrow` | 12–13px | 700 | 1.4 | 0.01em | “Who I Am”, microtítulos |
| `metric` | 64–80px | 800 | 1 | -0.05em | “14+”, preços em destaque |

**Responsividade:** `display` reduz para 38–44px no tablet e 34–40px no celular; `h2` para 26–30px e 24–28px, respectivamente. Não reduzir texto corrido abaixo de 14px. Manter linhas de títulos curtas (aprox. 10–18 palavras no máximo por bloco, conforme contexto).

```css
:root {
  --font-sans: 'Manrope', 'Inter', system-ui, sans-serif;
  --text-body: 1rem;
  --text-section: clamp(1.5rem, 2.8vw, 2.5rem);
  --text-display: clamp(2.125rem, 4.6vw, 4rem);
}
body { font-family: var(--font-sans); color: var(--color-text); }
h1, h2, h3 { letter-spacing: -0.035em; }
```

## 4. Espaçamentos

Escala base sugerida de 4/8px:

| Token | Valor | Uso típico |
|---|---:|---|
| `--space-2xs` | 4px | Separação de ícone e rótulo |
| `--space-xs` | 8px | Microespaços e labels |
| `--space-sm` | 12px | Textos próximos |
| `--space-md` | 16px | Gap interno de cards |
| `--space-lg` | 24px | Padding compacto e entre componentes |
| `--space-xl` | 32px | Padding de cards e grid |
| `--space-2xl` | 48px | Grupos de conteúdo |
| `--space-3xl` | 64px | Respiro entre blocos |
| `--space-4xl` | 96px | Distância entre seções desktop |

- **Entre seções:** 80–112px desktop; 56–72px tablet; 48–64px mobile.
- **Padding de painéis grandes:** 48–64px desktop; 24–32px mobile.
- **Padding de cards:** 24–32px desktop; 20–24px mobile.
- **Gap entre cards:** 20–24px desktop; 16px mobile.
- **Título → descrição:** 12–20px; **descrição → CTA:** 24–32px.
- **Container:** `max-width: 1200px` como ponto de partida; ajustar para a proporção da referência.
- **Margens laterais:** 32–48px desktop, 24px tablet, 16–20px mobile.
- **Largura de leitura:** limitar parágrafos longos a `60–70ch`.

## 5. Grid e layout

O site usa **container centralizado** com seções de largura variável e blocos que alternam texto e fotografia. A captura mostra um hero horizontal, uma fileira/carrossel de serviços, seção biográfica em duas colunas, vídeo com painel lateral, depoimentos assimétricos, três planos lado a lado, mosaico de transformações, FAQ estreito e rodapé multicoluna.

| Região | Desktop | Tablet | Mobile |
|---|---|---|---|
| Header | Logo, navegação, CTA em linha | Navegação reduzida | Logo + menu acessível |
| Hero | Texto à esquerda, pessoa à direita | Duas colunas proporcionais | Empilhar ou manter imagem como fundo com overlay |
| Serviços | 3–4 cards visíveis, overflow horizontal | 2 cards | 1 card + próximo parcialmente visível |
| Biografia | Foto 45%, texto 55% | 45/55 ou empilhado | Foto antes do texto |
| Vídeo/missão | Duas áreas ~60/40 | 50/50 | Vídeo acima do painel |
| Depoimentos | Texto e avatares em colunas | Duas colunas compactas | Empilhados |
| Preços | 3 colunas iguais | 2 colunas ou 1 | 1 coluna |
| Transformações | Mosaico com tiles variáveis | 3 colunas | 2 colunas |
| FAQ | Coluna central de largura reduzida | 100% com limite | 100% |
| Rodapé | 3–4 grupos | 2 grupos | Empilhado |

**Breakpoints propostos:** mobile `< 640px`, tablet `640–1023px`, desktop `≥ 1024px`. Use CSS Grid para seções e Flexbox para header, botões e linhas internas. Evite largura fixa nos cards; utilize `minmax(0, 1fr)` e `min-width: 0`. A imagem de referência não comprova os layouts tablet/mobile: as adaptações são decisões de design recomendadas.

```css
.container { width: min(100% - 40px, 1200px); margin-inline: auto; }
.grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.split { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 48px; }
@media (max-width: 1023px) { .grid-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 639px) {
  .container { width: min(100% - 32px, 1200px); }
  .grid-3, .split { grid-template-columns: 1fr; }
}
```

## 6. Bordas e radius

O desenho é suave, com **cantos arredondados moderados**, não excessivamente orgânicos.

| Token | Valor aproximado | Aplicação |
|---|---:|---|
| `--radius-sm` | 8px | Accordion, controles pequenos |
| `--radius-md` | 12px | Imagens e cards compactos |
| `--radius-lg` | 16px | Cards de serviço e preços |
| `--radius-xl` | 20px | Hero, vídeo e blocos de destaque |
| `--radius-pill` | 999px | CTAs e ícones circulares |
| `--border-width` | 1px | Botões outline, inputs, divisores |

Bordas discretas em `#E5E9E6`; em botões outline sobre fundo escuro, usar branco translúcido. Divisores são mínimos: a separação é feita principalmente por espaços e alternância de superfícies. Inputs não são claramente mostrados; `12px` é uma recomendação coerente.

## 7. Sombras e profundidade

O layout é **predominantemente flat**. A profundidade vem de fotografia, recorte de imagens, sobreposição de texto, blocos contrastantes e pequenos círculos de ação. Não há evidência forte de glassmorphism ou glow.

- **Sombra de card opcional:** `0 8px 24px rgba(3, 47, 45, .06)`; intensidade muito baixa.
- **Sombra de hover opcional:** `0 12px 32px rgba(3, 47, 45, .10)`.
- **Overlay de imagem:** `linear-gradient(90deg, rgba(3,47,45,.96), rgba(3,47,45,.45) 60%, transparent)` no hero, ajustado conforme a foto.
- **Blur:** não usar como linguagem predominante; somente em fundos de modais, se necessários.
- **Aplicar:** hover de cards clicáveis e destaque de elementos flutuantes.
- **Evitar:** sombras escuras marcadas em todos os cards, neon glow, vidros foscos e bordas tridimensionais.

## 8. Botões e CTAs

A marca usa **botões cápsula**, frequentemente combinados com um círculo de seta à direita. Há CTAs verde-lima, contornos neutros e pequenos controles redondos de navegação.

| Variante | Fundo | Texto | Padding | Radius | Peso | Uso |
|---|---|---|---|---|---:|---|
| Primário | `#B7FF18` | `#071B19` | 12px 20px | 999px | 700 | Agendamento, começar treino, conversão |
| Secundário escuro | `#063B38` | `#FFFFFF` | 12px 20px | 999px | 700 | CTA alternativo em área clara |
| Outline | Transparente | `#171B1A` | 11px 19px | 999px | 700 | Seleção de plano, ação secundária |
| Ghost/link | Transparente | Contextual | 8px 4px | 8px | 600 | Navegação e links auxiliares |
| Ícone circular | Branco ou verde-escuro | Contraste | 10–12px | 50% | — | Setas, carrossel, play |

**Estados recomendados:**

- **Hover:** primário `#A1E80B`; escuro `#032F2D`; outline com superfície `#F4F5F3`; transição 150–200ms.
- **Active:** leve escurecimento e `transform: translateY(1px)`; respeitar `prefers-reduced-motion`.
- **Disabled:** fundo `#E5E9E6`, texto `#626B68`, sem hover; `disabled` nativo.
- **Focus-visible:** outline de 2–3px em cor de alto contraste com offset de 3px.
- **Tamanho mínimo clicável:** 44×44px, inclusive ícones isolados.

```css
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  min-height: 44px; padding: 12px 20px; border-radius: 999px;
  border: 1px solid transparent; font: 700 14px/1.2 var(--font-sans);
  cursor: pointer; transition: background-color .18s, transform .18s; }
.btn--primary { background: var(--color-accent); color: var(--color-text); }
.btn--primary:hover { background: var(--color-accent-hover); }
.btn:active { transform: translateY(1px); }
.btn:focus-visible { outline: 3px solid var(--color-brand); outline-offset: 3px; }
.btn:disabled { background: #e5e9e6; color: #626b68; cursor: not-allowed; }
@media (prefers-reduced-motion: reduce) { .btn { transition: none; } }
```

## 9. Cards e blocos de conteúdo

### Cards de serviços

- **Fundo:** alternância entre `#EDF1E9`, `#F4F5F3` e branco.
- **Padding de conteúdo:** 24–28px; **radius:** 12–16px; **borda:** ausente ou 1px muito sutil; **sombra:** nenhuma.
- **Estrutura:** título curto → descrição em corpo pequeno → foto ocupando a base do card → seta circular sobreposta no canto inferior direito.
- **Imagem:** `object-fit: cover`, enquadramento ativo, altura consistente por linha.
- **Hover:** leve elevação opcional e mudança de cor do botão de seta; preservar estabilidade do grid.

### Card de autoridade/biografia

Foto vertical grande com overlay escuro inferior; métrica “14+” em verde-lima e legenda branca. Ao lado, eyebrow, título, parágrafo, CTA e lista de certificações com ícones pequenos. Manter métrica legível mesmo sobre imagem.

### Painel de vídeo e missão

Bloco horizontal de cantos arredondados: imagem/vídeo à esquerda e área verde-escura à direita. Título branco, nome do treinador, ícones sociais verdes e tipografia decorativa grande de baixa opacidade ao fundo.

### Depoimentos

Texto de avaliação com cinco estrelas verde-lima, assinatura discreta e composição de avatares circulares à direita. Avatares não devem competir com a citação.

### Cards de preços

Três cartões alinhados; os laterais usam fundos claros e o plano central recebe fundo verde-escuro, preço verde-lima e sinalização de destaque. Estrutura: ícone → nome → preço/período → botão → lista de benefícios. Igualar alturas sempre que possível e manter o CTA em posição consistente.

### FAQ

Accordion centralizado em superfície cinza muito clara, linhas horizontais separadas, pergunta semibold, ícone de expandir à direita. Estado aberto apresenta texto explicativo e ícone de fechar. Recomendar `button` com `aria-expanded` e região associada via `aria-controls`.

## 10. Imagens, ícones e elementos visuais

### Fotografia

- **Estilo:** fotografia realista de academia, personal trainer, nutrição e acompanhamento individual; cenas de esforço e interação, sem aparência de banco de imagens excessivamente posado.
- **Cores:** predominância de neutros e ambientes de academia; preservar tons de pele naturais; harmonizar com o verde-escuro.
- **Hero:** treinador recortado ou fotografado sobre ambiente escuro, ocupando o lado direito; texto no lado esquerdo sobre overlay.
- **Serviços:** fotos horizontais ou levemente verticais, com enquadramento semelhante entre cards.
- **Transformações:** mosaico de fotos antes/depois e selfies, tamanhos e proporções variáveis; evitar distorção, padronizar raio e espaçamento. Solicitar consentimento de imagem e evitar alegações de resultados garantidos.
- **Renderização:** usar `object-fit: cover`, `object-position` específico por imagem e `aspect-ratio` para evitar layout shift. Aplicar lazy-loading fora da primeira dobra.

### Ícones

Ícones lineares simples (ex.: Lucide), traço 1.75–2px, tamanho 16–20px; ações circulares 36–44px. Repetir uma mesma linguagem visual para setas, checks, estrelas, menu e controles de carrossel.

### Avatares

Circulares (`border-radius: 50%`), geralmente em preto e branco ou com tratamento neutro, em composição assimétrica. Garantir `alt` apropriado para depoimentos reais e não usar rostos fictícios como prova social.

### Ilustrações e mockups

Não são elementos dominantes na referência. Evitar introduzir ilustrações vetoriais coloridas ou mockups de dispositivos que desviem da direção fotográfica.

### Elementos decorativos

- Letras/palavras grandes, em caixa alta, sobre fundo escuro, com opacidade ~5–12%; são textura, não conteúdo informacional.
- Verde-lima para palavras selecionadas na headline e indicadores numéricos.
- Controles de seta e círculos sobrepostos em fotos.
- Gradientes sutis escuros apenas onde necessários para leitura sobre imagem.
- Rodapé verde-escuro com colunas de navegação, contatos e CTA em verde-lima.

## 11. Componentes reutilizáveis sugeridos

| Componente | Variantes/props importantes |
|---|---|
| `SiteHeader` | `sticky?`, `mobileMenuOpen`, `cta` |
| `HeroTrainer` | `eyebrow`, `title`, `highlight`, `image`, `cta` |
| `SectionHeading` | `eyebrow?`, `title`, `description?`, `action?` |
| `ServiceCard` | `title`, `description`, `image`, `href`, `tone` |
| `ServiceCarousel` | `items`, `activeIndex`, `controls` |
| `TrainerBio` | `image`, `yearsExperience`, `credentials`, `cta` |
| `VideoMission` | `poster`, `videoUrl`, `mission`, `socialLinks` |
| `Testimonial` | `quote`, `author`, `rating`, `avatar?` |
| `PricingCard` | `plan`, `price`, `period`, `features`, `featured`, `cta` |
| `TransformationGallery` | `images`, `captions`, `consentVerified` |
| `FaqAccordion` | `items`, `allowMultiple?` |
| `SiteFooter` | `linkGroups`, `contacts`, `socialLinks`, `cta` |

## 12. Tokens adicionais e checklist de implementação

```css
:root {
  --container-max: 1200px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-pill: 999px;
  --shadow-card: 0 8px 24px rgba(3, 47, 45, .06);
  --shadow-hover: 0 12px 32px rgba(3, 47, 45, .10);
  --section-gap: clamp(48px, 7vw, 96px);
  --transition-fast: 180ms ease;
}
```

**Critérios de aceite:**

1. O hero preserva a relação texto à esquerda/foto à direita no desktop e mantém leitura no mobile.
2. O acento verde-lima é reservado a CTAs, métricas e destaques, não a grandes áreas de texto.
3. Cards de serviço, preço e FAQ compartilham uma escala coerente de raios, espaçamentos e tipografia.
4. O plano recomendado é distinguível por contraste e por texto, não somente pela cor.
5. Botões, carrossel, menu e FAQ funcionam com teclado, foco visível e rótulos acessíveis.
6. Fotos não deformam; usam `aspect-ratio`, cortes conscientes e texto alternativo adequado.
7. Layout não produz rolagem horizontal involuntária em 320px de largura (exceto carrossel intencional).
8. Imagens fora da dobra são carregadas sob demanda; imagens do hero são priorizadas.
9. Animações respeitam `prefers-reduced-motion`.
10. Valores de cor e medidas são validados contra os arquivos originais do projeto quando disponíveis; esta especificação é uma reconstrução visual.

---

*Documento derivado exclusivamente da imagem de referência. Cores, dimensões, estados e layouts responsivos não visíveis foram estimados ou propostos para orientar o desenvolvimento front-end.*
