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
    <span>
      {{ title }}
    </span>

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
    @apply text-5xl mb-5
  }

  &__subtitle {
    @apply text-xl text-gray-600 flex flex-nowrap items-center
  }

  &__company {
    @apply inline px-3 text-xl shrink;
    width: auto;
    height: 1rem;
  }

  &__description {
    @apply mt-4 text-gray-500 tracking-wide
  }
}
</style>
