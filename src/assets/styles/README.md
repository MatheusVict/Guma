# 🎨 Guia de Estilos - Mixins e Variáveis

Este documento serve como referência completa para todos os mixins e variáveis disponíveis no sistema de design do projeto.

## 📋 Índice

- [Variáveis](#-variáveis)
  - [Cores](#cores)
  - [Tipografia](#tipografia)
  - [Espaçamentos](#espaçamentos)
  - [Breakpoints](#breakpoints)
- [Mixins](#-mixins)
  - [Flexbox](#flexbox)
  - [Estilos de Texto](#estilos-de-texto)
- [Helpers](#-helpers)
- [Como Usar](#-como-usar)

---

## 🎨 Variáveis

### Cores

O sistema de cores é organizado em paletas temáticas com variações de tonalidade.

#### 🔶 Laranja (Orange)
```scss
@use 'path/to/variables/colors' as colors;

// Tons claros
colors.color('orange', 'light-1')    // #EDB664
colors.color('orange', 'light-2')    // #F88559
colors.color('orange', 'light-3')    // #F37443
colors.color('orange', 'light-4')    // #E9BD7C

// Cor principal
colors.color('orange', 'primary')    // #FC682F
colors.color('orange')               // #FC682F (atalho)

// Tons escuros
colors.color('orange', 'dark-1')     // #FA591B
colors.color('orange', 'dark-2')     // #EA5217
colors.color('orange', 'dark-3')     // #F64D0C
colors.color('orange', 'dark-4')     // #D9440B
colors.color('orange', 'dark-5')     // #C13E0C
colors.color('orange', 'dark-6')     // #A33105

// Dourado
colors.color('orange', 'gold')       // #F0B256
```

#### ⚫ Neutros (Neutral)
```scss
// Tons claros
colors.color('neutral', 'white-off')        // #FDF8F3
colors.color('neutral', 'cream')            // #FDF1E5
colors.color('neutral', 'gray-lightest')    // #EBE5E0
colors.color('neutral', 'gray-lighter')     // #DAD8D5
colors.color('neutral', 'gray-light')       // #BFBFBF
colors.color('neutral', 'gray-mauve')       // #C7B7B7

// Tons médios
colors.color('neutral', 'gray-medium')      // #ACA5A5
colors.color('neutral', 'gray-medium-dark') // #968E8E

// Tons escuros
colors.color('neutral', 'gray-dark')        // #534E4E
colors.color('neutral', 'gray-darkest')     // #2D2929
```

#### ⚫ Escuro (Dark)
```scss
colors.color('dark', 'primary')      // #000000
colors.color('dark', 'dark-2')       // #120C0C
```

#### 🟡 Dourado (Gold)
```scss
// Tons claros
colors.color('gold', 'light-1')      // #EDAC4B
colors.color('gold', 'light-2')      // #E7A23C
colors.color('gold', 'light-3')      // #EA9E2F
colors.color('gold', 'light-4')      // #EE991C

// Principal
colors.color('gold', 'primary')      // #F2950A

// Tons escuros
colors.color('gold', 'dark-1')       // #BE770F
colors.color('gold', 'dark-2')       // #965E0B
```

#### 🟨 Amarelo (Yellow)
```scss
// Tons claros
colors.color('yellow', 'light-1')    // #F0E93F
colors.color('yellow', 'light-2')    // #FAF236
colors.color('yellow', 'light-3')    // #E1D920

// Principal
colors.color('yellow', 'primary')    // #F4EB0F

// Variações
colors.color('yellow', 'variant-1')  // #E5DD17
colors.color('yellow', 'variant-2')  // #EAE227
colors.color('yellow', 'variant-3')  // #F6EE26
colors.color('yellow', 'variant-4')  // #F3EA15

// Tons escuros
colors.color('yellow', 'dark-1')     // #C7BE02
colors.color('yellow', 'dark-2')     // #767105
```

#### 🟢 Verde (Green)
```scss
// Tons claros
colors.color('green', 'light-1')     // #7DF03F
colors.color('green', 'light-2')     // #79F935
colors.color('green', 'light-3')     // #6AFB1C
colors.color('green', 'light-4')     // #5FFF09

// Tons médios
colors.color('green', 'medium-1')    // #68DF28
colors.color('green', 'medium-2')    // #58D316
colors.color('green', 'medium-3')    // #49BD0B

// Tons escuros
colors.color('green', 'dark-1')      // #286805
colors.color('green', 'dark-2')      // #378C09
colors.color('green', 'dark-3')      // #47AB11
```

#### 🔴 Vermelho (Red)
```scss
// Tons claros
colors.color('red', 'light-1')       // #F03F42
colors.color('red', 'light-2')       // #F12B2F
colors.color('red', 'light-3')       // #EB2226

// Principal
colors.color('red', 'primary')       // #FE0D11
colors.color('red', 'variant')       // #ED090D

// Tons escuros
colors.color('red', 'dark-1')        // #D60408
colors.color('red', 'dark-2')        // #CB0003
colors.color('red', 'dark-3')        // #AF0003
colors.color('red', 'dark-4')        // #A30104
colors.color('red', 'dark-5')        // #820507
```

#### 🔵 Azul (Blue)
```scss
// Tons claros
colors.color('blue', 'light-1')      // #3F9BF0
colors.color('blue', 'light-2')      // #319AFC
colors.color('blue', 'light-3')      // #3092EE
colors.color('blue', 'light-4')      // #1B8FFC

// Principal
colors.color('blue', 'primary')      // #0084FF

// Tons escuros
colors.color('blue', 'dark-1')       // #037FF2
colors.color('blue', 'dark-2')       // #0574DC
colors.color('blue', 'dark-3')       // #066DCD
colors.color('blue', 'dark-4')       // #0758A3
colors.color('blue', 'dark-5')       // #02386A
```

### Tipografia

#### Famílias de Fonte
```scss
@use 'path/to/variables/typography' as typography;

$font-primary: 'Montserrat', sans-serif;    // Texto principal
$font-secondary: 'Underdog', cursive;       // Títulos e destaques
```

#### Tamanhos de Fonte
```scss
// Usando maps para fácil acesso
'xs': 0.75rem     // 12px
'sm': 0.875rem    // 14px
'base': 1rem      // 16px
'md': 1.125rem    // 18px
'lg': 1.25rem     // 20px
'xl': 1.5rem      // 24px
'2xl': 1.875rem   // 30px
'3xl': 2.25rem    // 36px
'4xl': 3rem       // 48px
'5xl': 3.75rem    // 60px
'6xl': 4.5rem     // 72px
```

#### Pesos de Fonte
```scss
'thin': 100
'extra-light': 200
'light': 300
'regular': 400
'medium': 500
'semi-bold': 600
'bold': 700
'extra-bold': 800
'black': 900
```

#### Altura de Linha
```scss
'none': 1
'tight': 1.25
'snug': 1.375
'normal': 1.5
'relaxed': 1.625
'loose': 2
```

#### Espaçamento de Letras
```scss
'tighter': -0.05em
'tight': -0.025em
'normal': 0
'wide': 0.025em
'wider': 0.05em
'widest': 0.1em
```

### Espaçamentos

#### Margins e Paddings
```scss
@use 'path/to/variables/base' as base;

// Margins
$margin-xs: 4px;
$margin-sm: 8px;
$margin-md: 16px;
$margin-lg: 24px;
$margin-xl: 32px;
$margin-xxl: 48px;

// Paddings (mesmos valores)
$padding-xs: 4px;
$padding-sm: 8px;
$padding-md: 16px;
$padding-lg: 24px;
$padding-xl: 32px;
$padding-xxl: 48px;
```

#### Tamanhos Gerais
```scss
$size-xs: 4px;
$size-sm: 8px;
$size-md: 16px;
$size-lg: 24px;
$size-xl: 32px;
$size-xxl: 48px;
$size-xxxl: 64px;
$size-xxxxl: 100px;
$size-100-percent: 100%;
```

#### Border Radius
```scss
$border-radius-base: 8px;
$border-radius-sm: 1px;
$border-radius-md: 3px;
$border-radius-custom: 1px 1px 1px 3px;
$border-radius-lg: 10px;
```

#### Bordas
```scss
$border-primary-gray: 3px solid colors.color("neutral", "gray-dark");
$border-primary-accent: 6px solid;
```

### Breakpoints

```scss
@use 'path/to/variables/breakpoints' as breakpoints;

$breakpoint-xs: 320px;   // Mobile pequeno
$breakpoint-sm: 576px;   // Mobile
$breakpoint-md: 768px;   // Tablet
$breakpoint-lg: 992px;   // Desktop pequeno
$breakpoint-xl: 1200px;  // Desktop
$breakpoint-xxl: 1400px; // Desktop grande
```

---

## 🧩 Mixins

### Flexbox

Um conjunto completo de mixins para trabalhar com flexbox de forma configurável.

#### Mixin Principal
```scss
@use 'path/to/mixins/flex' as flex;

@include flex.flex(
  $display: flex,
  $direction: row,
  $wrap: nowrap,
  $justify: flex-start,
  $align: stretch,
  $align-content: stretch,
  $gap: 0
);
```

#### Flexbox Row
```scss
@include flex.flex-row(
  $justify: flex-start,
  $align: center,
  $wrap: nowrap,
  $gap: 0
);
```

**Exemplo:**
```scss
.header {
  @include flex.flex-row(space-between, center, nowrap, 1rem);
}
```

#### Flexbox Column
```scss
@include flex.flex-column(
  $justify: flex-start,
  $align: center,
  $wrap: nowrap,
  $gap: 0
);
```

**Exemplo:**
```scss
.sidebar {
  @include flex.flex-column(flex-start, stretch, nowrap, 0.5rem);
}
```

#### Centralização Completa
```scss
@include flex.flex-center($gap: 0);
```

**Exemplo:**
```scss
.modal {
  @include flex.flex-center(2rem);
}
```

#### Propriedades de Flex Item
```scss
@include flex.flex-item(
  $grow: 0,
  $shrink: 1,
  $basis: auto,
  $align-self: auto
);
```

#### Flex Grow (Item que cresce)
```scss
@include flex.flex-grow;
// Equivale a: flex: 1;
```

#### Grid com Flexbox
```scss
@include flex.flex-grid(
  $columns: 3,
  $gap: 1rem,
  $width: 100%
);
```

**Exemplo:**
```scss
.card-grid {
  @include flex.flex-grid(4, 1.5rem, 100%);
}
```

#### Espaçamento entre Itens
```scss
@include flex.flex-space($margin);
```

### Estilos de Texto

#### Mixin Principal de Texto
```scss
@use 'path/to/mixins/text-styles' as text;

@include text.text-style(
  $size: 'base',
  $weight: 'regular',
  $line-height: 'normal',
  $family: 'primary'
);
```

#### Títulos (Headings)
```scss
// H1
@include text.heading-1;  // 4xl, bold, tight, secondary

// H2
@include text.heading-2;  // 3xl, bold, tight, secondary

// H3
@include text.heading-3;  // 2xl, semi-bold, tight, secondary

// H4
@include text.heading-4;  // xl, semi-bold, tight, secondary

// H5
@include text.heading-5;  // lg, medium, tight, secondary

// H6
@include text.heading-6;  // md, medium, tight, secondary
```

**Exemplo:**
```scss
.page-title {
  @include text.heading-1;
  color: colors.color('orange', 'primary');
}
```

#### Textos de Corpo
```scss
// Texto grande
@include text.body-large;    // lg, regular, normal, primary

// Texto padrão
@include text.body-default;  // base, regular, normal, primary

// Texto pequeno
@include text.body-small;    // sm, regular, normal, primary
```

#### Estilos Especiais
```scss
// Legenda
@include text.caption;       // xs, regular, normal, primary

// Texto de botão
@include text.button-text;   // base, medium, normal, primary + letter-spacing

// Texto de destaque
@include text.accent-text;   // lg, regular, normal, primary
```

---

## 🛠 Helpers

### Funções de Tipografia

```scss
@use 'path/to/helpers/heading-styles' as headingStyles;

// Acessar família de fonte
headingStyles.font-family('primary')   // 'Montserrat', sans-serif
headingStyles.font-family('secondary') // 'Underdog', cursive

// Acessar peso de fonte
headingStyles.font-weight('bold')      // 700
headingStyles.font-weight('medium')    // 500

// Acessar tamanho de fonte
headingStyles.font-size('xl')          // 1.5rem
headingStyles.font-size('base')        // 1rem

// Acessar altura de linha
headingStyles.line-height('tight')     // 1.25
headingStyles.line-height('normal')    // 1.5

// Acessar espaçamento de letras
headingStyles.letter-spacing('wide')   // 0.025em
```

---

## 🚀 Como Usar

### 1. Importar Módulos

```scss
// Para cores
@use 'src/assets/styles/variables/colors' as colors;

// Para mixins de flexbox
@use 'src/assets/styles/mixins/flex' as flex;

// Para mixins de texto
@use 'src/assets/styles/mixins/text-styles' as text;

// Para variáveis base
@use 'src/assets/styles/variables/base' as base;

// Para breakpoints
@use 'src/assets/styles/variables/breakpoints' as breakpoints;
```

### 2. Exemplos Práticos

#### Card Component
```scss
.card {
  @include flex.flex-column(flex-start, stretch, nowrap, base.$margin-md);
  background-color: colors.color('neutral', 'white-off');
  border: base.$border-primary-gray;
  border-radius: base.$border-radius-base;
  padding: base.$padding-lg;
  
  &__title {
    @include text.heading-3;
    color: colors.color('orange', 'primary');
    margin-bottom: base.$margin-sm;
  }
  
  &__content {
    @include text.body-default;
    color: colors.color('neutral', 'gray-dark');
  }
}
```

#### Button Component
```scss
.button {
  @include flex.flex-center(base.$size-sm);
  @include text.button-text;
  
  background-color: colors.color('orange', 'primary');
  color: colors.color('neutral', 'white-off');
  border: none;
  border-radius: base.$border-radius-base;
  padding: base.$padding-md base.$padding-lg;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: colors.color('orange', 'dark-1');
  }
  
  &--secondary {
    background-color: colors.color('neutral', 'gray-light');
    color: colors.color('neutral', 'gray-dark');
    
    &:hover {
      background-color: colors.color('neutral', 'gray-medium');
    }
  }
}
```

#### Layout Grid
```scss
.content-grid {
  @include flex.flex-grid(3, 2rem, 100%);
  
  // Responsivo
  @media (max-width: breakpoints.$breakpoint-md) {
    @include flex.flex-grid(2, 1rem, 100%);
  }
  
  @media (max-width: breakpoints.$breakpoint-sm) {
    @include flex.flex-grid(1, 0.5rem, 100%);
  }
}
```

### 3. Boas Práticas

#### ✅ Faça
- Use os mixins para consistência
- Prefira as funções de cores em vez de valores hardcoded
- Mantenha a nomenclatura semântica
- Use os breakpoints definidos para responsividade

#### ❌ Evite
- Valores de cor hardcoded (`#FF0000`)
- Propriedades flexbox manuais quando há mixins disponíveis
- Tamanhos de fonte em pixels diretos
- Breakpoints customizados sem necessidade

### 4. Extensões Futuras

Para adicionar novas cores ou mixins:

1. **Novas cores**: Adicione ao mapa `$colors` em `variables/_colors.scss`
2. **Novos mixins de flexbox**: Adicione ao `mixins/_flex.scss`
3. **Novos estilos de texto**: Adicione ao `mixins/text-styles.scss`
4. **Novas variáveis**: Adicione aos arquivos apropriados em `variables/`

---

## 📚 Referências

- [Sass Documentation](https://sass-lang.com/documentation)
- [CSS Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Design System Best Practices](https://www.designsystems.com/)

---

*Esta documentação deve ser mantida atualizada conforme novas funcionalidades são adicionadas ao sistema de design.*