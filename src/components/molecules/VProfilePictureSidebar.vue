<script setup>
import { defineProps, defineAsyncComponent } from 'vue';
import VAvatar from '@/components/atoms/VAvatar.vue';
import VLink from '@/components/atoms/VLink.vue';

const props = defineProps({
  profilePicture: {
    type: String,
    required: true,
  },
  socialMedia: {
    type: Array,
    required: true,
  },
});
const socialMediaComponents = props.socialMedia.map((item) => ({
  ...item,
  component: defineAsyncComponent(
    () => import(`../atoms/${item.componentName}.vue`),
  ),
}));
const avatarSrc = new URL(`../../assets/${props.profilePicture}`, import.meta.url).href;
</script>

<template>
  <v-avatar
    class="mb-10"
    :src="avatarSrc"
    width="400"
    height="400"
    alt="Profile Picture"
  />

  <div class="social-media__container">
    <v-link
      v-for="item in socialMediaComponents"
      :key="item.name"
      component="a"
      :href="item.url"
    >
      <component
        :is="item.component"
        class="m-1"
        heihght="25"
        widht="25"
      />
      {{ item.name }}
    </v-link>
  </div>
</template>

<style lang="scss">
.about-me__sidebar {
  .social-media {
    &__container {
      @apply flex flex-row flex-wrap mt-5;
    }
  }
}
</style>
