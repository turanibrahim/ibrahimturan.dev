<script setup lang="ts">
export interface VCompanyLogoProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  background?: boolean;
}

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
