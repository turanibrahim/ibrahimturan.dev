<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonColor, ButtonVariant, ButtonSize, VButtonProps } from '@/types/v-button';

const props = withDefaults(defineProps<VButtonProps>(), {
  color: undefined,
  variant: undefined,
  size: 'md',
  wide: false,
  block: false,
  square: false,
  circle: false,
  active: false,
  disabled: false,
  loading: false,
  tag: 'button',
  href: undefined,
  to: undefined,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const componentTag = computed(() => {
  if (props.to) {
    return 'router-link';
  }
  if (props.href) {
    return 'a';
  }
  return props.tag;
});

const buttonClasses = computed(() => {
  const colorClasses: Record<ButtonColor, string> = {
    neutral: 'btn-neutral',
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    info: 'btn-info',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
  };

  const variantClasses: Record<ButtonVariant, string> = {
    outline: 'btn-outline',
    dash: 'btn-dash',
    soft: 'btn-soft',
    ghost: 'btn-ghost',
    link: 'btn-link',
  };

  const sizeClasses: Record<ButtonSize, string> = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
    xl: 'btn-xl',
  };

  const classes = ['btn'];
  if (props.color) {
    classes.push(colorClasses[props.color]);
  }
  if (props.variant) {
    classes.push(variantClasses[props.variant]);
  }
  if (props.size && props.size !== 'md') {
    classes.push(sizeClasses[props.size]);
  }
  if (props.wide) {
    classes.push('btn-wide');
  }
  if (props.block) {
    classes.push('btn-block');
  }
  if (props.square) {
    classes.push('btn-square');
  }
  if (props.circle) {
    classes.push('btn-circle');
  }
  if (props.active) {
    classes.push('btn-active');
  }
  if (props.disabled || props.loading) {
    classes.push('btn-disabled');
  }
  return classes;
});

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }
  emit('click', event);
};
</script>

<template>
  <component
    :is="componentTag"
    :class="buttonClasses"
    :href="href"
    :to="to"
    :aria-disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="loading loading-spinner"></span>
    <slot v-else></slot>
  </component>
</template>

<style>
.btn-disabled {
  cursor: not-allowed;
}
</style>
