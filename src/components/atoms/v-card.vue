<script setup lang="ts">
import { computed } from 'vue';

type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ResponsiveSize = Partial<Record<'default' | 'sm' | 'md' | 'lg' | 'xl', CardSize>>;

const props = withDefaults(
  defineProps<{
    title?: string;
    bordered?: boolean;
    dashed?: boolean;
    side?: boolean;
    imageFull?: boolean;
    size?: CardSize | ResponsiveSize;
    imageSrc?: string;
    imageAlt?: string;
    imageBottom?: boolean;
    centered?: boolean;
    color?: string;
    responsive?: boolean;
    figurePadding?: boolean;
    figureRounded?: boolean;
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
);

const cardClasses = computed(() => {
  const classes: (string | Record<string, boolean>)[] = ['card'];

  const sizeClassMap: Record<CardSize, string> = {
    xs: 'card-xs',
    sm: 'card-sm',
    md: 'card-md',
    lg: 'card-lg',
    xl: 'card-xl',
  };

  if (typeof props.size === 'string') {
    const sizeClass = sizeClassMap[props.size];
    if (sizeClass && props.size !== 'md') {
      classes.push(sizeClass);
    }
  } else if (typeof props.size === 'object') {
    for (const screen in props.size) {
      const size = props.size[screen as keyof ResponsiveSize];
      if (size) {
        const sizeClass = sizeClassMap[size];
        if (screen === 'default') {
          if (size !== 'md') {
            classes.push(sizeClass);
          }
        } else {
          classes.push(`${screen}:${sizeClass}`);
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
  });

  if (props.color) {
    classes.push(props.color);
  }

  return classes;
});

const figureClasses = computed(() => ({
  'px-10 pt-10': props.figurePadding,
}));

const bodyClasses = computed(() => ({
  'card-body': true,
  'items-center text-center': props.centered,
}));
</script>

<template>
  <div :class="cardClasses">
    <figure v-if="imageSrc && !imageBottom" :class="figureClasses">
      <img :src="imageSrc" :alt="imageAlt" :class="{ 'rounded-box': figureRounded }" />
    </figure>
    <slot name="figure"></slot>

    <div :class="bodyClasses">
      <h2 v-if="title" class="card-title">
        {{ title }}
        <slot name="badge"></slot>
      </h2>
      <slot name="title"></slot>
      <slot></slot>
      <div v-if="$slots.actions" class="card-actions">
        <slot name="actions"></slot>
      </div>
    </div>

    <figure v-if="imageSrc && imageBottom" :class="figureClasses">
      <img :src="imageSrc" :alt="imageAlt" :class="{ 'rounded-box': figureRounded }" />
    </figure>
  </div>
</template>
