<template>
  <div v-if="!loading">
    <v-container fluid class="pa-2">
      <v-row v-for="section in sections" :key="section.id" wrap no-gutters>
        <v-col v-if="section.title" cols="12">
          <div class="mx-2 px-2">
            <h1>
              {{ section.title }}
            </h1>
          </div>
        </v-col>
        <v-col v-if="section.description" cols="12" class="pt-3">
          <div
            :class="$nuxt.$vuetify.theme.dark ? 'paragraph-dark' : 'paragraph'"
            class="pa-2"
          >
            <div class="body-1" v-html="section.description"></div>
          </div>
        </v-col>
        <v-col v-if="section.icons" cols="12" class="pt-0 mt-0">
          <v-row justify="space-around" align="start" class="pa-4" no-gutters>
            <v-col v-for="item in section.icons" :key="item.name" cols="auto">
              <AboutTechListItem
                :color="item.color"
                :name="item.name"
                :progress="item.progress"
              />
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
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import AboutTechListItem from '~/components/AboutTechListItem'

export default {
  components: {
    AboutTechListItem
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapState({
      sections: (state) => state.about.sections,
      locale: (state) => state.locale,
      metaData: (state) => state.layout.metaData
    })
  },
  watch: {
    async locale(newLocale, oldLocale) {
      const vm = this
      this.fetchMetaData({ path: 'about', lang: this.locale })
      try {
        vm.loading = true
        await this.fetchSections()
      } finally {
        vm.loading = false
      }
    }
  },
  async created() {
    this.setPageTitle({ title: 'İbrahim Turan' })
    this.setPageTitleImage('/img/5.jpg')
    try {
      this.loading = true
      await this.fetchMetaData({ path: 'about', lang: this.locale })
      await this.fetchSections()
    } finally {
      this.loading = false
    }
  },
  methods: {
    ...mapMutations({
      setPageTitle: 'layout/setPageTitle',
      setPageTitleImage: 'layout/SET_PAGE_TITLE_IMAGE'
    }),
    ...mapActions({
      fetchSections: 'about/fetchSections',
      fetchMetaData: 'layout/fetchMetaData' // map `this.add()` to `this.$store.dispatch('increment')`
    })
  },
  head() {
    return {
      title: this.metaData.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: this.metaData.hid,
          name: this.metaData.name,
          content: this.metaData.description
        }
      ]
    }
  }
}
</script>

<style scoped>
.paragraph {
  border-left: 5px solid black;
}
.paragraph-dark {
  border-left: 5px solid white;
}
</style>
