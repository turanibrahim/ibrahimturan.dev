<script setup>
const props = defineProps({
  title: { type: String, default: null },
  description: { type: String, default: null },
});
</script>

<template>
  <div class="section-about">
    <h3 class="font-bold text-4xl mb-3">
      {{ props.title }}
    </h3>

    <p class="text-gray-700">
      {{ props.description }}
    </p>
  </div>
</template>
