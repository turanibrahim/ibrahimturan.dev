<script setup>
import VAvatar from '@/components/atoms/VAvatar.vue';
import VLink from '@/components/atoms/VLink.vue';
import VLinkedinIcon from '@/components/atoms/VLinkedinIcon.vue';
import VTwitterIcon from '@/components/atoms/VTwitterIcon.vue';
import VGithubIcon from '@/components/atoms/VGithubIcon.vue';
import VDevtoIcon from '@/components/atoms/VDevtoIcon.vue';

const socialMedia = [
  {
    name: 'Linkedin',
    component: VLinkedinIcon,
    link: 'https://www.linkedin.com/in/ibrahimturann/',
  },
  {
    name: 'Twitter',
    component: VTwitterIcon,
    link: 'https://twitter.com/_ibrahimturan',
  },
  {
    name: 'Github',
    component: VGithubIcon,
    link: 'https://github.com/turanibrahim',
  },
  {
    name: 'Dev.to',
    component: VDevtoIcon,
    link: 'https://dev.to/_ibrahimturan',
  },
];

const profilePictureURL = new URL('/src/assets/profile-picture.png', import.meta.url).href;
</script>

<template>
  <v-avatar
    class="mb-10"
    :src="profilePictureURL"
    width="400"
    height="400"
    alt="Profile Picture"
  ></v-avatar>

  <div>
    <v-link
      v-for="item in socialMedia"
      :key="item.name"
      component="a"
      :href="item.link"
    >
      <component :is="item.component" class="m-1" heihght="25" widht="25"></component>
      {{ item.name }}
    </v-link>
  </div>
</template>
