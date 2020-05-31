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
            :to="$i18n.path(item.link)"
          >
            <v-icon class="pr-1">{{ item.icon }}</v-icon>
            {{ $t(item.title) }}
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
        justify="space-around"
        class="py-0 my-0"
        style="width:100%"
      >
        <v-col
          v-for="item in socialMedias"
          :key="item.id"
          align="center"
          class="px-0"
        >
          <v-btn
            rounded
            outlined
            icon
            :color="item.color"
            class="pl-1"
            @click="redirectTo(item.link)"
          >
            <v-icon class="pr-1">{{ icons.get(item.name).path }}</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" class="pt-0 pb-1">
          <v-divider></v-divider>
        </v-col>
        <v-col cols="6" align="center" class="py-1">
          <v-btn
            class="font-weight-black"
            text
            medium
            rounded
            @click="changeRoute()"
          >
            <v-icon class="pr-1">mdi-translate</v-icon>
            {{ locale == 'en' ? 'TR' : 'EN' }}
          </v-btn>
        </v-col>
        <v-col align="center" cols="6" class="py-1">
          <v-btn text medium rounded @click="changeTheme()">
            <v-icon v-if="!isDark">mdi-weather-night</v-icon>
            <v-icon v-else>mdi-white-balance-sunny</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
const simpleIcons = require('simple-icons')

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    menuItems: Array,
    // eslint-disable-next-line vue/require-default-prop
    socialMedias: Array
  },
  data() {
    return {
      whichFlag: false,
      isDark: false,
      icons: simpleIcons
    }
  },
  computed: {
    ...mapState({
      locale: (state) => state.locale
    })
  },
  methods: {
    redirectTo(link) {
      window.open(link, '_blank')
    },
    changeTheme() {
      this.$nuxt.$vuetify.theme.dark = !this.$nuxt.$vuetify.theme.dark
      this.isDark = !this.isDark
    },
    changeRoute() {
      if (this.locale === 'tr') {
        this.$nuxt.$router.push(
          this.$nuxt.$route.fullPath.replace(/^\/[^/]+/, '')
        )
      } else {
        this.$nuxt.$router.push(`/tr` + this.$nuxt.$route.fullPath)
      }
    },
    ...mapMutations({
      changeLanguage: 'SET_LANG'
    })
  }
}
</script>
