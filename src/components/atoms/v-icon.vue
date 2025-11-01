<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons';
import type { VIconProps } from '@/types/v-icon';

defineProps<VIconProps>();
</script>

<template>
  <oh-vue-icon :name="name" :scale="scale" :animation="animation" :flip="flip" :label="label" />
</template>
