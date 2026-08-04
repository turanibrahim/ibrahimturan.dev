<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user.store';
import VButton from '@/components/atoms/v-button.vue';
import VIcon from '@/components/atoms/v-icon.vue';

const userStore = useUserStore();
const socialLinks = computed(() => [
  {
    name: 'github',
    label: 'GitHub profile',
    url: userStore.userInfo.github,
    icon: 'fa-github',
  },
  {
    name: 'linkedin',
    label: 'LinkedIn profile',
    url: userStore.userInfo.linkedin,
    icon: 'fa-linkedin',
  },
  {
    name: 'devto',
    label: 'Dev.to profile',
    url: userStore.userInfo.devto,
    icon: 'fa-dev',
  },
  {
    name: 'twitter',
    label: 'X (Twitter) profile',
    url: userStore.userInfo.twitter,
    icon: 'fa-twitter',
  },
]);
</script>

<template>
  <div class="flex items-center gap-2">
    <v-button
      v-for="link in socialLinks"
      :key="link.name"
      tag="a"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="link.label"
      variant="ghost"
      circle
    >
      <v-icon :name="link.icon" class="h-5 w-5" />
    </v-button>
  </div>
</template>
