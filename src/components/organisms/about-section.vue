<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user.store';
import VSection from '@/components/atoms/v-section.vue';
import VHeading from '@/components/atoms/v-heading.vue';

const userStore = useUserStore();

const userInfo = computed(() => userStore.userInfo);
</script>

<template>
  <v-section id="about" aria-labelledby="about-heading" padding-y="lg">
    <v-heading id="about-heading" level="2" class="mb-6 text-base-content"> About Me </v-heading>
    <div class="space-y-6">
      <div>
        <p class="text-lg text-base-content leading-relaxed max-w-prose">
          {{ userInfo.introduction }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-base-300">
        <div>
          <v-heading level="3" weight="semibold" class="text-secondary-content mb-3">
            Current Position
          </v-heading>
          <div class="space-y-2">
            <p class="text-base-content flex items-center gap-2 flex-wrap">
              <span class="font-medium">{{ userInfo.title }} at</span>
              <a
                :href="userInfo.companyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary hover:text-primary-focus transition-colors font-medium inline-flex items-center gap-2"
              >
                <img
                  :src="userInfo.companyLogo"
                  :alt="`${userInfo.company} logo`"
                  class="inline-block h-3"
                  loading="lazy"
                  decoding="async"
                />
                <span class="sr-only">{{ userInfo.company }}</span>
              </a>
            </p>
            <p class="text-base-content-muted flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-4 w-4"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill-rule="evenodd"
                  d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .757.433 6.943 6.943 0 0 0 .281.14l.018.008.006.003.002.001Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>{{ userInfo.location }}</span>
            </p>
          </div>
        </div>

        <div>
          <v-heading level="3" weight="semibold" class="text-secondary-content mb-3">
            Education
          </v-heading>
          <div class="space-y-2">
            <p class="text-base-content font-medium">
              {{ userInfo.education.university }}
            </p>
            <p class="text-base-content">
              {{ userInfo.education.department }}
            </p>
            <p class="text-base-content-muted text-sm">
              {{ userInfo.education.startYear }} - {{ userInfo.education.endYear }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </v-section>
</template>
