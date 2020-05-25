<template>
  <v-card class="fill-height" elevation="24">
    <v-img
      src="https://images.unsplash.com/photo-1487149506474-cbf9196c4f9f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2010&q=80"
    >
      <v-row align="center" class="fill-height">
        <v-col align="center" cols="12">
          <v-avatar class="profile" size="164">
            <img
              src="https://pbs.twimg.com/profile_images/1243619088976556032/23WEBaWr_400x400.jpg"
              alt="İbrahim"
            />
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-card-title class="white--text text-center pt-0" align="center">
            <h3 class="text-center">İbrahim Turan</h3>
          </v-card-title>
          <v-card-subtitle class="white--text">
            <h4>Web Developer/Computer Engineer</h4>
          </v-card-subtitle>
        </v-col>
      </v-row>
    </v-img>
    <v-card-text>
      <v-row align="center" justify="center">
        <v-col v-for="item in menuItems" :key="item.id" sm="12" align="start">
          <v-btn
            rounded
            text
            :color="item.color"
            :large="$nuxt.$vuetify.breakpoint.mdAndUp"
            class="pl-2"
            nuxt
            :to="item.link"
          >
            <v-icon class="pr-1">{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions
      class="py-0 my-0"
      style="bottom:0px;position: absolute; width:100%"
    >
      <v-row
        align="center"
        justify="center"
        class="py-0 my-0"
        style="width:100%"
      >
        <v-col
          v-for="item in menuSocialMedia"
          :key="item.id"
          class="shrink"
          align="center"
        >
          <v-btn
            rounded
            outlined
            icon
            :color="item.color"
            class="pl-1"
            @click="redirectTo(item.link)"
          >
            <v-icon class="pr-1">{{ item.icon }}</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" class="pt-0 pb-1">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="6" align="center" class="py-1">
          <v-avatar size="36" tile @click="whichFlag = !whichFlag">
            <v-img
              v-if="whichFlag"
              src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/230/flag-for-turkey_1f1f9-1f1f7.png"
            ></v-img>
            <v-img
              v-else
              src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/230/flag-for-united-states_1f1fa-1f1f8.png"
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col align="center" cols="6" class="py-1">
          <v-btn icon medium rounded @click="changeTheme()">
            <v-icon v-if="!isDark">mdi-weather-night</v-icon>
            <v-icon v-else>mdi-white-balance-sunny</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    menuItems: Array,
    // eslint-disable-next-line vue/require-default-prop
    menuSocialMedia: Array
  },
  data() {
    return {
      whichFlag: false,
      isDark: false
    }
  },
  methods: {
    redirectTo(link) {
      window.open(link, '_blank')
    },
    changeTheme() {
      this.$nuxt.$vuetify.theme.dark = !this.$nuxt.$vuetify.theme.dark
      this.isDark = !this.isDark
    }
  }
}
</script>
