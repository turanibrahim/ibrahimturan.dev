<script setup lang="ts">
import { computed } from 'vue';
import VSection from '@/components/atoms/v-section.vue';
import VHeading from '@/components/atoms/v-heading.vue';
import VIcon from '@/components/atoms/v-icon.vue';
import technologiesData from '@/data/technologies.json';
import type { Technology, TechCategory, TechCategoryGroup } from '@/types/technology';

const technologies = computed<Technology[]>(() => technologiesData as Technology[]);

const groups: TechCategoryGroup[] = [
  { key: 'frontend', label: 'Frontend', blurb: 'Web apps, design systems, and component architecture.' },
  { key: 'mobile', label: 'Mobile', blurb: 'Cross-platform product builds.' },
  { key: 'backend', label: 'Backend', blurb: 'APIs, services, and data layers.' },
  { key: 'tooling', label: 'Tooling', blurb: 'Build, test, ship, observe.' },
];

const grouped = computed<Record<TechCategory, Technology[]>>(() => {
  return technologies.value.reduce(
    (acc, tech) => {
      acc[tech.category].push(tech);
      return acc;
    },
    { frontend: [], mobile: [], backend: [], tooling: [] } as Record<TechCategory, Technology[]>,
  );
});

const levelStyle = (level: Technology['level']): string => {
  if (level === 'primary') return 'border-primary/40 bg-primary/10 text-base-content';
  if (level === 'working') return 'border-base-300 bg-base-100 text-base-content';
  return 'border-base-300 bg-transparent text-base-content-muted';
};

const levelLabel = (level: Technology['level']): string => {
  if (level === 'primary') return 'primary';
  if (level === 'working') return 'working';
  return 'familiar';
};
</script>

<template>
  <v-section id="technologies" aria-labelledby="technologies-heading" padding-y="xl" background="base-200">
    <div class="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-20">
      <aside class="tech-aside">
        <p class="font-mono text-xs text-primary">/ 03 — stack</p>
        <v-heading
          id="technologies-heading"
          level="2"
          class="mt-4 text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-base-content sm:text-5xl"
        >
          Full-stack, frontend-leaning.
        </v-heading>
        <p class="mt-6 text-base text-base-content-muted">
          React, Vue, React Native, and Node.js — paired with the build, test, and deploy systems that keep a product moving.
        </p>
        <div class="mt-8 border-t border-base-300 pt-6">
          <p class="font-mono text-xs text-base-content-muted">Currently shipping</p>
          <p class="mt-2 text-2xl font-bold tracking-[-0.02em] text-base-content">
            React · TypeScript · Node.js
          </p>
        </div>
      </aside>

      <div class="tech-grid space-y-10">
        <div v-for="group in groups" :key="group.key" class="tech-group">
          <div class="mb-4 flex items-baseline justify-between gap-3">
            <h3 class="text-lg font-bold tracking-[-0.02em] text-base-content">
              {{ group.label }}
            </h3>
            <span class="font-mono text-xs text-base-content-muted">{{ group.blurb }}</span>
          </div>
          <ul class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            <li
              v-for="tech in grouped[group.key]"
              :key="tech.id"
              class="tech-cell flex items-center gap-3 rounded-md border px-3 py-2.5 transition-colors"
              :class="levelStyle(tech.level)"
            >
              <v-icon v-if="tech.icon" :name="tech.icon" class="shrink-0 text-base" />
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-semibold leading-tight">{{ tech.name }}</p>
                <p class="font-mono text-[10px] uppercase tracking-wider opacity-70">
                  {{ levelLabel(tech.level) }} · {{ tech.years }}y
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </v-section>
</template>

<style scoped>
.tech-cell:hover {
  border-color: var(--color-primary);
}
</style>
