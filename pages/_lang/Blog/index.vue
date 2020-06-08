<template>
  <v-row justify="start" align="start" class="ma-0  ">
    <v-col cols="12">
      <blog-filter></blog-filter>
    </v-col>
    <v-col v-for="n in 6" :key="n" md="6" lg="6" xl="4">
      <blog-post-item></blog-post-item>
    </v-col>
    <v-col cols="12">
      <blog-pagination></blog-pagination>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import BlogPostItem from '../../../components/BlogPostItem'
import BlogFilter from '../../../components/BlogFilter'
import BlogPagination from '../../../components/BlogPagination'

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
  created() {
    this.setPageTitle({ title: this.$t('titles.blog') })
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
