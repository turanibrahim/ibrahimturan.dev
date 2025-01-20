<script setup>
import SectionAbout from '@/components/home/SectionAbout.vue';
import SectionExperience from '@/components/home/SectionExperience.vue';
import SectionEducation from '@/components/home/SectionEducation.vue';
import SectionTechnologies from '@/components/home/SectionTechnologies.vue';
import { useUserStore } from '@/stores/userStore';
import SectionHero from '@/components/home/SectionHero.vue';
import SectionContactInfo from '@/components/home/SectionContactInfo.vue';
import VButton from '@/components/ui/VButton.vue';
import { PrinterIcon } from '@heroicons/vue/20/solid';

const userStore = useUserStore();

userStore.fetchUserInfo();
userStore.fetchUserExperience();

const downloadPdf = () => {
  window.print();
};
</script>

<template>
  <main class="home-page h-full py-7">
    <div class="container">
      <div class="flex justify-center">
        <div class="basis-full lg:basis-4/5 xl:basis-2/3">
          <section-hero class="mt-10 lg:mt-20" />

          <section-contact-info />

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
    <v-button
      class="fixed bottom-8 right-8 print:hidden"
      shape="circle"
      theme="secondary"
      size="lg"
      @click="downloadPdf"
    >
      <printer-icon class="h-7 w-7" />
    </v-button>
  </main>
</template>

<style lang="scss">
@import "@/assets/styles/pages/home.scss";
</style>
