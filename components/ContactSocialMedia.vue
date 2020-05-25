<template>
  <div class="text-center mx-4 my-3">
    <v-icon x-large :color="color" @click="redirectTo(link)">
      {{ icons.get(name).path }}
    </v-icon>
  </div>
</template>

<script>
const simpleIcons = require('simple-icons')

export default {
  props: {
    name: String,
    color: String,
    link: String
  },
  data() {
    return {
      icons: simpleIcons
    }
  },
  methods: {
    redirectTo(link) {
      window.open(link, '_blank')
    }
  }
}
</script>
