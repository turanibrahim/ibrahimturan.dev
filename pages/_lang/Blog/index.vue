<template>
  <div v-if="!pageLoading" id="blog">
    <v-row justify="start" align="start" class="ma-0 pa-1" wrap>
      <v-col cols="12">
        <blog-filter></blog-filter>
      </v-col>
    </v-row>
    <v-row justify="start" align="start" class="ma-0 pa-1" wrap>
      <v-col v-for="post in posts" :key="post.id" md="6" lg="6" xl="4">
        <blog-post-item :post="post"></blog-post-item>
      </v-col>
    </v-row>
    <v-row justify="start" align="start" class="ma-0 pa-1" wrap>
      <v-col v-if="loading" cols="12">
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
import BlogPostItem from '~/components/BlogPostItem'

export default {
  components: {
    BlogPostItem,
    BlogFilter
  },
  data() {
    return {
      bottom: false,
      pageLoading: true,
      loading: false
    }
  },
  computed: {
    ...mapState({
      locale: (state) => state.locale,
      metaData: (state) => state.layout.metaData,
      posts: (state) => state.blog.posts,
      postMeta: (state) => state.blog.postMeta
    })
  },
  watch: {
    locale(newLocale, oldLocale) {
      this.setPageTitle({ title: this.$t('titles.blog') })
    },
    async bottom(bottom) {
      if (
        bottom &&
        this.postMeta.current_page < this.postMeta.last_page &&
        !this.loading
      ) {
        try {
          this.loading = true
          await this.fetchPosts({ nextPage: true })
        } finally {
          this.loading = false
        }
      }
    }
  },
  async created() {
    this.pageLoading = true
    this.setPageTitle({ title: this.$t('titles.blog') })
    this.setPageTitleImage('/img/8.jpg')
    try {
      if (!this.fetchMetaData) {
        await this.fetchMetaData({ path: 'blog', lang: this.locale })
      }
    } finally {
      this.pageLoading = false
    }
    if (this.posts.length === 0) {
      this.loading = true
      await this.fetchPosts({ nextPage: false })
      this.loading = false
    }
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
  },
  methods: {
    ...mapMutations({
      setPageTitle: 'layout/setPageTitle',
      setPosts: 'blog/SET_POSTS',
      setPostMeta: 'blog/SET_POST_META',
      setPageTitleImage: 'layout/SET_PAGE_TITLE_IMAGE'
    }),
    ...mapActions({
      fetchMetaData: 'layout/fetchMetaData',
      fetchPosts: 'blog/fetchPosts',
      addPosts: 'blog/addPosts'
    }),
    bottomVisible() {
      return (
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight
      )
    }
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
