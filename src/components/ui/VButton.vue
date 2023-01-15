<script setup>
import { computed } from 'vue';

const props = defineProps({
  theme: { type: String, default: 'primary' },
  variant: { type: String, default: null }, // ghost, outline, link
  size: { type: String, default: null }, // lg, xs, sm
  wide: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  href: { type: String, default: null },
  to: { type: [String, Object], default: null },
  shape: { type: String, default: null }, // square, circle
});

const buttonElement = computed(() => {
  if (props.href) {
    return 'a';
  } if (props.to) {
    return 'router-link';
  }
  return 'button';
});
const buttonThemes = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
};
const buttonVariants = {
  ghost: 'btn-ghost',
  link: 'btn-link',
  outline: 'btn-outline',
  active: 'btn-active',
};
const buttonSizes = {
  lg: 'btn-lg',
  md: 'btn-md',
  sm: 'btn-sm',
  xs: 'btn-xs',
};
const buttonShapes = {
  circle: 'btn-circle',
  square: 'btn-square',
};
const buttonClass = computed(() => ({
  btn: true,
  [buttonThemes[props.theme]]: true,
  [buttonVariants[props.variant]]: props.variant,
  [buttonSizes[props.size]]: props.size,
  [buttonShapes[props.shape]]: props.shape,
  'btn-wide': props.wide,
  'btn-disabled': props.disabled,
  'btn-block': props.block,
  loading: props.loading,
}));
const buttonAttr = computed(() => ({
  ...(props.to && { to: props.to }),
  ...(props.href && { href: props.href }),
  ...(props.disabled && { disabled: true }),
}));
</script>

<template>
  <component
    :is="buttonElement"
    :class="buttonClass"
    v-bind="buttonAttr"
  >
    <slot />
  </component>
</template>
