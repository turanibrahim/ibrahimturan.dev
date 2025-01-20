<script setup>
import VSectionTitle from '@/components/atoms/VSectionTitle.vue';

const props = defineProps({
  title: { type: String, default: null },
  description: { type: String, default: null },
});
</script>

<template>
  <section class="section-about">
    <v-section-title element="h3">
      {{ props.title }}
    </v-section-title>

    <p class="text-gray-700">
      {{ props.description }}
    </p>
  </section>
</template>
