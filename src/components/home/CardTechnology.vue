<script setup>
import { defineAsyncComponent, defineProps } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: '75',
  },
  height: {
    type: String,
    default: '75',
  },
});
const icon = defineAsyncComponent(() => import(`../icons/V${props.icon}Icon.vue`));
</script>

<template>
  <div class="v-technology-card">
    <component
      :is="icon"
      class="v-technology-card__icon"
      :width="width"
      :height="height"
    />
    <span class="v-technology-card__name">
      <slot />
    </span>
  </div>
</template>

<style lang="scss">
.v-technology-card {
  @apply flex flex-col p-5 items-center;
  &__icon {
    @apply justify-self-center;
  }
  &__name {
    @apply py-2 text-center font-medium  text-gray-600;
  }
}
</style>
