<template>
  <v-app>
    <div v-if="!loading">
      <layuout-sidebar :menu-items="menuItems" :social-medias="socialMedias" />
      <v-content style="min-height: 100vh;">
        <v-progress-linear
          v-show="pageLoading"
          indeterminate
          color="green"
        ></v-progress-linear>
        <v-row
          style="display: flex; flex-direction: column"
          class="fill-height"
          no-gutters
        >
          <v-col cols="auto">
            <v-parallax height="350" :src="url + pageTitleImage">
              <v-row no-gutters justify="start" align="end">
                <v-col cols="12" class="py-2">
                  <v-skeleton-loader
                    v-if="headerLoading"
                    type="heading"
                  ></v-skeleton-loader>
                  <v-card v-else color="rgb(255,255,255, .4)">
                    <span id="header" class="display-2 black--text">
                      <v-icon
                        v-if="$nuxt.$vuetify.breakpoint.smAndDown"
                        @click="changeSideVisibility(true)"
                      >
                        mdi-chevron-right
                      </v-icon>
                      {{ pageTitle }}
                    </span>
                  </v-card>
                </v-col>
              </v-row>
            </v-parallax>
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
#header {
  display: inline-block;
  font-size: 32px;
  font-weight: 600;
  gap: normal;
  margin: 10px;
}
</style>
