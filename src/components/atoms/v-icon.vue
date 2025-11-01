<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons';

export interface VIconProps {
  name: string;
  scale?: number;
  animation?: 'spin' | 'pulse' | 'wrench' | 'ring' | 'float' | 'tada';
  flip?: 'horizontal' | 'vertical' | 'both';
  label?: string;
}

defineProps<VIconProps>();
</script>

<template>
  <oh-vue-icon :name="name" :scale="scale" :animation="animation" :flip="flip" :label="label" />
</template>
