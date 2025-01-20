<script setup>
import { computed } from 'vue';

const props = defineProps({
  element: { type: String, default: 'h2' },
});

const computedClass = computed(() => ({
  'section-title': true,
  'text-4xl lg:text-6xl': props.element === 'h1',
  'text-3xl lg:text-5xl': props.element === 'h2',
  'text-2xl lg:text-4xl': props.element === 'h3',
  'text-xl lg:text-3xl': props.element === 'h4',
  'text-lg lg:text-2xl': props.element === 'h5',
  'text-base lg:text-xl': props.element === 'h6',
}));
</script>

<template>
  <component :is="props.element" :class="computedClass">
    <slot></slot>
  </component>
</template>

<style lang="scss">
.section-title {
  @apply font-bold pb-2 w-fit relative after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-1 after:rounded-full after:w-1/3 after:mt-4 after:bg-secondary after:transition-all after:duration-300 after:scale-x-0 after:origin-left hover:after:scale-x-100;
}
</style>
