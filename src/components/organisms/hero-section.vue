<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user.store';
import VAvatar from '@/components/atoms/v-avatar.vue';
import VCard from '@/components/atoms/v-card.vue';
import VPrismBackground from '@/components/atoms/v-prism-background.vue';
import VBlurText from '@/components/atoms/v-blur-text.vue';
import VHeading from '@/components/atoms/v-heading.vue';
import SocialLinks from '@/components/molecules/social-links.vue';

const userStore = useUserStore();

const userInfo = computed(() => userStore.userInfo);
const fullName = computed(() => `${userInfo.value.name} ${userInfo.value.surname}`);
</script>

<template>
  <section id="home" aria-labelledby="hero-name" class="relative overflow-hidden bg-base-300">
    <div class="absolute inset-0 z-0" aria-hidden="true">
      <v-prism-background
        animation-type="hover"
        :time-scale="0.15"
        :height="2.6"
        :base-width="5.5"
        :scale="3"
        :hue-shift="140"
        :color-frequency="0.6"
        :noise="0"
        :glow="0.4"
        :bloom="0.6"
      />
    </div>

    <div class="container relative z-10 py-10 md:py-16 lg:py-20">
      <v-card class="bg-base-100/60 backdrop-blur-sm" bordered>
        <div
          class="flex flex-col items-center text-center gap-6 md:flex-row md:items-center md:text-left md:gap-8 lg:gap-12 md:py-6"
        >
          <div class="shrink-0">
            <v-avatar
              :src="userInfo.profileImg"
              :alt="fullName"
              size="xl"
              shape="rounded"
              ring
              priority
            />
          </div>

          <div class="flex-1 min-w-0 space-y-3">
            <v-heading
              id="hero-name"
              level="1"
              weight="black"
              class="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.04em] text-base-content"
            >
              <v-blur-text :text="fullName" :animate-by="'words'" :direction="'top'" />
            </v-heading>

            <v-heading
              level="3"
              weight="semibold"
              class="text-secondary text-lg sm:text-xl tracking-[-0.02em]"
            >
              {{ userInfo.title }}
            </v-heading>

            <p class="text-base-content-muted text-base sm:text-lg leading-relaxed max-w-prose">
              {{ userInfo.tagline }}
            </p>

            <div class="pt-2">
              <social-links />
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </section>
</template>
