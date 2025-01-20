<script setup>
import { useUserStore } from '@/stores/userStore';
import VButton from '@/components/ui/VButton.vue';
import { computed } from 'vue';
import VLinkedinIcon from '@/components/icons/VLinkedinIcon.vue';
import VTwitterIcon from '@/components/icons/VTwitterIcon.vue';
import VDevtoIcon from '@/components/icons/VDevtoIcon.vue';
import { LinkIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/vue/20/solid';
import VSectionTitle from '@/components/atoms/VSectionTitle.vue';

const userStore = useUserStore();

const userInfo = computed(() => userStore.userInfo);
</script>

<template>
  <section
    class="section-hero"
  >
    <div class="flex justify-center md:justify-start shrink">
      <div class="[perspective:1000px]">
        <img
          class="profile-image"
          :src="userInfo.profileImg"
          alt="Profile Image"
        >
      </div>
    </div>
    <div class="flex-1 order-1 md:order-0">
      <v-section-title element="h1">
        Ibrahim Turan
      </v-section-title>

      <v-section-title class="text-secondary font-semibold" element="h3">
        Software Engineer
      </v-section-title>

      <div class="inline-flex gap-2 items-center mt-3">
        <map-pin-icon class="h-6 w-6" /> Ankara, Turkey
      </div>

      <div class="flex flex-wrap bg-gray-100 rounded-lg px-4 py-2 mt-5 w-fit print:hidden">
        <v-button
          :href="userInfo.linkedin"
          variant="ghost"
          shape="circle"
          target="_blank"
          rel="nofollow"
          class="transition-transform transform hover:scale-125"
        >
          <v-linkedin-icon height="25" width="25" />
        </v-button>

        <v-button
          :href="userInfo.twitter"
          variant="ghost"
          shape="circle"
          target="_blank"
          rel="nofollow"
          class="transition-transform transform hover:scale-125"
        >
          <v-twitter-icon height="25" width="25" />
        </v-button>

        <v-button
          :href="userInfo.devto"
          variant="ghost"
          shape="circle"
          target="_blank"
          rel="nofollow"
          class="transition-transform transform hover:scale-125"
        >
          <v-devto-icon height="25" width="25" />
        </v-button>

        <v-button
          :href="`mailto:${userInfo.email}`"
          variant="ghost"
          shape="circle"
          rel="nofollow"
          class="transition-transform transform hover:scale-125"
        >
          <envelope-icon class="h6 w-6" />
        </v-button>

        <v-button
          :href="userInfo.github"
          variant="ghost"
          shape="circle"
          target="_blank"
          rel="nofollow"
          class="transition-transform transform hover:scale-125"
        >
          <link-icon class="h6 w-6" />
        </v-button>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.section-hero {
  @apply flex flex-col md:flex-row print:flex-row gap-5 lg:gap-10 md:items-center mt-5 md:mt-10;

  .profile-image {
    @apply h-[250px] print:h-[150px] rounded-full aspect-square border-[10px] border-orange-200 object-cover bg-orange-50 transition-all duration-500 hover:[transform:rotateY(360deg)];
  }
}
</style>
