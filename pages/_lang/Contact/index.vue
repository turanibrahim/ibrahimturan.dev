<template>
  <v-row no-gutters class="pa-2" justify="start" align="start">
    <v-col cols="12">
      <v-row justify="center" align="center" no-gutters>
        <v-col cols="12" class="text-center">
          <h1>{{ $t('contact.findMe') }}</h1>
        </v-col>
        <v-col v-for="item in socialMedia" :key="item.id" cols="auto">
          <ContactSocialMedia
            :name="item.name"
            :color="item.color"
            :link="item.link"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row justify="center" align="center" no-gutters>
        <v-col cols="12" class="text-center">
          <h1>{{ $t('contact.contactMe') }}</h1>
        </v-col>
        <v-col cols="12" sm="12">
          <v-card>
            <v-row class="ma-0 pa-0" justify="center" align="start">
              <v-col cols="12" sm="6" xs="12">
                <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  :label="$t('contact.name')"
                  filled
                  @change="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" xs="12">
                <v-text-field
                  v-model="surname"
                  :error-messages="surnameErrors"
                  :label="$t('contact.surname')"
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" sm="12">
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  :label="$t('contact.email')"
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" sm="12" class="pb-0">
                <v-textarea
                  v-model="description"
                  :error-messages="descriptionErrors"
                  filled
                  :label="$t('contact.description')"
                ></v-textarea>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="12">
                <v-row class="ma-0 py-0" justify="end" align="center">
                  <v-col cols="auto">
                    <v-btn rounded color="error darken-1" @click="resetForm()">
                      {{ $t('contact.reset') }}
                    </v-btn>
                  </v-col>
                  <v-col cols="auto" @click="sendForm()">
                    <v-btn rounded color="success darken-2">
                      {{ $t('contact.send') }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-snackbar
      v-model="successMessage"
      color="success darken-2"
      multi-line
      :timeout="new Number(5000)"
      top
      vertical
    >
      <span class="font-weight-black">{{ $t('contact.successMessage') }}</span>
      <v-btn dark text @click="successMessage = false">
        {{ $t('contact.close') }}
      </v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapMutations, mapState, mapActions } from 'vuex'
import ContactSocialMedia from '../../../components/ContactSocialMedia.vue'

export default {
  components: {
    ContactSocialMedia
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    surname: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      minLength: minLength(4),
      email
    },
    description: {
      required,
      minLength: minLength(4)
    }
  },
  data() {
    return {
      name: null,
      surname: null,
      email: null,
      description: null,
      successMessage: false
    }
  },
  computed: {
    ...mapState({
      locale: (state) => state.locale,
      socialMedia: (state) => state.layout.socialMedias
    }),
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.minLength && errors.push(this.$t('contact.nameMinLength'))
      !this.$v.name.required && errors.push(this.$t('contact.nameRequired'))
      return errors
    },
    surnameErrors() {
      const errors = []
      if (!this.$v.surname.$dirty) return errors
      !this.$v.surname.minLength &&
        errors.push(this.$t('contact.surnameMinLength'))
      !this.$v.surname.required &&
        errors.push(this.$t('contact.surnameRequired'))
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.minLength &&
        errors.push(this.$t('contact.descriptionMinLength'))
      !this.$v.description.required &&
        errors.push(this.$t('contact.descriptionRequired'))
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push(this.$t('contact.emailMustBeValid'))
      !this.$v.email.required && errors.push(this.$t('contact.emailRequired'))
      return errors
    }
  },
  watch: {
    locale(newLocale, oldLocale) {
      this.setPageTitle({ title: this.$t('titles.contact') })
    }
  },
  created() {
    this.setPageTitle({ title: this.$t('titles.contact') })
    this.fetchSocialMedias()
  },
  methods: {
    redirectToMail() {
      window.location.href = 'mailto:ibrahimturan002@gmail.com'
    },
    ...mapMutations({
      setPageTitle: 'layout/setPageTitle'
    }),
    ...mapActions({
      fetchSocialMedias: 'layout/fetchSocialMedias',
      sendContactForm: 'layout/sendContactForm'
    }),
    resetForm() {
      this.name = null
      this.surname = null
      this.email = null
      this.description = null
    },
    sendForm() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sendContactForm({
          name: this.name,
          surname: this.surname,
          email: this.email,
          description: this.description
        }).then((resolve, reject) => {
          if (resolve) {
            this.successMessage = true
            this.resetForm()
          }
        })
      }
    }
  }
}
</script>
