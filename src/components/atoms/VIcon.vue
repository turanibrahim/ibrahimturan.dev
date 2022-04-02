<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :width="props.width"
       :height="props.height"
       viewBox="0 0 18 18"
       :aria-labelledby="props.iconName"
  >
    <title
      :id="iconName"
      lang="en"
    >{{ props.iconName }} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  iconName: {
    type: String,
    default: 'box',
  },
  width: {
    type: [Number, String],
    default: 18,
  },
  height: {
    type: [Number, String],
    default: 18,
  },
  iconColor: {
    type: String,
    default: 'currentColor',
  },
});
</script>
