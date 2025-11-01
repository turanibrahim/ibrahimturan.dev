<script setup lang="ts">
export interface VSectionProps {
  background?: 'base-100' | 'base-200' | 'base-300';
  paddingY?: 'sm' | 'md' | 'lg' | 'xl';
  container?: boolean;
}

withDefaults(defineProps<VSectionProps>(), {
  background: undefined,
  paddingY: 'md',
  container: true,
});

const paddingClasses: Record<string, string> = {
  sm: 'py-6',
  md: 'py-10',
  lg: 'py-16',
  xl: 'py-24',
};

const backgroundClasses: Record<string, string> = {
  'base-100': 'bg-base-100',
  'base-200': 'bg-base-200',
  'base-300': 'bg-base-300',
};
</script>

<template>
  <section
    :class="[paddingClasses[paddingY], background ? backgroundClasses[background] : '', 'relative']"
  >
    <div v-if="container" class="container">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </section>
</template>
