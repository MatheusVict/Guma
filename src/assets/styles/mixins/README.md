# Mixins SCSS

## Flex Mixins

Os mixins de flexbox foram criados para facilitar o uso do flexbox em todo o projeto de forma consistente e configurável.

### Como usar

Importe o mixin em seu arquivo SCSS:

```scss
@use "@/assets/styles/mixins/flex" as flex;
```

### Mixins disponíveis

#### 1. flex

Mixin principal que configura todas as propriedades do flexbox.

```scss
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

Exemplo:
```scss
.container {
  @include flex.flex(flex, row, wrap, space-between, center);
}
```

#### 2. flex-row

Atalho para criar um container flex na direção de linha (row).

```scss
@include flex.flex-row(
  $justify: flex-start,
  $align: center,
  $wrap: nowrap,
  $gap: 0
);
```

Exemplo:
```scss
.row-container {
  @include flex.flex-row(space-between, center, nowrap, 1rem);
}
```

#### 3. flex-column

Atalho para criar um container flex na direção de coluna (column).

```scss
@include flex.flex-column(
  $justify: flex-start,
  $align: center,
  $wrap: nowrap,
  $gap: 0
);
```

Exemplo:
```scss
.column-container {
  @include flex.flex-column(space-around, center, nowrap, 1rem);
}
```

#### 4. flex-center

Atalho para centralizar completamente o conteúdo (horizontal e vertical).

```scss
@include flex.flex-center($gap: 0);
```

Exemplo:
```scss
.centered-container {
  @include flex.flex-center(0.5rem);
}
```

#### 5. flex-item

Configura as propriedades de um item flex.

```scss
@include flex.flex-item(
  $grow: 0,
  $shrink: 1,
  $basis: auto,
  $align-self: auto
);
```

Exemplo:
```scss
.flex-item {
  @include flex.flex-item(1, 0, 0, center);
}
```

#### 6. flex-grow

Atalho para fazer um item crescer e ocupar todo o espaço disponível.

```scss
@include flex.flex-grow;
```

Exemplo:
```scss
.growing-item {
  @include flex.flex-grow;
}
```

#### 7. flex-space

Adiciona espaçamento entre itens flex (alternativa ao gap para maior compatibilidade).

```scss
@include flex.flex-space($margin);
```

Exemplo:
```scss
.spaced-container {
  @include flex.flex-row;
  @include flex.flex-space(1rem);
}
```

#### 8. flex-grid

Cria um grid usando flexbox.

```scss
@include flex.flex-grid(
  $columns: 3,
  $gap: 1rem,
  $width: 100%
);
```

Exemplo:
```scss
.grid-container {
  @include flex.flex-grid(4, 0.5rem);
}
```

### Valores comuns para parâmetros

#### justify-content
- `flex-start` (padrão): itens alinhados ao início
- `flex-end`: itens alinhados ao final
- `center`: itens centralizados
- `space-between`: espaço igual entre os itens
- `space-around`: espaço igual ao redor dos itens
- `space-evenly`: espaço consistente entre os itens

#### align-items
- `stretch` (padrão): itens esticados para preencher o container
- `flex-start`: itens alinhados ao topo
- `flex-end`: itens alinhados à base
- `center`: itens centralizados verticalmente
- `baseline`: itens alinhados pela linha de base do texto

#### flex-direction
- `row` (padrão): da esquerda para a direita
- `row-reverse`: da direita para a esquerda
- `column`: de cima para baixo
- `column-reverse`: de baixo para cima

#### flex-wrap
- `nowrap` (padrão): sem quebra de linha
- `wrap`: quebra para a próxima linha
- `wrap-reverse`: quebra para a linha anterior