<script setup lang="ts">
import { computed } from 'vue';
import type { AvatarSize, VAvatarProps } from '@/types/v-avatar';

const props = withDefaults(defineProps<VAvatarProps>(), {
  alt: 'avatar',
  size: 'md',
  shape: 'rounded',
  mask: '',
  online: false,
  offline: false,
  placeholder: false,
  text: '',
  ring: false,
});

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'w-8',
  sm: 'w-12',
  md: 'w-16',
  lg: 'w-24',
  xl: 'w-64',
};

const avatarClass = computed(() => [
  'avatar',
  {
    'avatar-online': props.online,
    'avatar-offline': props.offline,
    'avatar-placeholder': props.placeholder || !props.src,
  },
]);

const innerClass = computed(() => [
  sizeClasses[props.size],
  props.shape,
  props.mask,
  {
    'ring-2 ring-primary ring-offset-base-100 ring-offset-2': props.ring,
    'bg-neutral text-neutral-content': props.placeholder || !props.src,
  },
]);

const textClass = computed(() => {
  if (props.text.length > 2) {
    return {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-2xl',
    }[props.size];
  }
  return {
    xs: 'text-xs',
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-5xl',
  }[props.size];
});
</script>

<template>
  <div :class="avatarClass">
    <div :class="innerClass">
      <img v-if="src" :src="src" :alt="alt" />
      <span v-else :class="textClass">{{ text }}</span>
    </div>
  </div>
</template>
