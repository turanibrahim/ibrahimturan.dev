<script setup>
import VAvatar from '@/components/ui/VAvatar.vue';
import VButton from '@/components/ui/VButton.vue';
import VLinkedinIcon from '@/components/icons/VLinkedinIcon.vue';
import VTwitterIcon from '@/components/icons/VTwitterIcon.vue';
import VDevtoIcon from '@/components/icons/VDevtoIcon.vue';
import { LinkIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/vue/20/solid';
import { useUserStore } from '@/stores/userStore';
import { computed } from 'vue';

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
</script>

<template>
  <div class="section-sidebar">
    <div class="flex justify-center">
      <v-avatar
        class="object-cover"
        alt="Profile Image"
        :src="userInfo.profileImg"
        width="200"
      />
    </div>

    <h1 class="text-3xl xl:text-4xl font-bold mt-7 text-primary">
      {{ userInfo.name }} {{ userInfo.surname }}
    </h1>
    <h2 class="text-xl xl:text-2xl font-semibold mt-2 text-primary-500">
      {{ userInfo.title }}
    </h2>

    <div class="mt-8">
      <div>
        <h3 class="text-primary font-bold text-lg mb-2">
          Company
        </h3>

        <a :href="userInfo.companyUrl" target="_blank">
          <img
            class="h-5"
            :src="userInfo.companyLogo"
            :alt="`${userInfo.company} Logo`"
            height="25"
          >
        </a>
      </div>
      <div class="mt-5">
        <h3 class="text-primary font-bold text-lg">
          Social Media
        </h3>

        <div class="flex mt-1 gap-2">
          <v-button
            :href="userInfo.linkedin"
            variant="icon"
            target="_blank"
            rel="nofollow"
          >
            <v-linkedin-icon height="25" width="25" />
          </v-button>

          <v-button
            :href="userInfo.twitter"
            variant="icon"
            target="_blank"
            rel="nofollow"
          >
            <v-twitter-icon height="25" width="25" />
          </v-button>

          <v-button
            :href="userInfo.devto"
            variant="icon"
            target="_blank"
            rel="nofollow"
          >
            <v-devto-icon height="25" width="25" />
          </v-button>
        </div>
      </div>
      <div class="mt-1">
        <h3 class="text-primary font-bold text-lg">
          Email
        </h3>

        <span class="inline-flex gap-2 items-center">
          <envelope-icon class="h4 w-4" />

          <a class="break-all" :href="`mailto:${userInfo.email}`">
            {{ userInfo.email }}
          </a>
        </span>
      </div>
      <div class="mt-3">
        <h3 class="text-primary font-bold text-lg">
          Github Profile
        </h3>

        <span class="inline-flex gap-2 items-center">
          <link-icon class="h4 w-4" />

          <a class="break-all" :href="userInfo.github" rel="nofollow">
            {{ userInfo.github }}
          </a>
        </span>
      </div>
      <div class="mt-3">
        <h3 class="text-primary font-bold text-lg">
          Location
        </h3>

        <span class="inline-flex gap-2 items-center">
          <map-pin-icon class="h4 w-4" />
          {{ userInfo.location }}
        </span>
      </div>
    </div>
  </div>
</template>
