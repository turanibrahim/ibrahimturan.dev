<template>
  <v-row wrap no-gutters>
    <v-col cols="12" class="pt-3">
      <div class="paragraph pa-2">
        <div class="body-1 font-weight-black" v-html="about"></div>
      </div>
    </v-col>
    <v-col cols="12">
      <div class="mx-2 px-2">
        <h1>
          I worked with
        </h1>
      </div>
    </v-col>
    <v-col cols="12" class="pt-0 mt-0">
      <v-row justify="space-around" align="start" class="pa-4" no-gutters>
        <v-col v-for="item in techs" :key="item.id" cols="auto">
          <AboutTechListItem
            :color="item.color"
            :name="item.name"
            :progress="item.progress"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <div class="mx-2 px-2">
        <h1>
          My working environment
        </h1>
      </div>
    </v-col>
    <v-col cols="12" class="pt-0 mt-0">
      <v-row justify="space-around" align="start" class="pa-4" no-gutters>
        <v-col v-for="item in envList" :key="item.id" cols="auto">
          <AboutTechListItem :color="item.color" :name="item.name" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import AboutTechListItem from '../../components/AboutTechListItem'

export default {
  components: {
    AboutTechListItem
  },
  data() {
    return {
      //
    }
  },
  computed: {
    ...mapState({
      about: (state) => state.about.aboutMe,
      techs: (state) => state.about.techs,
      envList: (state) => state.about.envList
    })
  },
  created() {
    this.setPageTitle({ title: 'İbrahim Turan' })
  },
  methods: {
    ...mapMutations({
      setPageTitle: 'layout/setPageTitle'
    })
  }
}
</script>

<style scoped>
.paragraph {
  border-left: 5px solid black;
}
</style>
