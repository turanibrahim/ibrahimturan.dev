<script setup>
import VTechnologyCard from '@/components/home/CardTechnology.vue';
import VSectionTitle from '@/components/atoms/VSectionTitle.vue';

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
  <section class="section-technologies mt-10 lg:mt-16">
    <v-section-title element="h3">
      Technologies
    </v-section-title>

    <div class="flex flex-wrap gap-3 mt-3">
      <v-technology-card
        v-for="tech in technologies"
        :key="tech.name"
        :icon="tech.icon"
      >
        {{ tech.name }}
      </v-technology-card>
    </div>
  </section>
</template>
