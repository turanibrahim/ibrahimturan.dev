<template>
  <div class="text-center mx-4 my-3">
    <v-icon x-large :color="color">
      {{ icons.get(name).path }}
    </v-icon>
    <p class="text-center my-3">
      {{ icons.get(name).title }}
    </p>
    <v-progress-circular
      v-if="progress != null"
      :value="progress"
      :color="progressColor"
    ></v-progress-circular>
  </div>
</template>

<script>
const simpleIcons = require('simple-icons')

export default {
  props: {
    name: String,
    color: String,
    progress: Number
  },
  data() {
    return {
      icons: simpleIcons
    }
  },
  computed: {
    progressColor() {
      let color = 'red'
      switch (true) {
        case this.progress <= 10:
          color = 'red darken-4'
          break
        case this.progress > 10 && this.progress <= 20:
          color = 'red darken-2'
          break
        case this.progress > 20 && this.progress <= 30:
          color = 'deep-orange'
          break
        case this.progress > 30 && this.progress <= 40:
          color = 'orange darken-4'
          break
        case this.progress > 40 && this.progress <= 50:
          color = 'amber darken-4'
          break
        case this.progress > 50 && this.progress <= 60:
          color = 'amber'
          break
        case this.progress > 60 && this.progress <= 70:
          color = 'green darken-4'
          break
        case this.progress > 70 && this.progress <= 80:
          color = 'green'
          break
        case this.progress > 80 && this.progress <= 90:
          color = 'cyan darken-2'
          break
        case this.progress > 90:
          color = 'cyan'
          break
      }
      return color
    }
  }
}
</script>
