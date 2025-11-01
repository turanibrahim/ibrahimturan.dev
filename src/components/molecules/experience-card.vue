<script setup lang="ts">
import VCard from '@/components/atoms/v-card.vue';
import type { Experience } from '@/types/experience';

interface Props {
  experience: Experience;
}

defineProps<Props>();

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

const calculateDuration = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate?: string;
}): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  }

  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  }

  return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
};
</script>

<template>
  <v-card bordered class="bg-base-100">
    <div class="flex flex-col md:flex-row gap-6">
      <div class="shrink-0">
        <img
          :src="experience.companyLogo"
          :alt="`${experience.company} logo`"
          class="w-16 h-16 rounded-lg object-contain bg-white p-2"
        />
      </div>

      <div class="grow space-y-3">
        <div>
          <h3 class="text-2xl font-semibold text-secondary-content">
            {{ experience.title }}
          </h3>
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
