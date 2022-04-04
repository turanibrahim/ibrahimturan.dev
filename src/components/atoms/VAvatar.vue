<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
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
    :width="props.height"
    :height="props.width"
  >
</template>

<style lang="scss">
.v-avatar {
  @apply rounded-full
}
</style>
