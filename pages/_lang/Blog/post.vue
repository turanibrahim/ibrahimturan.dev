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
      <v-col cols="12" sm="10" md="10" lg="8" class="py-2">
        <v-row no-gutters justify="start" align="center" class="px-1">
          <v-col cols="auto">
            <h1>{{ $t('blog.comments') }}</h1>
          </v-col>
          <v-col cols="grow">
            <v-row no-gutters justify="end" align="center">
              <v-col cols="auto">
                <v-btn
                  rounded
                  outlined
                  small
                  color="secondary"
                  @click="openNewComment()"
                >
                  {{ $t('blog.writeComment') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="pa-2" no-gutters>
          <v-col
            v-for="comment in comments"
            :key="comment.id"
            cols="12"
            class="py-2"
          >
            <blog-post-comment :comment="comment"></blog-post-comment>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        v-show="commentsLoading"
        cols="12"
        sm="10"
        md="10"
        lg="8"
        class="py-2"
      >
        <v-row justify="center" align="center" no-gutters>
          <v-col cols="12">
            <div class="text-center">
              <v-progress-circular
                :size="50"
                :width="3"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <blog-post-new-comment></blog-post-new-comment>
    <v-snackbar
      v-model="successMessage"
      color="success"
      multi-line
      :timeout="new Number(5000)"
      top
      vertical
    >
      <span class="font-weight-black">{{ $t('blog.successMessage') }}</span>
      <v-btn class="pt-0 mt-0" small dark text @click="successMessage = false">
        {{ $t('contact.close') }}
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import BlogPostComment from '~/components/BlogPostComment'
import BlogPostNewComment from '~/components/BlogPostNewComment'

export default {
  components: {
    BlogPostComment,
    BlogPostNewComment
  },
  data() {
    return {
      loading: true,
      bottom: false
    }
  },
  computed: {
    ...mapState({
      locale: (state) => state.locale,
      post: (state) => state.blog.post,
      markdown: (state) => state.blog.mdFile,
      metaData: (state) => state.layout.metaData,
      commentsLoading: (state) => state.blog.commentsLoading,
      comments: (state) => state.blog.comments,
      commentsMeta: (state) => state.blog.commentsMeta,
      showSuccessMessage: (state) => state.blog.showSuccessMessage
    }),
    successMessage: {
      set(successMessage) {
        this.setSuccessMessage(successMessage)
      },
      get() {
        return this.showSuccessMessage
      }
    }
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
        this.resetComments()
      }
    },
    async bottom(bottom) {
      if (
        (bottom &&
          !this.commentsLoading &&
          // eslint-disable-next-line camelcase
          this.commentsMeta?.last_page > this.commentsMeta?.current_page) ||
        // eslint-disable-next-line camelcase
        (bottom && !this.commentsMeta?.last_page)
      ) {
        await this.fetchComments()
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

    // eslint-disable-next-line nuxt/no-globals-in-created
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
  },
  methods: {
    ...mapMutations({
      setPageTitle: 'layout/setPageTitle',
      setMetaData: 'layout/SET_META_DATA',
      changeSideVisibility: 'layout/SET_SIDEBAR_VISIBILITY',
      setPageTitleImage: 'layout/SET_PAGE_TITLE_IMAGE',
      setHeaderLoading: 'layout/SET_HEADER_LOADING',
      setCommentId: 'blog/SET_COMMENT_ID',
      openBottomSheet: 'blog/SET_NEW_COMMENT_BOTTOM_SHEET',
      setSuccessMessage: 'blog/SET_SUCCESS_MESSAGE',
      resetComments: 'blog/RESET_COMMENTS'
    }),
    ...mapActions({
      fetchPost: 'blog/fetchPost',
      sendPostView: 'blog/sendPostView',
      sendPostVote: 'blog/sendPostVote',
      fetchComments: 'blog/fetchComments'
    }),
    bottomVisible() {
      return (
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight
      )
    },
    openNewComment() {
      this.setCommentId(null)
      this.openBottomSheet(true)
    }
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
