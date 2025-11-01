<script setup lang="ts">
import type { VCompanyLogoProps } from '@/types/v-company-logo';

withDefaults(defineProps<VCompanyLogoProps>(), {
  size: 'md',
  rounded: 'lg',
  background: true,
});

const sizeClasses: Record<string, string> = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-20 h-20',
};

const roundedClasses: Record<string, string> = {
  sm: 'rounded',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :class="[
      sizeClasses[size],
      roundedClasses[rounded],
      'object-contain',
      background ? 'bg-white p-2' : '',
    ]"
  />
</template>
