<script setup lang="ts">
import { computed } from 'vue';
import VSection from '@/components/atoms/v-section.vue';
import VHeading from '@/components/atoms/v-heading.vue';
import VBadge from '@/components/atoms/v-badge.vue';
import VCompanyLogo from '@/components/atoms/v-company-logo.vue';
import experiencesData from '@/data/experiences.json';
import type { Experience } from '@/types/experience';

const experiences = computed(() => experiencesData.experiences as Experience[]);

const formatYear = (date: string): number => new Date(date).getFullYear();
const formatStart = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleString('en-US', { month: 'short' });
};
const isCurrent = (experience: Experience): boolean => !experience.endDate;

const totalYears = computed(() => {
  const earliest = experiences.value[experiences.value.length - 1];
  if (!earliest) return 0;
  return new Date().getFullYear() - new Date(earliest.startDate).getFullYear();
});
</script>

<template>
  <v-section
    id="experience"
    aria-labelledby="experience-heading"
    background="base-100"
    padding-y="xl"
  >
    <div class="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
      <aside class="experience-aside">
        <p class="font-mono text-xs text-primary">/ 02 — work</p>
        <v-heading
          id="experience-heading"
          level="2"
          class="mt-4 text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-base-content sm:text-5xl"
        >
          Six years of product engineering.
        </v-heading>
        <p class="mt-6 text-base text-base-content-muted">
          Building web and mobile products across startups and enterprise — frontend, backend, and
          the seams in between.
        </p>
        <div class="mt-8 flex items-baseline gap-3 border-t border-base-300 pt-6">
          <span class="font-mono text-5xl font-black text-primary tracking-[-0.06em]"
            >{{ totalYears }}+</span
          >
          <span class="text-sm text-base-content-muted"
            >years shipping<br />production products</span
          >
        </div>
        <div class="mt-6 flex flex-wrap gap-2 font-mono text-xs text-base-content-muted">
          <span class="rounded border border-base-300 px-2 py-1">Product</span>
          <span class="rounded border border-base-300 px-2 py-1">React</span>
          <span class="rounded border border-base-300 px-2 py-1">Vue</span>
          <span class="rounded border border-base-300 px-2 py-1">Node.js</span>
        </div>
      </aside>

      <ol class="experience-timeline relative space-y-0">
        <li
          v-for="(experience, index) in experiences"
          :key="`${experience.company}-${experience.startDate}`"
          class="experience-row group grid grid-cols-[64px_1fr] gap-4 border-t border-base-300 py-7 last:border-b sm:grid-cols-[96px_1fr] sm:gap-8 sm:py-9"
        >
          <div class="timeline-axis relative">
            <span
              class="axis-year block font-mono text-2xl font-bold leading-none tracking-tight text-base-content sm:text-3xl"
              :class="isCurrent(experience) ? 'text-primary' : 'text-base-content'"
            >
              {{ formatYear(experience.startDate) }}
            </span>
            <span
              class="axis-dot absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-base-100"
              :class="
                isCurrent(experience)
                  ? 'bg-primary ring-4 ring-primary/20'
                  : 'bg-base-300 group-hover:bg-primary'
              "
              aria-hidden="true"
            />
            <span
              v-if="index === 0"
              class="axis-line absolute -left-[5px] top-5 h-[calc(100%+1.75rem)] w-px bg-base-300"
              aria-hidden="true"
            />
          </div>

          <div class="space-y-3">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div class="min-w-0 flex-1">
                <p class="font-mono text-xs text-base-content-muted">
                  {{ formatStart(experience.startDate) }} —
                  <span v-if="experience.endDate">{{
                    new Date(experience.endDate).getFullYear()
                  }}</span>
                  <span v-else class="text-primary">Now</span>
                </p>
                <h3
                  class="mt-1 text-2xl font-bold tracking-[-0.025em] text-base-content sm:text-[1.65rem]"
                >
                  {{ experience.title }} <span class="text-base-content-muted">·</span>
                  <a
                    :href="experience.companyUrl || '#'"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary transition-colors hover:text-primary/80"
                  >
                    {{ experience.company }}
                  </a>
                </h3>
                <p class="mt-1 text-sm text-base-content-muted">{{ experience.location }}</p>
              </div>
              <v-company-logo
                :src="experience.companyLogo"
                :alt="`${experience.company} logo`"
                class="shrink-0"
              />
            </div>

            <p class="max-w-2xl text-base leading-relaxed text-base-content">
              {{ experience.summary }}
            </p>

            <div class="flex flex-wrap items-center gap-2 pt-1">
              <v-badge v-if="isCurrent(experience)" variant="soft" color="primary" size="sm">
                Currently here
              </v-badge>
              <span
                v-for="tech in experience.tech"
                :key="tech"
                class="rounded border border-base-300 bg-base-200 px-2 py-1 font-mono text-xs text-secondary"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </v-section>
</template>

<style scoped>
.experience-timeline::before {
  content: '';
  position: absolute;
  left: 31px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--color-base-300);
}
@media (min-width: 640px) {
  .experience-timeline::before {
    left: 47px;
  }
}
.experience-row:first-child {
  border-top: none;
  padding-top: 0;
}
.experience-row:hover .axis-year {
  color: var(--color-primary);
}
</style>
