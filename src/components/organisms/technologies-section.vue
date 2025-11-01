<script setup lang="ts">
import { computed } from 'vue';
import VTechBadge from '@/components/molecules/v-tech-badge.vue';
import VSection from '@/components/atoms/v-section.vue';
import VHeading from '@/components/atoms/v-heading.vue';
import technologiesData from '@/data/technologies.json';
import type { Technology } from '@/types/technology';

const technologies = computed<Technology[]>(() => technologiesData);
</script>

<template>
  <v-section>
    <v-heading level="2" class="mb-6">Technologies</v-heading>
    <div class="flex flex-wrap gap-3">
      <v-tech-badge
        v-for="technology in technologies"
        :key="technology.id"
        :technology="technology"
      />
    </div>
  </v-section>
</template>
