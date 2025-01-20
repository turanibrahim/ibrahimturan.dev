<script setup>
import CardExperience from '@/components/home/CardExperience.vue';
import { useUserStore } from '@/stores/userStore';
import VSectionTitle from '@/components/atoms/VSectionTitle.vue';

const userStore = useUserStore();
</script>

<template>
  <section class="section-experience mt-10 lg:mt-16">
    <v-section-title element="h3">
      Experience
    </v-section-title>

    <template
      v-for="experience in userStore.experiences"
      :key="experience.company"
    >
      <card-experience
        class="mt-5"
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
