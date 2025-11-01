<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user.store';

const userStore = useUserStore();

const userInfo = computed(() => userStore.userInfo);
</script>

<template>
  <section class="py-10">
    <div class="container">
      <h2 class="text-4xl font-bold mb-6">About Me</h2>
      <div class="space-y-6">
        <div>
          <p class="text-lg text-info-content leading-relaxed">
            {{ userInfo.introduction }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-base-300">
          <div>
            <h3 class="text-xl font-semibold text-secondary-content mb-3">Current Position</h3>
            <div class="space-y-2">
              <p class="text-info-content flex items-center gap-1">
                <span class="font-medium">{{ userInfo.title }} at</span>
                <a
                  :href="userInfo.companyUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary hover:text-primary-focus transition-colors font-medium"
                >
                  <img
                    :src="userInfo.companyLogo"
                    alt="Company Logo"
                    class="inline-block h-3 ml-2"
                  />
                </a>
              </p>
              <p class="text-secondary-content flex items-center gap-2">
                <span class="text-base-content/70">📍</span>
                {{ userInfo.location }}
              </p>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold text-secondary-content mb-3">Education</h3>
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
    </div>
  </section>
</template>
