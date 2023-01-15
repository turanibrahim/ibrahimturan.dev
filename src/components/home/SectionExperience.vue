<script setup>
import CardExperience from '@/components/home/CardExperience.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
</script>

<template>
  <section class="section-experience">
    <h1 class="font-bold text-4xl mb-5 mt-10">
      Experience
    </h1>

    <template
      v-for="experience in userStore.experiences"
      :key="experience.company"
    >
      <card-experience
        class="mt-10"
        :title="experience.title"
        :description="experience.description"
        :company="experience.company"
        :company-logo="experience.companyLogo"
        :start-date="experience.startDate"
        :end-date="experience.endDate"
        :location="experience.location"
      />
    </template>
  </section>
</template>
