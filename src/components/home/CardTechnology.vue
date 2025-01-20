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
  @apply flex px-3 text-xs items-center bg-secondary text-white rounded-lg gap-1;
  &__icon {
    @apply justify-self-center w-4 h-4;
  }
  &__name {
    @apply py-2 text-center ;
  }
}
</style>
