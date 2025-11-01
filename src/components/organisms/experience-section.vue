<script setup lang="ts">
import { computed } from 'vue';
import ExperienceCard from '@/components/molecules/experience-card.vue';
import VSection from '@/components/atoms/v-section.vue';
import VHeading from '@/components/atoms/v-heading.vue';
import experiencesData from '@/data/experiences.json';
import type { Experience } from '@/types/experience';

const experiences = computed(() => experiencesData.experiences as Experience[]);
</script>

<template>
  <v-section background="base-300">
    <v-heading level="2" class="mb-6">Experience</v-heading>
    <div class="space-y-6">
      <experience-card
        v-for="(experience, index) in experiences"
        :key="index"
        :experience="experience"
      />
    </div>
  </v-section>
</template>
