<script setup>
import about from '@/data/about.json';
import VAboutMeSection from '@/components/organisms/VAboutMeSection.vue';
import VTechnologiesSection from '@/components/organisms/VTechnologiesSection.vue';
</script>

<template>
  <div class="home-page">
    <v-about-me-section :about="about" />

    <v-technologies-section :technologies="about.technologies" />
  </div>
</template>

<style lang="scss">
body {
  @apply bg-blue-50;
}

.home-page {
  @apply grid h-full justify-center gap-4;
}
</style>
