<script setup lang="ts">
import VNavbar from '@/components/atoms/v-navbar.vue';
</script>

<template>
  <v-navbar>
    <template #start>
      <div>Logo</div>
    </template>
    <template #center>
      <div>Links</div>
    </template>
    <template #end>
      <div>Actions</div>
    </template>
  </v-navbar>
  <main>
    <router-view />
  </main>
  <footer>
    <div>Footer</div>
  </footer>
</template>
