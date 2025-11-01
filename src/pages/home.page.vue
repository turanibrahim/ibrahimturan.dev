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
      asdsa
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
