<script setup>
import SectionSidebar from '@/components/home/SectionSidebar.vue';
</script>

<template>
  <div class="home-page h-full">
    <div class="container mx-auto">
      <div class="grid grid grid-cols-12 gap-0">
        <div class="col-span-12 md:col-span-4">
          <SectionSidebar />
        </div>

        <div class="col-span-12 md:col-span-8">
          <div class="h-full flex items-center md:min-h-screen">
            Main Content
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "src/assets/styles/pages/home";
</style>
