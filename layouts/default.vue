<template>
  <v-app>
    <div v-if="!loading" style="height:100vh">
      <v-navigation-drawer
        v-show="$nuxt.$vuetify.breakpoint.smAndDown"
        v-model="drawer"
        absolute
        temporary
      >
        <LayuoutSidebar :menu-items="menuItems" :social-medias="socialMedias" />
      </v-navigation-drawer>
      <v-container
        fluid
        class="fill-height"
        :class="$nuxt.$vuetify.breakpoint.smAndDown ? 'py-0' : ''"
      >
        <v-row align-center justify-center row class="fill-height">
          <v-col
            v-show="$nuxt.$vuetify.breakpoint.smAndDown"
            dark
            cols="12"
            :style="$nuxt.$vuetify.breakpoint.smAndDown ? 'height:10%' : ''"
          >
            <v-toolbar class="ma-0 pa-0" tile>
              <v-toolbar-title class="pa-0 ma-0">
                <h1 class="headline font-weight-bold">
                  {{ pageTitle }}
                </h1>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-app-bar-nav-icon
                @click="drawer = !drawer"
              ></v-app-bar-nav-icon>
            </v-toolbar>
          </v-col>
          <v-col
            v-if="$nuxt.$vuetify.breakpoint.mdAndUp"
            v-show="!isHidden"
            md="4"
            lg="3"
            xl="2"
            class="fill-height"
            transition="scroll-x-transition"
          >
            <layuout-sidebar
              :menu-items="menuItems"
              :social-medias="socialMedias"
            />
          </v-col>
          <v-col
            md="grow"
            lg="grow"
            xl="grow"
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
                  <v-col align-self="center">
                    <h1 class="display-2 font-weight-bold">
                      {{ pageTitle }}
                    </h1>
                  </v-col>
                  <v-col cols="auto" align-self="center">
                    <v-app-bar-nav-icon
                      x-large
                      @click="isHidden = !isHidden"
                    ></v-app-bar-nav-icon>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
                :style="
                  $nuxt.$vuetify.breakpoint.mdAndUp
                    ? 'height:85%'
                    : 'height:95%'
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
              <v-col
                cols="12"
                style="height:5%"
                :class="$nuxt.$vuetify.breakpoint.smAndDown ? 'mt-1' : ''"
              >
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
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LayuoutSidebar from '../components/LayuoutSidebar.vue'

export default {
  components: {
    LayuoutSidebar
  },
  data() {
    return {
      isDark: false,
      whichFlag: true,
      drawer: false,
      loading: true,
      isHidden: false
    }
  },
  computed: {
    ...mapState({
      menuItems: (state) => state.layout.menuItems,
      pageTitle: (state) => state.layout.pageTitle,
      socialMedias: (state) => state.layout.socialMedias
    })
  },
  created() {
    this.fetchSocialMedias().then(() => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions({
      fetchSocialMedias: 'layout/fetchSocialMedias'
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
