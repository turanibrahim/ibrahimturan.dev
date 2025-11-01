<script setup lang="ts">
import FooterSection from '@/components/organisms/footer-section.vue';
</script>

<template>
  <main class="min-h-screen bg-base-100">
    <router-view />
  </main>
  <footer-section />
</template>
