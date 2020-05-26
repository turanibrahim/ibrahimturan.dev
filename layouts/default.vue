<template>
  <v-app style="height:100vh" dark>
    <v-navigation-drawer
      v-show="$nuxt.$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      absolute
      temporary
    >
      <LayuoutSidebar
        :menu-items="menuItems"
        :menu-social-media="menuSocialMedia"
      />
    </v-navigation-drawer>
    <v-container fluid class="fill-height">
      <v-row align-center justify-center row class="fill-height">
        <v-col
          v-show="$nuxt.$vuetify.breakpoint.smAndDown"
          dark
          cols="12"
          :style="$nuxt.$vuetify.breakpoint.smAndDown ? 'height:10%' : ''"
        >
          <v-toolbar>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
          </v-toolbar>
        </v-col>
        <v-col
          v-show="$nuxt.$vuetify.breakpoint.mdAndUp"
          md="4"
          lg="3"
          xl="2"
          class="fill-height"
        >
          <LayuoutSidebar
            :menu-items="menuItems"
            :menu-social-media="menuSocialMedia"
          />
        </v-col>
        <v-col
          md="8"
          lg="9"
          xl="10"
          class="fill-height"
          :style="$nuxt.$vuetify.breakpoint.smAndDown ? 'height:90%' : ''"
        >
          <v-row class="fill-height" no-gutters>
            <v-col
              v-show="$nuxt.$vuetify.breakpoint.mdAndUp"
              cols="12"
              style="height: 10%;"
            >
              <v-row justify="end" align="end" no-gutters class="fill-height">
                <v-col>
                  <h1 class="display-3 font-weight-black pb-2">
                    {{ pageTitle }}
                  </h1>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="12"
              :style="
                $nuxt.$vuetify.breakpoint.mdAndUp ? 'height:85%' : 'height:95%'
              "
            >
              <v-card
                class="fill-height"
                elevation="24"
                style="overflow-y: auto;position: relative"
              >
                <router-view></router-view>
              </v-card>
            </v-col>
            <v-col cols="12" style="height:5%">
              <v-row justify="end" align="end" no-gutters class="fill-height">
                <v-col>
                  <v-footer padless class="pa-1" elevation="24">
                    <v-col class="text-center caption py-0 my-0" cols="12">
                      {{ new Date().getFullYear() }} —
                      <strong>İbrahim Turan</strong>
                    </v-col>
                  </v-footer>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import LayuoutSidebar from '../components/LayuoutSidebar.vue'
export default {
  components: {
    LayuoutSidebar
  },
  data() {
    return {
      isDark: false,
      whichFlag: true,
      drawer: false
    }
  },
  computed: {
    ...mapState({
      menuItems: (state) => state.layout.menuItems,
      pageTitle: (state) => state.layout.pageTitle,
      menuSocialMedia: (state) => state.layout.menuSocialMedia
    })
  }
}
</script>
<style scoped>
.theme--light.v-btn:hover::before {
  opacity: 0.3;
}
.theme--dark.v-btn:hover::before {
  opacity: 0.3;
}
</style>
