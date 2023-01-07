<script setup>
import VTechnologyCard from '@/components/home/CardTechnology.vue';

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
  {
    name: 'Vercel',
    icon: 'Vercel',
  },
  {
    name: 'Firebase',
    icon: 'Firebase',
  },
  {
    name: 'Tailwind CSS',
    icon: 'Tailwind',
  },
  {
    name: 'Vite.js',
    icon: 'Vite',
  },
  {
    name: 'AWS',
    icon: 'Aws',
  },
];
</script>

<template>
  <div class="section-technologies">
    <h1 class="font-bold text-4xl mb-3 mt-10">
      Technologies
    </h1>

    <div class="flex flex-wrap">
      <v-technology-card
        v-for="tech in technologies"
        :key="tech.name"
        width="25"
        height="25"
        :icon="tech.icon"
      >
        {{ tech.name }}
      </v-technology-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
