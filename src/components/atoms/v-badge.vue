<script setup lang="ts">
import { computed } from 'vue';

export interface VBadgeProps {
  variant?: 'default' | 'outline' | 'dash' | 'soft' | 'ghost';
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  tag?: string;
}

const props = withDefaults(defineProps<VBadgeProps>(), {
  variant: 'default',
  color: undefined,
  size: 'md',
  tag: 'span',
});

const variantClasses: Record<string, string> = {
  outline: 'badge-outline',
  dash: 'badge-dash',
  soft: 'badge-soft',
  ghost: 'badge-ghost',
};

const colorClasses: Record<string, string> = {
  neutral: 'badge-neutral',
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
};

const sizeClasses: Record<string, string> = {
  xs: 'badge-xs',
  sm: 'badge-sm',
  lg: 'badge-lg',
  xl: 'badge-xl',
};

const badgeClasses = computed(() => {
  const classes = ['badge'];

  const variantClass = props.variant ? variantClasses[props.variant] : undefined;
  if (variantClass) {
    classes.push(variantClass);
  }

  const colorClass = props.color ? colorClasses[props.color] : undefined;
  if (colorClass) {
    classes.push(colorClass);
  }

  const sizeClass = props.size ? sizeClasses[props.size] : undefined;
  if (sizeClass) {
    classes.push(sizeClass);
  }

  return classes.join(' ');
});
</script>

<template>
  <component :is="tag" :class="badgeClasses">
    <slot></slot>
  </component>
</template>
