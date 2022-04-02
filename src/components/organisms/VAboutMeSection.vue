<script setup>
import { defineProps } from 'vue';
import VProfilePictureSidebar from '@/components/molecules/VProfilePictureSidebar.vue';
import VIntroductionSection from '@/components/molecules/VIntroductionSection.vue';

const { about } = defineProps({
  about: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="about-me">
    <div class="about-me__sidebar">
      <v-profile-picture-sidebar
        :social-media="about.socialMedia"
        :profile-picture="about.profilePicture"
      />
    </div>

    <div class="about-me__content">
      <v-introduction-section
        :title="about.title"
        :firm-logo="about.firmLogo"
        :name="about.name"
        :introduce-text="about.introduceText"
      />
    </div>
  </div>
</template>

<style lang="scss">
.about-me {
  @apply grid grid-cols-1 container md:px-20 md:my-20 md:grid-cols-3 items-center p-5 gap-4;

  &__sidebar {
    @apply col-span-1;
  }

  &__content {
    @apply col-span-2;
  }
}
</style>
