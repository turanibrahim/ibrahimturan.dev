<script setup lang="ts">
import { computed } from 'vue'

type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ResponsiveSize = Partial<Record<'default' | 'sm' | 'md' | 'lg' | 'xl', CardSize>>

const props = withDefaults(
  defineProps<{
    title?: string
    bordered?: boolean
    dashed?: boolean
    side?: boolean
    imageFull?: boolean
    size?: CardSize | ResponsiveSize
    imageSrc?: string
    imageAlt?: string
    imageBottom?: boolean
    centered?: boolean
    color?: string
    responsive?: boolean
    figurePadding?: boolean
    figureRounded?: boolean
  }>(),
  {
    title: '',
    bordered: false,
    dashed: false,
    side: false,
    imageFull: false,
    size: 'md',
    imageSrc: '',
    imageAlt: 'card image',
    imageBottom: false,
    centered: false,
    color: '',
    responsive: false,
    figurePadding: false,
    figureRounded: false,
  },
)

const cardClasses = computed(() => {
  const classes: (string | Record<string, boolean>)[] = ['card']

  const sizeClassMap: Record<CardSize, string> = {
    xs: 'card-xs',
    sm: 'card-sm',
    md: 'card-md',
    lg: 'card-lg',
    xl: 'card-xl',
  }

  if (typeof props.size === 'string') {
    const sizeClass = sizeClassMap[props.size]
    if (sizeClass && props.size !== 'md') {
      classes.push(sizeClass)
    }
  } else if (typeof props.size === 'object') {
    for (const screen in props.size) {
      const size = props.size[screen as keyof ResponsiveSize]
      if (size) {
        const sizeClass = sizeClassMap[size]
        if (screen === 'default') {
          if (size !== 'md') classes.push(sizeClass)
        } else {
          classes.push(`${screen}:${sizeClass}`)
        }
      }
    }
  }

  classes.push({
    'card-border': props.bordered,
    'card-dash': props.dashed,
    'card-side': props.side,
    'lg:card-side': props.responsive,
    'image-full': props.imageFull,
  })

  if (props.color) {
    classes.push(props.color)
  }

  return classes
})

const figureClasses = computed(() => ({
  'px-10 pt-10': props.figurePadding,
}))

const bodyClasses = computed(() => ({
  'card-body': true,
  'items-center text-center': props.centered,
}))
</script>

<template>
  <div :class="cardClasses">
    <figure v-if="imageSrc && !imageBottom" :class="figureClasses">
      <img :src="imageSrc" :alt="imageAlt" :class="{ 'rounded-box': figureRounded }" />
    </figure>
    <slot name="figure" />

    <div :class="bodyClasses">
      <h2 v-if="title" class="card-title">
        {{ title }}
        <slot name="badge" />
      </h2>
      <slot name="title" />
      <slot />
      <div v-if="$slots.actions" class="card-actions">
        <slot name="actions" />
      </div>
    </div>

    <figure v-if="imageSrc && imageBottom" :class="figureClasses">
      <img :src="imageSrc" :alt="imageAlt" :class="{ 'rounded-box': figureRounded }" />
    </figure>
  </div>
</template>

<style>
.card {
  @apply rounded-box;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
.card-body {
  padding: 1.25rem;
  flex: 1 1 auto;
}
.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.card-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
}
.card.image-full:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: black;
  opacity: 0.75;
  z-index: 10;
}
.card.image-full > .card-body {
  position: relative;
  z-index: 20;
  color: white;
}
.card.image-full > figure > img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.card-side {
  flex-direction: row;
  align-items: stretch;
}
.card-side > figure {
  display: flex;
  width: 33%;
}
.card-side > figure > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-border {
  border-width: 1px;
  border-color: hsl(var(--b2));
}
.card-dash {
  border: 1px dashed hsl(var(--b2));
}
.card-xs .card-body {
  padding: 0.5rem;
}
.card-sm .card-body {
  padding: 1rem;
}
.card-md .card-body {
  padding: 1.25rem;
}
.card-lg .card-body {
  padding: 1.5rem;
}
.card-xl .card-body {
  padding: 2rem;
}
</style>
