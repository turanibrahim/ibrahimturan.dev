<script setup>
import { defineProps } from 'vue';
import VTechnologyCard from '@/components/molecules/VTechnologyCard.vue';

const props = defineProps({
  technologies: {
    type: Array,
    default: () => ([]),
  },
});

const { technologies } = props;
</script>

<template>
  <div class="v-technologies-section">
    <div class="v-technologies-section__title">
      Technologies I similar with
    </div>

    <div class="v-technologies-section__container">
      <v-technology-card
        v-for="tech in technologies"
        :key="tech.name"
        width="44"
        height="75"
        :icon="tech.icon"
      >
        {{ tech.name }}
      </v-technology-card>
    </div>
  </div>
</template>

<style lang="scss">
.v-technologies-section {
  @apply grid grid-cols-1 container md:px-20 items-center p-5;

  &__title {
    @apply text-4xl mb-5;
  }

  &__container {
    @apply flex flex-wrap justify-evenly;
  }
}
</style>
