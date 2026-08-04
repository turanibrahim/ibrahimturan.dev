<script setup lang="ts">
import FooterSection from '@/components/organisms/footer-section.vue';
</script>

<template>
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-content focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100"
  >
    Skip to main content
  </a>
  <main id="main" class="min-h-screen bg-base-100">
    <router-view />
  </main>
  <footer-section />
</template>
