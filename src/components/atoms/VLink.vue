<template>
  <component :is="component"
    :href="props.href"
    class="inline-flex justify-center hover:bg-indigo-100 p-1 font-bold rounded"
    target="_blank"
  >
    <slot></slot>
  </component>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  link: {
    type: Boolean,
    default: true,
  },
});

const component = props.link ? 'a' : 'button';
</script>

<style lang="scss">
.v-link {
  @apply inline-flex justify-center hover:bg-indigo-100 p-1 font-bold rounded
}
</style>
