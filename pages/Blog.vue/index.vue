<template>
  <v-row no-gutters justify="center" align="center" class="fill-height">
    <v-col cols="auto">
      <h1 class="display-4 font-weight-black">Will be there ASAP</h1>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  created() {
    this.setPageTitle({ title: 'Blog' })
  },
  methods: {
    ...mapMutations({
      setPageTitle: 'layout/setPageTitle'
    })
  }
}
</script>
