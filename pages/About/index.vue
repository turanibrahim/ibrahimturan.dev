<template>
  <v-row wrap no-gutters>
    <v-col cols="12" class="pt-3">
      <div class="paragraph pa-2">
        <p class="body-1 font-weight-black">{{ about1 }}</p>
        <p class="body-1 font-weight-black">{{ about }}</p>
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
          My favorite hosting
        </h1>
      </div>
    </v-col>
    <v-col cols="12" class="pt-0 mt-0">
      <v-row justify="space-around" align="start" class="pa-4" no-gutters>
        <v-col v-for="item in hosts" :key="item.id" cols="auto">
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
import { mapMutations } from 'vuex'
import AboutTechListItem from '../../components/AboutTechListItem'

export default {
  components: {
    AboutTechListItem
  },
  data() {
    return {
      about:
        'I interested in everything related to software. I like to be practical and working solution oriented. I made to small scale projects with the Laravel framework of PHP language. Nowadays I focused Javascript based back-end and front-end frameworks and libraries. I have high communications skills and I always would like to be a part of the team. I would like to be actual via doing researches and I open to innovations.',
      techs: [
        {
          id: 0,
          color: 'red',
          name: 'html5',
          progress: 85
        },
        {
          id: 1,
          color: 'blue',
          name: 'css3',
          progress: 75
        },
        {
          id: 2,
          color: 'yellow',
          name: 'javascript',
          progress: 85
        },
        {
          id: 3,
          color: '#777bb4',
          name: 'php',
          progress: 60
        },
        {
          id: 4,
          color: '#4479a1',
          name: 'mysql',
          progress: 65
        },
        {
          id: 5,
          color: '#336791',
          name: 'postgresql',
          progress: 45
        },
        {
          id: 6,
          color: '#4FC08D',
          name: 'vue-dot-js',
          progress: 65
        },
        {
          id: 7,
          color: '#1867C0',
          name: 'vuetify',
          progress: 70
        },
        {
          id: 8,
          color: '#00C58E',
          name: 'nuxt-dot-js',
          progress: 25
        },
        {
          id: 9,
          color: '#339933',
          name: 'node-dot-js',
          progress: 55
        },
        {
          id: 10,
          color: '#2496ED',
          name: 'docker',
          progress: 45
        },
        {
          id: 11,
          color: '#269539',
          name: 'nginx',
          progress: 40
        },
        {
          id: 12,
          color: '#47A248',
          name: 'mongodb',
          progress: 35
        }
      ],
      hosts: [
        {
          id: 0,
          color: '#430098',
          name: 'heroku',
          progress: 55
        }
      ],
      envList: [
        {
          id: 0,
          color: '#FCC624',
          name: 'linux'
        },
        {
          id: 1,
          color: '#35BF5C',
          name: 'manjaro'
        },
        {
          id: 2,
          color: '#1D99F3',
          name: 'kde'
        },
        {
          id: 3,
          color: '#4EAA25',
          name: 'gnubash'
        },
        {
          id: 4,
          color: '#007ACC',
          name: 'visualstudiocode'
        },
        {
          id: 5,
          color: '#4285F4',
          name: 'googlechrome'
        }
      ],
      about1:
        "I'm at the beginning of the full-stack developer path. I want to specialize in web programming as full-stack developer. I have quite a bit more interest and skills on Back-end development. If I need to specify in percentages of both front-end and back-end, I can say that I tend to 60% on back-end and 40% on front-end."
    }
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
