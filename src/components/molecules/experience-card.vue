<script setup lang="ts">
import VCard from '@/components/atoms/v-card.vue';
import VCompanyLogo from '@/components/atoms/v-company-logo.vue';
import VHeading from '@/components/atoms/v-heading.vue';
import type { ExperienceCardProps } from '@/types/experience-card';
import { formatDate, calculateDuration } from '@/utils/date';

defineProps<ExperienceCardProps>();
</script>

<template>
  <v-card bordered class="bg-base-100">
    <div class="flex flex-col md:flex-row gap-6">
      <div class="shrink-0">
        <v-company-logo :src="experience.companyLogo" :alt="`${experience.company} logo`" />
      </div>

      <div class="grow space-y-3">
        <div>
          <v-heading level="3" weight="semibold" class="text-secondary-content">
            {{ experience.title }}
          </v-heading>
          <p class="text-lg text-primary font-medium">
            {{ experience.company }}
          </p>
        </div>

        <div class="flex flex-wrap gap-4 text-sm text-base-content/70">
          <span class="flex items-center gap-1">
            <span>📅</span>
            {{ formatDate(experience.startDate) }} -
            {{ experience.endDate ? formatDate(experience.endDate) : 'Present' }}
          </span>
          <span>•</span>
          <span>{{ calculateDuration(experience) }}</span>
          <span>•</span>
          <span class="flex items-center gap-1">
            <span>📍</span>
            {{ experience.location }}
          </span>
        </div>

        <div
          class="text-secondary-content leading-relaxed prose prose-sm max-w-none"
          v-html="experience.description"
        ></div>
      </div>
    </div>
  </v-card>
</template>

<style>
.prose ul {
  list-style-type: none;
  padding-left: 0;
}

.prose li::before {
  content: '• ';
  color: hsl(var(--p));
  font-weight: bold;
  margin-right: 0.5rem;
}
</style>
