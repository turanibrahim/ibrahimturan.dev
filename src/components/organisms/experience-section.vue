<script setup lang="ts">
import { computed } from 'vue';
import ExperienceCard from '@/components/molecules/experience-card.vue';
import experiencesData from '@/data/experiences.json';
import type { Experience } from '@/types/experience';

const experiences = computed(() => experiencesData.experiences as Experience[]);
</script>

<template>
  <section class="py-10 bg-base-300">
    <div class="container">
      <h2 class="text-4xl font-bold mb-6">Experience</h2>
      <div class="space-y-6">
        <experience-card
          v-for="(experience, index) in experiences"
          :key="index"
          :experience="experience"
        />
      </div>
    </div>
  </section>
</template>
