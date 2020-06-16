<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters justify="center" align="start" class="pt-2">
      <v-col cols="12" sm="12" md="10" lg="8">
        <v-row no-gutters justify="end" align="end">
          <v-col class="text-right px-2" cols="auto">
            <v-skeleton-loader
              :loading="loading"
              type="text"
              width="100%"
              :min-width="$nuxt.$vuetify.breakpoint.mdAndUp ? '20vh' : '30vh'"
            >
              <span class="body-2">
                {{ $nuxt.$moment(post.created_at).format('DD MMMM YYYY') }}
              </span>
              <span class="body-2">
                <v-icon>mdi-eye</v-icon>
                {{ post.viewCount }}
              </span>
            </v-skeleton-loader>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md="10" lg="8">
        <v-skeleton-loader
          :loading="loading"
          type="paragraph@2, image, card-heading, image, card-heading, text@2"
          width="100%"
          class="pa-2"
        >
          <v-container fluid class="pa-0">
            <VueShowdown id="mark-down" class="pa-2" :markdown="markdown" />
          </v-container>
        </v-skeleton-loader>
      </v-col>
      <v-col cols="12" sm="10" md="10" lg="8" class="py-2">
        <v-toolbar dense short color="success" class="white--text">
          <v-row no-gutters justify="space-around" align="center">
            <v-col cols="auto">
              {{ post.hearts }}
              <v-btn
                icon
                color="white"
                @click="
                  sendPostVote({
                    postId: $nuxt.$route.params.id,
                    voteType: 3
                  })
                "
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="auto">
              {{ post.thumbsUps }}
              <v-btn
                icon
                color="white"
                @click="
                  sendPostVote({
                    postId: $nuxt.$route.params.id,
                    voteType: 1
                  })
                "
              >
                <v-icon>mdi-thumb-up</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="auto">
              {{ post.thumbsDowns }}
              <v-btn
                icon
                color="white"
                @click="
                  sendPostVote({
                    postId: $nuxt.$route.params.id,
                    voteType: 2
                  })
                "
              >
                <v-icon>mdi-thumb-down</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn icon color="white">
                <v-icon>mdi-share</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-toolbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapState({
      locale: (state) => state.locale,
      post: (state) => state.blog.post,
      markdown: (state) => state.blog.mdFile,
      metaData: (state) => state.layout.metaData
    })
  },
  watch: {
    async locale(newLocale, oldLocale) {
      try {
        this.setHeaderLoading(true)
        await this.fetchPost(this.$nuxt.$route.params.id)
      } catch (e) {
        this.$nuxt.$router.push('/FourOFour')
      } finally {
        this.loading = false
        this.setHeaderLoading(false)
      }
    }
  },
  async created() {
    try {
      this.loading = true
      this.setHeaderLoading(true)
      await this.fetchPost(this.$nuxt.$route.params.id)
      this.setPageTitleImage(this.post.image)
      this.setPageTitle({ title: this.post.title })
      const metaData = {
        title: this.post.title,
        name: this.post.title,
        description: this.post.description,
        hid: this.post.id
      }
      await this.setMetaData(metaData)
    } catch (e) {
      await this.$nuxt.$router.push('/FourOFour')
      this.loading = false
    } finally {
      this.loading = false
      this.setHeaderLoading(false)
    }
    this.sendPostView(this.$nuxt.$route.params.id)
  },
  methods: {
    ...mapMutations({
      setPageTitle: 'layout/setPageTitle',
      setMetaData: 'layout/SET_META_DATA',
      changeSideVisibility: 'layout/SET_SIDEBAR_VISIBILITY',
      setPageTitleImage: 'layout/SET_PAGE_TITLE_IMAGE',
      setHeaderLoading: 'layout/SET_HEADER_LOADING'
    }),
    ...mapActions({
      fetchPost: 'blog/fetchPost',
      sendPostView: 'blog/sendPostView',
      sendPostVote: 'blog/sendPostVote'
    })
  },
  head() {
    return {
      title: this.metaData.title,
      meta: [
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
<style>
#mark-down {
  font-family: 'Open Sans', sans-serif;
}
#mark-down p img {
  width: 100%;
  border-radius: 4px;
  text-align: center;
}
#mark-down code {
  font-family: 'Fira Code', monospace;
  font-weight: inherit;
  color: inherit;
  background-color: #263238;
  color: #fff;
}
#mark-down pre code {
  padding: 8px;
  width: 100%;
  margin-bottom: 8px;
}
#mark-down table {
  border-collapse: collapse;
  width: 100%;
}

#mark-down td,
#mark-down th {
  border: 1px solid #ddd;
  padding: 8px;
}

#domark-downwn tr:nth-child(even) {
  background-color: #f2f2f2;
}

#mark-down tr:hover {
  background-color: #ddd;
}

#mark-down th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #b0bec5;
  color: white;
}
#mark-down hr {
  border: 0;
  height: 1px;
  background: #333;
  background-image: linear-gradient(to right, #ccc, #333, #ccc);
}
#mark-down h1,
h2,
h3,
h4,
h5,
h6 {
  padding: 12px 0px;
}
#mark-down ul {
  margin: 8px 16px;
}
#mark-down ol {
  margin: 8px 0px;
}

#mark-down blockquote {
  position: relative;
  padding-left: 1em;
  border-left: 0.2em solid #4d91b3;
  font-size: 1.5em;
  line-height: 1.5em;
  font-weight: 100;
}
#mark-down blockquote {
  content: '\201C';
  font-family: 'Sanchez';
  color: #4d91b3;
}
#mark-down blockquote {
  content: '\201D';
}
</style>
