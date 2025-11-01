<script setup lang="ts">
import VNavbar from '@/components/atoms/v-navbar.vue';
import VFooter from '@/components/atoms/v-footer.vue';
import SocialLinks from '@/components/organisms/social-links.vue';
</script>

<template>
  <v-navbar class="shadow-sm">
    <template #center>
      <div>Links</div>
    </template>
    <template #end>
      <social-links />
    </template>
  </v-navbar>
  <main class="min-h-screen">
    <router-view />
  </main>
  <v-footer />
</template>
