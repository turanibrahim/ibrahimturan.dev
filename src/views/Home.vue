<template>
  <div class="home-page">
    <v-about-me-section />

    <v-technologies-section />
  </div>
</template>

<script setup>
import VAboutMeSection from '@/components/organisms/VAboutMeSection.vue';
import VTechnologiesSection from '@/components/organisms/VTechnologiesSection.vue';
</script>

<style lang="scss">
body {
  @apply bg-blue-50;
}

.home-page {
  @apply grid h-full justify-center gap-4;
}
</style>
