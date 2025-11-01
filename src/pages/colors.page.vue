<script setup lang="ts">
const colors = [
  { name: 'Base 100', bg: 'bg-base-100', text: 'text-base-content' },
  { name: 'Base 200', bg: 'bg-base-200', text: 'text-base-content' },
  { name: 'Base 300', bg: 'bg-base-300', text: 'text-base-content' },
  { name: 'Base Content', bg: 'bg-base-content', text: 'text-base-100' },
  { name: 'Primary', bg: 'bg-primary', text: 'text-primary-content' },
  { name: 'Primary Content', bg: 'bg-primary-content', text: 'text-primary' },
  { name: 'Secondary', bg: 'bg-secondary', text: 'text-secondary-content' },
  { name: 'Secondary Content', bg: 'bg-secondary-content', text: 'text-secondary' },
  { name: 'Accent', bg: 'bg-accent', text: 'text-accent-content' },
  { name: 'Accent Content', bg: 'bg-accent-content', text: 'text-accent' },
  { name: 'Neutral', bg: 'bg-neutral', text: 'text-neutral-content' },
  { name: 'Neutral Content', bg: 'bg-neutral-content', text: 'text-neutral' },
  { name: 'Info', bg: 'bg-info', text: 'text-info-content' },
  { name: 'Info Content', bg: 'bg-info-content', text: 'text-info' },
  { name: 'Success', bg: 'bg-success', text: 'text-success-content' },
  { name: 'Success Content', bg: 'bg-success-content', text: 'text-success' },
  { name: 'Warning', bg: 'bg-warning', text: 'text-warning-content' },
  { name: 'Warning Content', bg: 'bg-warning-content', text: 'text-warning' },
  { name: 'Error', bg: 'bg-error', text: 'text-error-content' },
  { name: 'Error Content', bg: 'bg-error-content', text: 'text-error' },
];
</script>

<template>
  <div class="min-h-screen bg-base-200 py-16">
    <div class="container">
      <h1 class="text-4xl font-bold mb-8 text-base-content">ibrahimturan-light Theme Colors</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="color in colors" :key="color.name" class="rounded-lg shadow-lg overflow-hidden">
          <div
            :class="[color.bg, color.text, 'h-32 flex items-center justify-center font-semibold']"
          >
            {{ color.name }}
          </div>
          <div class="bg-base-100 p-4">
            <div class="font-semibold mb-2 text-base-content">
              {{ color.name }}
            </div>
            <div class="text-sm font-mono text-base-content opacity-70">
              {{ color.bg }} / {{ color.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
