<template>
  <div v-if="!loading" id="blog-post">
    <v-container fluid class="pa-0">
      <v-row no-gutters justify="center" align="start" wrap>
        <v-col cols="12">
          <v-card flat tile class="d-flex">
            <v-img
              max-height="500"
              :src="
                `https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png`
              "
              :lazy-src="
                `https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png`
              "
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="10" lg="8">
          <v-row no-gutters>
            <v-col cols="12">
              <span id="header" class="display-2">
                <v-icon
                  v-if="$nuxt.$vuetify.breakpoint.smAndDown"
                  @click="changeSideVisibility(true)"
                >
                  mdi-chevron-right
                </v-icon>
                {{ post.title }}
              </span>
            </v-col>
            <v-col class="align-end text-right justify-center px-2" cols="12">
              <span class="body-2">
                {{ $nuxt.$moment(post.created_at).format('DD MMMM YYYY') }}
              </span>
              <span class="body-2">
                <v-icon>mdi-eye</v-icon>
                {{ post.viewCount + 1 }}
              </span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="12" md="10" lg="8">
          <v-container fluid class="pa-0">
            <VueShowdown id="mark-down" class="pa-2" :markdown="markdown" />
          </v-container>
        </v-col>
        <v-col cols="12" sm="10" md="10" lg="8" class="py-2">
          <v-toolbar dense short color="success" class="white--text">
            <v-row no-gutters justify="space-around" align="center">
              <v-col cols="auto">
                {{ post.hearts }}
                <v-btn icon color="white"><v-icon>mdi-heart</v-icon></v-btn>
              </v-col>
              <v-col cols="auto">
                {{ post.thumbsUps }}
                <v-btn icon color="white"><v-icon>mdi-thumb-up</v-icon></v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn icon color="white">
                  {{ post.thumbsDowns }}
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
        this.loading = true
        this.setPageTitle({ title: '' })
        await this.fetchPost(this.$nuxt.$route.params.id)
      } catch (e) {
        this.$nuxt.$router.push('/blog')
      } finally {
        this.loading = false
      }
    }
  },
  async created() {
    try {
      this.loading = true
      this.setPageTitle({ title: '' })
      await this.fetchPost(this.$nuxt.$route.params.id)
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
    }
    this.sendReadCount()
  },
  methods: {
    ...mapMutations({
      setPageTitle: 'layout/setPageTitle',
      setMetaData: 'layout/SET_META_DATA',
      changeSideVisibility: 'layout/SET_SIDEBAR_VISIBILITY'
    }),
    ...mapActions({
      fetchPost: 'blog/fetchPost',
      sendReadCount: 'blog/sendReadCount'
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
#header {
  box-shadow: 0px -20px 0px hsl(144, 100%, 76%) inset;
  display: inline-block;
  gap: normal;
  margin: 8px;
}
</style>
