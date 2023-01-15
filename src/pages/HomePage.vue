<script setup>
import SectionAbout from '@/components/home/SectionAbout.vue';
import SectionExperience from '@/components/home/SectionExperience.vue';
import SectionEducation from '@/components/home/SectionEducation.vue';
import SectionTechnologies from '@/components/home/SectionTechnologies.vue';
import { useUserStore } from '@/stores/userStore';
import SectionHero from '@/components/home/SectionHero.vue';

const userStore = useUserStore();

userStore.fetchUserInfo();
userStore.fetchUserExperience();
</script>

<template>
  <main class="home-page h-full py-7">
    <div class="container">
      <div class="flex justify-center">
        <div class="basis-full lg:basis-4/5 xl:basis-2/3">
          <section-hero class="mt-10 lg:mt-20" />

          <section-about
            class="mt-10 lg:mt-16"
            title="About"
            :description="userStore.userInfo.introduction"
          />

          <section-experience />

          <section-education />

          <section-technologies />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import "src/assets/styles/pages/home";
</style>
