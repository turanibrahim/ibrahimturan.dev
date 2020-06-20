<template>
  <div id="blog-post-comment">
    <v-card shaped>
      <v-card-title class="py-2">
        {{ comment.name }}
        {{ comment.surname }}
      </v-card-title>
      <v-card-text class="pb-0">
        <v-row align="start" justify="start" no-gutters>
          <v-col v-if="comment.reply_to" cols="12">
            <v-sheet color="blue-grey lighten-4" class="py-1 px-2" light>
              <h4 class="font-weight">
                {{ comment.reply_to.name }}
                {{ comment.reply_to.surname }}
              </h4>
              <blockquote>
                {{ comment.reply_to.comment }}
              </blockquote>
            </v-sheet>
          </v-col>
          <v-col cols="12">
            <p>
              {{ comment.comment }}
            </p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-row justify="end" align="center" no-gutters>
          <v-col cols="auto" class="px-2">
            <v-btn color="info" small rounded @click="replyComment(comment.id)">
              Cevab vermeg izdiorum
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapMutations({
      openBottomSheet: 'blog/SET_NEW_COMMENT_BOTTOM_SHEET',
      setCommentId: 'blog/SET_COMMENT_ID'
    }),
    replyComment(id) {
      this.setCommentId(id)
      this.openBottomSheet(true)
    }
  }
}
</script>
