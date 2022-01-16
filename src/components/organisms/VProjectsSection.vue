<template>
  <div class="v-project-section">
    <div class="v-project-section__title">
      Projects
    </div>

    <div class="v-project-section__items">
      <v-project-card
        v-for="project in projects"
        :key="project.id"
        :title="project.title"
        :description="project.description"
        :image="project.image"
        :to="project.to"
      ></v-project-card>
    </div>
  </div>
</template>

<script setup>
import VProjectCard from '@/components/molecules/VProjectCard.vue';

const projects = [];
</script>

<style lang="scss" scoped>
.v-project-section {
  @apply grid grid-cols-1 container md:px-20 items-center p-5 md:mb-20;

  &__title {
    @apply text-5xl mb-5;
  }

  &__items {
    @apply flex flex-wrap items-center;
  }
}
</style>
