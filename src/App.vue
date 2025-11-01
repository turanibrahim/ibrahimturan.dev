<script setup lang="ts">
import { computed, markRaw } from 'vue';
import { useRoute } from 'vue-router';
import DefaultLayout from '@/layouts/default.layout.vue';

const route = useRoute();
const layouts: Record<string, any> = {
  default: DefaultLayout,
};

const layout = computed(() => {
  const layoutName = (route.meta.layout as string) || 'default';
  return markRaw(layouts[layoutName]);
});
</script>

<template>
  <component :is="layout || 'div'">
    <router-view />
  </component>
</template>

<style lang="scss">
.default-layout {
  @apply text-gray-800 min-h-screen bg-gray-50;

  scrollbar-color: #c3d0df transparent;
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c3d0df;
  }
}
</style>

