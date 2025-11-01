<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import VButton from '@/components/ui/VButton.vue';

const userStore = useUserStore();
const socialLinks = computed(() => [
  {
    name: 'github',
    url: userStore.userInfo.github,
    icon: 'fa-github',
  },
  {
    name: 'linkedin',
    url: userStore.userInfo.linkedin,
    icon: 'fa-linkedin',
  },
  {
    name: 'twitter',
    url: userStore.userInfo.twitter,
    icon: 'fa-twitter',
  },
  {
    name: 'devto',
    url: userStore.userInfo.devto,
    icon: 'fa-dev',
  },
]);
</script>

<template>
  <div class="flex items-center space-x-4">
    <v-button
      v-for="link in socialLinks"
      :key="link.name"
      :href="link.url"
      target="_blank"
      variant="ghost"
      shape="circle"
    >
      <v-icon :name="link.icon" class="h-6 w-6" />
    </v-button>
  </div>
</template>
