<script setup lang="ts">
import type { Technology } from '@/types/technology';
import VBadge from '@/components/atoms/v-badge.vue';
import VIcon from '@/components/atoms/v-icon.vue';

export interface VTechBadgeProps {
  technology: Technology;
}

defineProps<VTechBadgeProps>();
</script>

<template>
  <v-badge variant="dash" color="secondary">
    <v-icon :name="technology.icon" />
    <span>{{ technology.name }}</span>
  </v-badge>
</template>
