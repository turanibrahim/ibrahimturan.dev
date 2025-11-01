<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons';
import type { Technology } from '@/types/technology';
import VBadge from '@/components/atoms/v-badge.vue';

export interface VTechBadgeProps {
  technology: Technology;
}

defineProps<VTechBadgeProps>();
</script>

<template>
  <v-badge variant="dash" color="secondary">
    <oh-vue-icon :name="technology.icon" class="" />
    <span>{{ technology.name }}</span>
  </v-badge>
</template>
