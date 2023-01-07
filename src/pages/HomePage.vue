<script setup>
import SectionSidebar from '@/components/home/SectionSidebar.vue';
import SectionAbout from '@/components/home/SectionAbout.vue';
import SectionExperience from '@/components/home/SectionExperience.vue';
import SectionEducation from '@/components/home/SectionEducation.vue';
import SectionTechnologies from '@/components/home/SectionTechnologies.vue';
</script>

<template>
  <div class="home-page h-full">
    <div class="container mx-auto">
      <div class="grid grid grid-cols-12 gap-0">
        <div class="col-span-12 md:col-span-4">
          <section-sidebar class="xl:px-10" />
        </div>

        <div
          class="col-span-12 md:col-span-8 py-14 px-4
            xl:px-8 md:h-screen overflow-auto"
        >
          <section-about
            title="About"
            :description="`
              Frontend Developer with more than 3 years of experience.
              Have a strong interest in all aspects of software development.
              Combine's solution-oriented working with excellent communication.
              Always curious to discover new things and currently exploring
              technologies such as AWS, TailwindCSS, Typescript, and Vite.js.
              Have experience variety of JavaScript frameworks
              such as Vue.js, React/React-Native and Node.js.
            `"
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
