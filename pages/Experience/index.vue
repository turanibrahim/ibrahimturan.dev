<template>
  <v-timeline
    :class="$nuxt.$vuetify.breakpoint.mdAndUp ? 'px-4 mt-4' : 'pr-2'"
    :dense="$nuxt.$vuetify.breakpoint.smAndDown"
  >
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      :color="item.color"
      small
    >
      <template v-slot:opposite>
        <span :class="`headline font-weight-bold ${item.color}--text`">
          {{ item.startingDate }} ~ {{ item.terminationDate }}
        </span>
      </template>
      <div class="py-4">
        <h2 :class="`headline font-weight-bold ${item.color}--text`">
          {{ item.title }}
        </h2>
        <h4 :class="`subtitle-1 mt-0 pt-0 mb-4 ${item.color}--text`">
          {{ item.company }}
        </h4>
        <div v-html="item.explanation"></div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data: () => ({
    items: [
      {
        color: 'cyan',
        startingDate: '14-01-2020',
        terminationDate: 'Current',
        explanation: '',
        title: 'Intern',
        company: 'BGS Bireysel Gelişim İnteraktif Sis. A.Ş '
      },
      {
        color: 'green',
        startingDate: 'Agust 2017',
        terminationDate: 'October 2017',
        explanation:
          // eslint-disable-next-line no-multi-str
          '<p>• Observed how to servers work and how to maintain them on theirlocal servers.</p>\
          <p>• Learned and made computer maintain.</p>\
          <p>• Learned MSSQL commands, SQL server management and server maintain at the basic level.</p>\
          <p>• Made base level blog web site using with Adobe ColdFusion web development language and MSSQL database.</p>',
        title: 'Intern',
        company: 'Narven Termal '
      }
    ]
  }),
  created() {
    this.setPageTitle({ title: 'Experience' })
  },
  methods: {
    redirectToMail() {
      window.location.href = 'mailto:ibrahimturan002@gmail.com'
    },
    ...mapMutations({
      setPageTitle: 'layout/setPageTitle'
    })
  }
}
</script>
