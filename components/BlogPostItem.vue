<template>
  <div id="blog-slide-group">
    <v-card class="mx-auto">
      <v-img v-if="post.image" :src="url + post.image" height="200px"></v-img>

      <v-card-title style="cursor: pointer;" @click="openPost(1)">
        {{ post.title }}
      </v-card-title>

      <v-card-text class="pb-0">
        <v-row>
          <v-col cols="12">
            {{ post.description }}
          </v-col>
          <v-col cols="auto" class="font-weight-bold overline pr-1">
            <v-icon>mdi-thumb-up-outline</v-icon>
            {{ post.thumbsUps }}
          </v-col>
          <v-col cols="auto" class="font-weight-bold overline pr-1">
            <v-icon>mdi-heart-outline</v-icon>
            {{ post.hearts }}
          </v-col>
          <v-col cols="auto" class="font-weight-bold overline pr-1">
            <v-icon>mdi-eye-outline</v-icon>
            {{ post.viewCount }}
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto" class="font-weight-bold overline">
            {{ $nuxt.$moment(post.created_at).format('DD MM YYYY') }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  },
  data: () => ({
    show: false,
    url: process.env.URL
  }),
  methods: {
    openPost(id) {
      this.$nuxt.$router.push(this.$i18n.path(`/blog/post/${this.post.id}`))
    }
  }
}
</script>
