<template>
  <v-app>
    <div v-if="!loading" style="height:100vh">
      <layuout-sidebar
        v-if="$nuxt.$vuetify.breakpoint.smAndDown"
        :menu-items="menuItems"
        :social-medias="socialMedias"
      />
      <v-container
        fluid
        class="fill-height"
        :class="$nuxt.$vuetify.breakpoint.smAndDown ? 'py-0' : ''"
      >
        <v-row
          align-center
          justify-center
          row
          class="fill-height"
          style="overflow-y:auto"
        >
          <v-col
            v-if="$nuxt.$vuetify.breakpoint.smAndUp"
            md="auto"
            lg="auto"
            xl="auto"
            transition="scroll-x-transition"
          >
            <layuout-sidebar
              v-if="$nuxt.$vuetify.breakpoint.smAndUp"
              :menu-items="menuItems"
              :social-medias="socialMedias"
            />
          </v-col>
          <v-col
            md="grow"
            lg="grow"
            xl="grow"
            class="fill-height"
            :style="
              $nuxt.$vuetify.breakpoint.smAndDown
                ? 'height:90%'
                : 'display: flex; flex-direction: column; align-items: stretch;'
            "
          >
            <h1 v-if="!isMiniVariant" class="display-2 font-weight-bold pb-3">
              <v-icon
                v-if="$nuxt.$vuetify.breakpoint.smAndDown"
                @click="changeSideVisibility(true)"
              >
                mdi-chevron-right
              </v-icon>
              {{ pageTitle }}
            </h1>
            <v-card
              elevation="24"
              style="overflow-y: scroll"
              class="fill-height"
            >
              <router-view></router-view>
            </v-card>
            <v-footer
              padless
              class="pa-1 mt-2 justify-end align-end"
              elevation="24"
            >
              <v-col class="text-center caption py-0 my-0" cols="12">
                {{ new Date().getFullYear() }} —
                <strong>İbrahim Turan</strong>
              </v-col>
            </v-footer>
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
<style scoped>
.theme--light.v-btn:hover::before {
  opacity: 0.3;
}
.theme--dark.v-btn:hover::before {
  opacity: 0.3;
}
</style>
