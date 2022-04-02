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
  @apply flex flex-col md:flex-row container md:px-20 md:my-20 p-5 gap-4;

  &__sidebar {
    @apply md:px-10 md:basis-1/3;
  }

  &__content {
    @apply md:basis-2/3;
  }
}
</style>
