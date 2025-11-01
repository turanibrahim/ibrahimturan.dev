<script setup lang="ts">
import { computed } from 'vue';
import SocialLinks from '@/components/molecules/social-links.vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="bg-base-200">
    <div class="container py-12">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <p class="text-base-content">
            &copy; {{ currentYear }} Ibrahim Turan. All rights reserved.
          </p>
        </div>
        <social-links />
      </div>
    </div>
  </footer>
</template>
