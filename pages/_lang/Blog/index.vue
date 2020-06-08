<template>
  <div v-if="!loading" id="blog">
    <v-row justify="start" align="start" class="ma-0" wrap>
      <v-col cols="12">
        <blog-filter></blog-filter>
      </v-col>
      <v-col v-for="n in 20" :key="n" md="6" lg="6" xl="4">
        <blog-post-item></blog-post-item>
      </v-col>
      <v-col cols="12">
        <blog-pagination></blog-pagination>
      </v-col>
    </v-row>
  </div>
  <div v-else class="fill-height">
    <v-row class="fill-height" justify="center" align="center" no-gutters>
      <v-col cols="12">
        <div class="text-center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import BlogFilter from '~/components/BlogFilter'
import BlogPagination from '~/components/BlogPagination'
import BlogPostItem from '~/components/BlogPostItem'

export default {
  components: {
    BlogPostItem,
    BlogFilter,
    BlogPagination
  },
  computed: {
    ...mapState({
      loading: (state) => state.about.loading,
      locale: (state) => state.locale,
      metaData: (state) => state.layout.metaData
    })
  },
  watch: {
    locale(newLocale, oldLocale) {
      this.setPageTitle({ title: this.$t('titles.blog') })
    }
  },
  async created() {
    this.setPageTitle({ title: this.$t('titles.blog') })
    await this.fetchMetaData({ path: 'blog', lang: this.locale })
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
