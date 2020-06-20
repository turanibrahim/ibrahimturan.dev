<template>
  <v-bottom-sheet v-model="sheet" inset scrollable>
    <v-sheet class="text-center" style="overflow-y:auto">
      <v-btn class="mt-6" text color="error" @click="sheet = !sheet">
        {{ $t('layout.close') }}
      </v-btn>
      <v-row justify="center" align="center" class="ma-0 pa-2">
        <v-col cols="12" class="">
          <v-sheet
            v-if="replyComment"
            color="blue-grey lighten-4"
            class="text-left py-1 px-2"
            light
          >
            <h4 class="font-weight">
              {{ replyComment.name }}
              {{ replyComment.surname }}
            </h4>
            <blockquote>
              {{ replyComment.comment }}
            </blockquote>
          </v-sheet>
        </v-col>
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
            v-model="comment"
            :error-messages="commentErrors"
            filled
            :label="$t('blog.comment')"
          ></v-textarea>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="12">
          <v-row class="ma-0 py-0" justify="end" align="center">
            <v-col cols="auto">
              <v-btn rounded color="error" @click="resetForm()">
                {{ $t('contact.reset') }}
              </v-btn>
            </v-col>
            <v-col cols="auto" @click="sendForm()">
              <v-btn rounded color="success">
                {{ $t('contact.send') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapMutations, mapState, mapGetters } from 'vuex'

export default {
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
    comment: {
      required,
      minLength: minLength(4)
    }
  },
  data: () => ({
    name: '',
    surname: '',
    email: '',
    comment: ''
  }),
  computed: {
    ...mapState({
      newCommentBottomSheet: (state) => state.blog.newCommentBottomSheet
    }),
    ...mapGetters({
      replyComment: 'blog/getCommentById'
    }),
    sheet: {
      set(sheet) {
        this.seNewCommentBottomSheet(sheet)
      },
      get() {
        return this.newCommentBottomSheet
      }
    },
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
    commentErrors() {
      const errors = []
      if (!this.$v.comment.$dirty) return errors
      !this.$v.comment.minLength &&
        errors.push(this.$t('contact.descriptionMinLength'))
      !this.$v.comment.required &&
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
  methods: {
    ...mapMutations({
      seNewCommentBottomSheet: 'blog/SET_NEW_COMMENT_BOTTOM_SHEET',
      setCommentId: 'blog/SET_COMMENT_ID'
    }),
    resetForm() {
      this.name = ''
      this.surname = ''
      this.email = ''
      this.comment = ''
    },
    sendForm() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sendContactForm({
          name: this.name,
          surname: this.surname,
          email: this.email,
          comment: this.comment
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
