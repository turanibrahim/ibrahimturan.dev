<script setup lang="ts">
import { computed } from 'vue';
import VTechBadge from '@/components/molecules/v-tech-badge.vue';
import technologiesData from '@/data/technologies.json';
import type { Technology } from '@/types/technology';

const technologies = computed<Technology[]>(() => technologiesData);
</script>

<template>
  <section class="py-10">
    <div class="container">
      <h2 class="text-4xl font-bold mb-6">Technologies</h2>
      <div class="flex flex-wrap gap-3">
        <v-tech-badge
          v-for="technology in technologies"
          :key="technology.id"
          :technology="technology"
        />
      </div>
    </div>
  </section>
</template>
