<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user.store';
import VSection from '@/components/atoms/v-section.vue';
import VHeading from '@/components/atoms/v-heading.vue';

const userStore = useUserStore();

const userInfo = computed(() => userStore.userInfo);
</script>

<template>
  <v-section>
    <v-heading level="2" class="mb-6">About Me</v-heading>
    <div class="space-y-6">
      <div>
        <p class="text-lg text-info-content leading-relaxed">
          {{ userInfo.introduction }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-base-300">
        <div>
          <v-heading level="3" weight="semibold" class="text-secondary-content mb-3">
            Current Position
          </v-heading>
          <div class="space-y-2">
            <p class="text-info-content flex items-center gap-1">
              <span class="font-medium">{{ userInfo.title }} at</span>
              <a
                :href="userInfo.companyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary hover:text-primary-focus transition-colors font-medium"
              >
                <img :src="userInfo.companyLogo" alt="Company Logo" class="inline-block h-3 ml-2" />
              </a>
            </p>
            <p class="text-secondary-content flex items-center gap-2">
              <span class="text-base-content/70">📍</span>
              {{ userInfo.location }}
            </p>
          </div>
        </div>

        <div>
          <v-heading level="3" weight="semibold" class="text-secondary-content mb-3">
            Education
          </v-heading>
          <div class="space-y-2">
            <p class="text-secondary-content font-medium">
              {{ userInfo.education.university }}
            </p>
            <p class="text-secondary-content">
              {{ userInfo.education.department }}
            </p>
            <p class="text-base-content/70 text-sm">
              {{ userInfo.education.startYear }} - {{ userInfo.education.endYear }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </v-section>
</template>
