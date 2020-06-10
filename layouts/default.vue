<template>
  <v-app>
    <div v-if="!loading">
      <layuout-sidebar :menu-items="menuItems" :social-medias="socialMedias" />
      <v-content style="min-height: 100vh;">
        <v-container fluid class="fill-height pa-0">
          <v-row
            style="display: flex; flex-direction: column"
            class="fill-height"
            no-gutters
          >
            <v-col v-if="pageTitle" cols="auto">
              <span id="header" class="display-2 font-weight-bold">
                <v-icon
                  v-if="$nuxt.$vuetify.breakpoint.smAndDown"
                  @click="changeSideVisibility(true)"
                >
                  mdi-chevron-right
                </v-icon>
                {{ pageTitle }}
              </span>
            </v-col>
            <v-col cols="grow" class="fill-height">
              <router-view></router-view>
            </v-col>
            <v-col cols="auto">
              <v-footer padless class="pa-1">
                <v-col class="text-center caption py-0 my-0" cols="12">
                  {{ new Date().getFullYear() }} —
                  <strong>İbrahim Turan</strong>
                </v-col>
              </v-footer>
            </v-col>
          </v-row>
        </v-container>
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
      loading: true
    }
  },
  computed: {
    ...mapState({
      menuItems: (state) => state.layout.menuItems,
      pageTitle: (state) => state.layout.pageTitle,
      socialMedias: (state) => state.layout.socialMedias,
      isMiniVariant: (state) => state.layout.isMiniVariant,
      showSideBar: (state) => state.layout.showSideBar
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
  box-shadow: 10px -20px 10px hsl(144, 100%, 76%) inset;
  display: inline-block;
  font-size: 32px;
  font-weight: 600;
  gap: normal;
  margin: 10px;
}
</style>
