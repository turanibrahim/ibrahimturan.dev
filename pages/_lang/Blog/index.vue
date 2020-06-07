<template>
  <v-row no-gutters justify="center" align="center" class="fill-height">
    <v-col cols="auto">
      <h1 class="display-1 font-weight-bold">{{ $t('blog.thereSoon') }}</h1>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      loading: (state) => state.about.loading,
      locale: (state) => state.locale,
      metaData: (state) => state.layout.metaData
    })
  },
  created() {
    this.setPageTitle({ title: 'Blog' })
    this.fetchMetaData({ path: 'blog', lang: this.locale })
  },
  methods: {
    ...mapMutations({
      setPageTitle: 'layout/setPageTitle'
    }),
    ...mapActions({
      fetchMetaData: 'layout/fetchMetaData'
    })
  },
  head() {
    return {
      title: this.metaData.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: this.metaData.hid,
          name: this.metaData.name,
          content: this.metaData.description
        }
      ]
    }
  }
}
</script>
