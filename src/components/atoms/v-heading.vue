<script setup lang="ts">
export interface VHeadingProps {
  level?: '1' | '2' | '3' | '4' | '5' | '6';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
  align?: 'left' | 'center' | 'right';
}

const props = withDefaults(defineProps<VHeadingProps>(), {
  level: '2',
  tag: undefined,
  weight: 'bold',
  align: 'left',
});

const componentTag = props.tag || `h${props.level}`;

const sizeClasses: Record<string, string> = {
  '1': 'text-5xl',
  '2': 'text-4xl',
  '3': 'text-3xl',
  '4': 'text-2xl',
  '5': 'text-xl',
  '6': 'text-lg',
};

const weightClasses: Record<string, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  black: 'font-black',
};

const alignClasses: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};
</script>

<template>
  <component
    :is="componentTag"
    :class="[sizeClasses[level], weightClasses[weight], alignClasses[align]]"
  >
    <slot></slot>
  </component>
</template>
