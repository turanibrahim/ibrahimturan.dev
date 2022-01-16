<template>
  <div class="v-technologies-section">
    <div class="v-technologies-section__title">Technologies I similar with</div>

    <div class="v-technologies-section__container">
      <v-technology-card
        v-for="tech in technologies"
        :key="tech.name"
        width="75"
        height="75"
        :icon="tech.icon"
      >
        {{ tech.name }}
      </v-technology-card>
    </div>
  </div>
</template>

<script setup>
import VTechnologyCard from '@/components/molecules/VTechnologyCard.vue';

const technologies = [
  {
    name: 'Javascript',
    icon: 'Javascript',
  },
  {
    name: 'Vue.js',
    icon: 'Vue',
  },
  {
    name: 'Nuxt.js',
    icon: 'Nuxtjs',
  },
  {
    name: 'Vuetify',
    icon: 'Vuetify',
  },
  {
    name: 'React.js',
    icon: 'React',
  },
  {
    name: 'Redux',
    icon: 'Redux',
  },
  {
    name: 'Docker',
    icon: 'Docker',
  },
  {
    name: 'MongoDB',
    icon: 'MongoDB',
  },
  {
    name: 'Nginx',
    icon: 'Nginx',
  },
  {
    name: 'Heroku',
    icon: 'Heroku',
  },
];
</script>

<style lang="scss">
.v-technologies-section {
  @apply container md:px-20 items-center p-5;

  &__title {
    @apply text-5xl mb-5;
  }

  &__container {
    @apply flex flex-wrap justify-evenly;
  }
}
</style>
