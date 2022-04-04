<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  introduceText: {
    type: String,
    required: true,
  },
  firmLogo: {
    type: String,
    required: true,
  },
});
const {
  title, name, introduceText, firmLogo,
} = props;
</script>

<template>
  <div class="introduction-section__title">
    {{ name }}
  </div>
  <div class="introduction-section__subtitle">
    {{ title }}

    <img
      class="introduction-section__company"
      width="auto"
      :src="firmLogo"
      alt="firm-logo"
    >
  </div>
  <div class="introduction-section__description">
    {{ introduceText }}
  </div>
</template>

<style lang="scss">
.introduction-section {
  &__title {
    @apply text-4xl my-3
  }

  &__subtitle {
    @apply text-xl text-gray-600 flex flex-nowrap
  }

  &__company {
    @apply inline px-3 text-xl shrink self-end;
    width: auto;
    height: 1.5rem;
  }

  &__description {
    @apply mt-6 text-gray-500 tracking-wide
  }
}
</style>
