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

<template>
  <component
    :is="component"
    :href="props.href"
    class="v-link"
    target="_blank"
  >
    <slot />
  </component>
</template>

<style lang="scss">
.v-link {
  @apply flex-shrink inline-flex items-center gap-1
    justify-center hover:bg-indigo-100 p-1 font-bold rounded;
}
</style>
