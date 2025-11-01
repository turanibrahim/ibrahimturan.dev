<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons';
import { computed } from 'vue';
import type { Technology } from '@/types/technology';

export interface VTechBadgeProps {
  technology: Technology;
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<VTechBadgeProps>(), {
  size: 'md',
});

const sizeClasses: Record<string, { container: string; icon: string }> = {
  sm: {
    container: 'px-3 py-1.5 gap-1.5 text-sm',
    icon: 'w-4 h-4',
  },
  md: {
    container: 'px-4 py-2 gap-2 text-base',
    icon: 'w-5 h-5',
  },
  lg: {
    container: 'px-5 py-2.5 gap-2.5 text-lg',
    icon: 'w-6 h-6',
  },
};

const containerClass = computed(() => sizeClasses[props.size]!.container);
const iconClass = computed(() => sizeClasses[props.size]!.icon);
</script>

<template>
  <div
    :class="[
      'inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700',
      containerClass,
    ]"
  >
    <oh-vue-icon :name="technology.icon" :class="iconClass" />
    <span>{{ technology.name }}</span>
  </div>
</template>
