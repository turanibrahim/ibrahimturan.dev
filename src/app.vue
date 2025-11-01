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

