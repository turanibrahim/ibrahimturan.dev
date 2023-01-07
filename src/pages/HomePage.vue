<script setup>
import SectionSidebar from '@/components/home/SectionSidebar.vue';
import SectionAbout from '@/components/home/SectionAbout.vue';
import SectionExperience from '@/components/home/SectionExperience.vue';
import SectionEducation from '@/components/home/SectionEducation.vue';
import SectionTechnologies from '@/components/home/SectionTechnologies.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

userStore.fetchUserInfo();
userStore.fetchUserExperience();
</script>

<template>
  <div class="home-page h-full">
    <div class="hidden lg:block fixed left-0 top-0 w-screen">
      <div class="lg:container grid grid-cols-12 md:px-4">
        <div class="col-span-5 lg:col-span-4">
          <section-sidebar class="xl:px-10 my-5 rounded-xl shadow-lg" />
        </div>
      </div>
    </div>
    <div class="lg:container">
      <div class="grid grid-cols-12 gap-0">
        <div class="col-span-12 sm:col-span-5 lg:col-span-4">
          <section-sidebar
            class="block lg:hidden xl:px-10 sm:min-h-screen text-center"
          />
        </div>

        <div
          class="col-span-12 sm:col-span-7 lg:col-span-8 py-14 px-4
            xl:px-8 sm:h-screen sm:overflow-auto lg:h-auto md:px-6"
        >
          <section-about
            title="About"
            :description="userStore.userInfo.introduction"
          />

          <section-experience />

          <section-education />

          <section-technologies />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "src/assets/styles/pages/home";
</style>
