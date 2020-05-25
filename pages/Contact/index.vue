<template>
  <v-row no-gutters class="pa-2" justify="start" align="start">
    <v-col cols="12">
      <v-row justify="center" align="center" no-gutters>
        <v-col cols="12" class="text-center">
          <h1>You could find me on</h1>
        </v-col>
        <v-col v-for="item in socialMedia" :key="item.id" cols="auto">
          <ContactSocialMedia
            :name="item.name"
            :color="item.color"
            :link="item.link"
          />
        </v-col>
        <v-col
          class="pa-3 text-center"
          :style="
            showEmail ? 'border:3px solid #D14836; border-radius: 34px;' : ''
          "
          style="cursor: pointer;"
          cols="auto"
          @click="showEmail = !showEmail"
        >
          <v-scroll-x-reverse-transition>
            <h3 v-show="showEmail" style="display:inline">
              ibrahimturan002@gmail.com
            </h3>
          </v-scroll-x-reverse-transition>
          <v-icon color="#D14836" x-large>
            {{ icons.get('gmail').path }}
          </v-icon>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row justify="center" align="center" no-gutters>
        <v-col cols="12" class="text-center">
          <h1>You could contact me via form below</h1>
        </v-col>
        <v-col cols="12" sm="12">
          <v-card>
            <v-row class="ma-0 pa-0" justify="center" align="start">
              <v-col cols="12" sm="6" xs="12">
                <v-text-field label="Name" filled hide-details></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" xs="12">
                <v-text-field
                  label="Surname"
                  filled
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" sm="12">
                <v-text-field label="E-Mail" filled hide-details></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" sm="12" class="pb-0">
                <v-textarea filled label="Message"></v-textarea>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="12">
                <v-row class="ma-0 py-0" justify="end" align="center">
                  <v-col cols="auto">
                    <v-btn rounded color="error darken-1">
                      Reset
                    </v-btn>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn rounded color="success darken-2">
                      Send
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import ContactSocialMedia from '../../components/ContactSocialMedia.vue'
const simpleIcons = require('simple-icons')

export default {
  components: {
    ContactSocialMedia
  },
  data() {
    return {
      icons: simpleIcons,
      socialMedia: [
        {
          id: 0,
          name: 'instagram',
          link: 'https://www.instagram.com/_ibrahimturan',
          color: '#E4405F'
        },
        {
          id: 1,
          name: 'twitter',
          link: 'https://www.twitter.com/_ibrahimturan',
          color: '#1DA1F2'
        },
        {
          id: 2,
          name: 'github',
          link: 'https://www.github.com/turanibrahim',
          color: ''
        },
        {
          id: 3,
          name: 'linkedin',
          link: 'https://www.linkedin.com/in/ibrahimturann/',
          color: '#0077B5'
        }
      ],
      showEmail: false
    }
  },
  methods: {
    redirectToMail() {
      window.location.href = 'mailto:ibrahimturan002@gmail.com'
    }
  }
}
</script>
