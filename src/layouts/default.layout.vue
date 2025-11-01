<script setup lang="ts">
import VNavbar from '@/components/atoms/v-navbar.vue';
</script>

<template>
  <v-navbar class="shadow-sm">
    <template #center>
      <div>Links</div>
    </template>
  </v-navbar>
  <main>
    <router-view />
  </main>
  <footer>
    <div>Footer</div>
  </footer>
</template>
