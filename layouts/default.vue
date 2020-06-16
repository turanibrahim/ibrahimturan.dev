<template>
  <v-app>
    <div v-if="!loading">
      <layuout-sidebar :menu-items="menuItems" :social-medias="socialMedias" />
      <v-content style="min-height: 100vh;">
        <v-progress-linear
          v-show="pageLoading"
          indeterminate
          color="primary"
        ></v-progress-linear>
        <v-row
          style="display: flex; flex-direction: column"
          class="fill-height"
          no-gutters
        >
          <v-col cols="auto">
            <v-parallax
              v-if="!headerLoading"
              :height="$nuxt.$vuetify.breakpoint.mdAndUp ? '350' : '250'"
              :src="url + pageTitleImage"
            >
              <v-row class="px-2" justify="start" align="end">
                <v-col cols="auto" class="py-2">
                  <v-card color="rgb(255,255,255, .6)">
                    <h1 class="display-2 black--text pa-2">
                      {{ pageTitle }}
                    </h1>
                  </v-card>
                </v-col>
              </v-row>
            </v-parallax>
            <v-card
              v-else
              color="secondary"
              tile
              :height="$nuxt.$vuetify.breakpoint.mdAndUp ? '350' : '250'"
            >
              <v-row
                justify="start"
                align="start"
                no-gutters
                class="fill-height flex-column"
              >
                <v-col cols="grow" class="text-center">
                  <v-row
                    no-gutters
                    justify="center"
                    align="center"
                    class="fill-height"
                  >
                    <v-progress-circular
                      :size="50"
                      width="3"
                      color="primary"
                      indeterminate
                      class="mt-10"
                    ></v-progress-circular>
                  </v-row>
                </v-col>
                <v-col cols="auto" class="pa-2" style="width:100%">
                  <v-skeleton-loader
                    type="heading"
                    width="100%"
                    min-width="150px"
                  ></v-skeleton-loader>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="grow" class="fill-height">
            <router-view></router-view>
          </v-col>
          <v-col cols="auto">
            <v-footer padless class="pa-1" color="secondary" dark width="100%">
              <v-col class="text-center caption py-0 my-0" cols="12">
                {{ new Date().getFullYear() }} —
                <strong>İbrahim Turan</strong>
              </v-col>
            </v-footer>
          </v-col>
        </v-row>
        <v-row
          v-if="$nuxt.$vuetify.breakpoint.smAndDown"
          no-gutters
          justify="start"
          align="start"
          style="height:0px"
        >
          <v-col cols="auto" class="mt-2">
            <v-app-bar
              color="secondary"
              dark
              collapse
              short
              fixed
              class="mt-5"
              width="fit-content"
            >
              <v-app-bar-nav-icon
                @click="changeSideVisibility(true)"
              ></v-app-bar-nav-icon>
            </v-app-bar>
          </v-col>
        </v-row>
      </v-content>
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
/* eslint-disable prettier/prettier */
import { mapState, mapActions, mapMutations } from 'vuex'
import LayuoutSidebar from '../components/LayuoutSidebar.vue'

export default {
  components: {
    LayuoutSidebar
  },
  data() {
    return {
      isDark: false,
      whichFlag: true,
      loading: true,
      url: process.env.URL
    }
  },
  computed: {
    ...mapState({
      menuItems: (state) => state.layout.menuItems,
      pageTitle: (state) => state.layout.pageTitle,
      socialMedias: (state) => state.layout.socialMedias,
      isMiniVariant: (state) => state.layout.isMiniVariant,
      showSideBar: (state) => state.layout.showSideBar,
      pageTitleImage: (state) => state.layout.pageTitleImage,
      headerLoading: (state) => state.layout.headerLoading,
      pageLoading: (state) => state.layout.headerLoading
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
    }),
    ...mapMutations({
      chaneMiniVariant: 'layout/SET_MINIVARIANT',
      changeSideVisibility: 'layout/SET_SIDEBAR_VISIBILITY'
    })
  }
}
</script>

<style>
.v-parallax__content{
  padding: 0px !important;
}
</style>
