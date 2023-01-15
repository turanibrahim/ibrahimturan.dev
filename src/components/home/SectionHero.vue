<script setup>
import { useUserStore } from '@/stores/userStore';
import VButton from '@/components/ui/VButton.vue';
import { computed } from 'vue';
import VLinkedinIcon from '@/components/icons/VLinkedinIcon.vue';
import VTwitterIcon from '@/components/icons/VTwitterIcon.vue';
import VDevtoIcon from '@/components/icons/VDevtoIcon.vue';
import { LinkIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/vue/20/solid';

const userStore = useUserStore();

const userInfo = computed(() => userStore.userInfo);
</script>

<template>
  <section
    class="section-hero flex flex-col md:flex-row
      gap-5 lg:gap-10 md:items-center"
  >
    <div class="flex-1 order-1 md:order-0">
      <h1 class="text-4xl lg:text-5xl font-extrabold text-primary">
        Ibrahim Turan
      </h1>

      <h2 class="text-xl lg:text-2xl font-bold text-secondary">
        Software Engineer
      </h2>

      <div class="flex flex-wrap mt-2">
        <v-button
          :href="userInfo.linkedin"
          variant="ghost"
          shape="circle"
          target="_blank"
          rel="nofollow"
        >
          <v-linkedin-icon height="25" width="25" />
        </v-button>

        <v-button
          :href="userInfo.twitter"
          variant="ghost"
          shape="circle"
          target="_blank"
          rel="nofollow"
        >
          <v-twitter-icon height="25" width="25" />
        </v-button>

        <v-button
          :href="userInfo.devto"
          variant="ghost"
          shape="circle"
          target="_blank"
          rel="nofollow"
        >
          <v-devto-icon height="25" width="25" />
        </v-button>
      </div>

      <div class="flex flex-col">
        <div class="inline-flex gap-2 items-center mt-3">
          <envelope-icon class="h6 w-6" />

          <a class="break-all" :href="`mailto:${userInfo.email}`">
            {{ userInfo.email }}
          </a>
        </div>
        <div class="inline-flex gap-2 items-center mt-3">
          <link-icon class="h6 w-6" />

          <a class="break-all" :href="userInfo.github" rel="nofollow">
            {{ userInfo.github }}
          </a>
        </div>

        <div class="inline-flex gap-2 items-center mt-3">
          <map-pin-icon class="h-6 w-6" />
          {{ userInfo.location }}
        </div>
      </div>
    </div>

    <div class="flex-1 order-0 md:order-1 self-center">
      <img
        class="h-60 md:h-full"
        :src="userInfo.profileImg"
        alt="Profile Image"
      >
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
