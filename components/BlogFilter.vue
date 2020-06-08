<template>
  <div id="blog-filter">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header
          expand-icon="mdi-menu-down"
          class="headline py-0"
        >
          {{ $t('blog.filter') }}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="pa-0 ma-0">
          <v-row justify="center">
            <v-col class="d-flex" cols="12" sm="3">
              <v-select
                :items="language"
                :item-value="language.value"
                :item-text="language.text"
                filled
                :label="$t('blog.language')"
                hide-details
                prepend-icon="mdi-translate"
                single-line
                dense
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="3">
              <v-select
                :items="orderBy"
                :item-value="orderBy.value"
                :item-text="orderBy.text"
                filled
                :label="$t('blog.orderBy')"
                hide-details
                prepend-icon="mdi-swap-vertical"
                single-line
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                :label="$t('blog.search')"
                filled
                hide-details
                prepend-icon="mdi-magnify"
                single-line
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderBy: [
        {
          id: 0,
          text: this.$t('blog.latest'),
          value: 'latest'
        },
        {
          id: 3,
          text: this.$t('blog.mostLiked'),
          value: 'mostLiked'
        },
        {
          id: 2,
          text: this.$t('blog.mostViewed'),
          value: 'mostViewed'
        },
        {
          id: 1,
          text: this.$t('blog.oldest'),
          value: 'oldest'
        }
      ],
      language: [
        {
          id: 0,
          text: this.$t('blog.turkish'),
          value: 'turkish'
        },
        {
          id: 1,
          text: this.$t('blog.english'),
          value: 'english'
        },
        {
          id: 2,
          text: this.$t('blog.all'),
          value: 'all'
        }
      ]
    }
  }
}
</script>
