<script setup lang="ts">
import VCard from '@/components/atoms/v-card.vue';
import VCompanyLogo from '@/components/atoms/v-company-logo.vue';
import VHeading from '@/components/atoms/v-heading.vue';
import VBadge from '@/components/atoms/v-badge.vue';
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

      <div class="grow space-y-3 min-w-0">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div>
            <v-heading level="3" weight="semibold" class="text-secondary">
              {{ experience.title }}
            </v-heading>
            <p class="text-lg text-primary font-medium">
              {{ experience.company }}
            </p>
          </div>
          <v-badge v-if="latest" variant="soft" color="primary" size="sm"> Current </v-badge>
        </div>

        <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-base-content-muted">
          <span class="inline-flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-4 w-4"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill-rule="evenodd"
                d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
                clip-rule="evenodd"
              />
            </svg>
            <span>
              {{ formatDate(experience.startDate) }} -
              {{ experience.endDate ? formatDate(experience.endDate) : 'Present' }}
            </span>
          </span>
          <span aria-hidden="true" class="text-base-content-muted/60">•</span>
          <span>{{ calculateDuration(experience) }}</span>
          <span aria-hidden="true" class="text-base-content-muted/60">•</span>
          <span class="inline-flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-4 w-4"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill-rule="evenodd"
                d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .757.433 6.943 6.943 0 0 0 .281.14l.018.008.006.003.002.001Z"
                clip-rule="evenodd"
              />
            </svg>
            <span>{{ experience.location }}</span>
          </span>
        </div>

        <div
          class="text-base-content leading-relaxed prose prose-sm max-w-none"
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
  color: var(--color-primary);
  font-weight: bold;
  margin-right: 0.5rem;
}
</style>
