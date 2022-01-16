<template>
  <div class="v-project-card">
    <div class="v-project-card__container">
      <div class="v-project-card__image">
        <slot name="image">
          <img
            :src="props.image"
            :alt="props.title"
            class="w-full"
          />
        </slot>
      </div>
      <div>
        <slot name="title">
          <h3>
            <router-link class="v-project-card__title" :to="props.to">
              {{ props.title }}
            </router-link>
          </h3>
        </slot>

        <slot name="description">
          <p class="v-project-card__description">
            {{ props.description }}
          </p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  image: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  to: {
    type: [String, Object],
    default: '',
  },
});
</script>

<style lang="scss">
.v-project-card {
  @apply w-full md:w-1/2 lg:w-1/3 p-4
  hover:bg-indigo-100 hover:shadow-lg rounded-lg overflow-hidden;

  &__container {
    @apply mx-auto mb-10;
  }

  &__image {
    @apply rounded overflow-hidden mb-8;
  }

  &__title {
    @apply font-semibold text-xl sm:text-2xl lg:text-xl
    xl:text-2xl mb-4 inline-block
  }

  &__description {
    @apply text-base text-gray-500;
  }
}
</style>
