<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/user.store';
import VAvatar from '@/components/atoms/v-avatar.vue';
import VCard from '@/components/atoms/v-card.vue';
import VPrismBackground from '@/components/atoms/v-prism-background.vue';
import VBlurText from '@/components/atoms/v-blur-text.vue';
import SocialLinks from '@/components/molecules/social-links.vue';

const userStore = useUserStore();

const userInfo = computed(() => userStore.userInfo);
</script>

<template>
  <section class="relative py-10 overflow-hidden">
    <div class="absolute inset-0 z-0">
      <v-prism-background
        animation-type="hover"
        :time-scale="0.5"
        :height="4"
        :base-width="8"
        :scale="4"
        :hue-shift="0"
        :color-frequency="1"
        :noise="0"
        :glow="1"
      />
    </div>
    <div class="container">
      <v-card class="relative z-10 bg-base-200/50 backdrop-blur-xs" bordered>
        <div
          class="flex flex-col md:flex-row print:flex-row gap-5 lg:gap-10 md:items-center h-full min-h-[300px]"
        >
          <v-avatar :src="userInfo.profileImg" alt="Profile Image" size="xl" shape="rounded-full" />
          <div class="flex-1 text-neutral">
            <h1 class="text-5xl font-black">
              <v-blur-text :text="`${userInfo.name} ${userInfo.surname}`" />
            </h1>
            <h3 class="text-3xl text-secondary font-semibold mt-2">
              {{ userInfo.title }}
            </h3>

            <social-links class="mt-3" />
          </div>
        </div>
      </v-card>
    </div>
  </section>
</template>
