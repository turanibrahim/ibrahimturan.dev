<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  src: {
    type: String,
    default: null,
  },
  alt: {
    type: String,
    required: true,
  },
  height: {
    type: [String, Number],
    default: '100%',
  },
  width: {
    type: [String, Number],
    default: '100%',
  },
});
</script>

<template>
  <img
    class="v-avatar"
    :src="props.src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
  >
</template>

<style lang="scss">
.v-avatar {
  @apply rounded-full
}
</style>
