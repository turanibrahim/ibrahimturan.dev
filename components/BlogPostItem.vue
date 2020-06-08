<template>
  <div id="blog-slide-group">
    <v-card class="mx-auto" max-width="600">
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      ></v-img>

      <v-card-title style="cursor: pointer;" @click="openPost(1)">
        Top western road trips
      </v-card-title>

      <v-card-text class="pb-0">
        <v-row>
          <v-col cols="12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac
            laoreet ex. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Morbi tempus pretium
            feugiat. Phasellus et nulla leo. Nullam facilisis risus non est
            fermentum, at semper sapien blandit.
          </v-col>
          <v-col cols="auto" class="font-weight-bold overline pr-1">
            <v-icon>mdi-thumb-up-outline</v-icon>
            16
          </v-col>
          <v-col cols="auto" class="font-weight-bold overline pr-1">
            <v-icon>mdi-heart-outline</v-icon>
            16
          </v-col>
          <v-col cols="auto" class="font-weight-bold overline pr-1">
            <v-icon>mdi-eye-outline</v-icon>
            16
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto" class="font-weight-bold overline">
            05/12/2020 Pazartesi
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false
  }),
  methods: {
    openPost(id) {
      window.location.href = `/blog/post/${id}`
    }
  }
}
</script>
