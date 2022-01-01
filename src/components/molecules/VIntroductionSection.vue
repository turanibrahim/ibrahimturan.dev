<template>
  <div class="introduction-section__title">
    İbrahim Turan
  </div>
  <div class="introduction-section__subtitle">
    Frontend Developer at

    <img
      class="introduction-section__company"
      width="220"
      src="https://www.vivense.de/img/vivense-de-logo.bdacabb1.svg" alt="firm"
    />
  </div>
  <div class="introduction-section__description">
    Frontend developer with almost 2 years experience.
    Interesting everything related to software.
    Like to be practical and work solution oriented.
    Have high communications skills and always open to innovations.
    Current tech stack based on Javascript frameworks like Nuxt.js,
    Vue.js, Vuetify, React-Native, Feathers.js.
  </div>
</template>

<style lang="scss">
.introduction-section {
  &__title {
    @apply text-8xl my-3
  }

  &__subtitle {
    @apply text-5xl text-gray-600
  }

  &__company {
    @apply inline px-3
  }

  &__description {
    @apply text-xl mt-6 text-gray-500 tracking-wide
  }
}
</style>
