<template>
  <v-navigation-drawer
    v-model="showSideBar"
    :permanent="$nuxt.$vuetify.breakpoint.mdAndUp"
    :mini-variant="isMiniVariant"
    class="fill-height v-card__tile"
    :temporary="$nuxt.$vuetify.breakpoint.smAndDown"
    :absolute="$nuxt.$vuetify.breakpoint.smAndDown"
    app
    width="300"
  >
    <v-card class="fill-height" color="primary" dark tile>
      <v-row v-if="!isMiniVariant" no-gutters justify="center" align="center">
        <v-col cols="grow">
          <v-row align="center" class="fill-height">
            <v-col align="center" cols="12">
              <v-avatar class="profile" size="180">
                <img
                  src="https://pbs.twimg.com/profile_images/1243619088976556032/23WEBaWr_400x400.jpg"
                  alt="İbrahim"
                />
              </v-avatar>
            </v-col>
            <v-col class="py-0" cols="10">
              <v-card-title class="text-center py-0" align="center">
                <h3 class="text-center">İbrahim Turan</h3>
              </v-card-title>
              <v-card-subtitle class="pb-2">
                <h4>Web Developer</h4>
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="auto">
          <v-btn
            icon
            class="white--text text-center pr-2"
            @click="
              $nuxt.$vuetify.breakpoint.mdAndUp
                ? changeMiniVariant(!isMiniVariant)
                : changeSideVisibility(false)
            "
          >
            <v-icon x-large>mdi-chevron-left</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-divider color="white" class="mx-2" dark></v-divider>
      <v-list dense nav rounded>
        <v-list-item
          v-show="isMiniVariant"
          @click="changeMiniVariant(!isMiniVariant)"
        >
          <v-list-item-icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-divider v-show="isMiniVariant" color="white" dark></v-divider>
        <v-list-item
          v-for="item in menuItems"
          :key="item.id"
          link
          :to="$i18n.path(item.link)"
          :color="item.color"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-actions
        class="py-0 my-0 px-3"
        style="bottom:0px;position: absolute"
      >
        <v-row align="center" justify="space-around" class="py-0 my-0">
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
          <v-col v-show="!isMiniVariant" cols="12" class="pt-0 pb-1">
            <v-divider color="white" class="mx-2" dark></v-divider>
          </v-col>
          <v-col v-show="!isMiniVariant" cols="6" align="center" class="py-1">
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
          <v-col v-show="!isMiniVariant" align="center" cols="6" class="py-1">
            <v-btn text medium rounded @click="changeTheme()">
              <v-icon v-if="!isDark">mdi-weather-night</v-icon>
              <v-icon v-else>mdi-white-balance-sunny</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
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
      locale: (state) => state.locale,
      isMiniVariant: (state) => state.layout.isMiniVariant
    }),
    showSideBar: {
      get() {
        return this.$nuxt.$store.state.layout.showSideBar
      },
      set(value) {
        this.$nuxt.$store.commit('layout/SET_SIDEBAR_VISIBILITY', value)
      }
    }
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
      changeLanguage: 'SET_LANG',
      changeMiniVariant: 'layout/SET_MINIVARIANT',
      changeSideVisibility: 'layout/SET_SIDEBAR_VISIBILITY'
    })
  }
}
</script>
