<template>
  <div class="home-page">
    <v-about-me-section></v-about-me-section>

    <v-technologies-section></v-technologies-section>
  </div>
</template>

<script setup>
import VAboutMeSection from '@/components/organisms/VAboutMeSection.vue';
import VTechnologiesSection from '@/components/organisms/VTechnologiesSection.vue';
</script>

<style lang="scss">
.home-page {
  @apply grid h-full justify-center gap-4 bg-blue-50;
}
</style>
