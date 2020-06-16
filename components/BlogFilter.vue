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
                v-model="language"
                :items="languages"
                :item-value="languages.value"
                :item-text="languages.text"
                filled
                :label="$t('blog.language')"
                hide-details
                prepend-icon="mdi-translate"
                single-line
                dense
                return-object
                @input="fetchPosts({ filter: true })"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" sm="3">
              <v-select
                v-model="orderBy"
                :items="orderTypes"
                :item-value="orderTypes.name"
                :item-text="orderTypes.value"
                filled
                :label="$t('blog.orderBy')"
                hide-details
                prepend-icon="mdi-swap-vertical"
                single-line
                dense
                return-object
                @input="fetchPosts({ filter: true })"
              ></v-select>
            </v-col>
            <v-col cols="24" sm="6" md="6">
              <v-text-field
                v-model="search"
                :label="$t('blog.search')"
                filled
                hide-details
                prepend-icon="mdi-magnify"
                single-line
                dense
                @keyup.enter="fetchPosts({ filter: true })"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      orderTypes: [
        {
          id: 0,
          text: this.$t('blog.latest'),
          orderBy: 'desc',
          column: 'created_at',
          value: 'latest'
        },
        {
          id: 3,
          text: this.$t('blog.mostLiked'),
          orderBy: 'desc',
          column: 'thumbs_ups',
          value: 'mostLiked'
        },
        {
          id: 2,
          text: this.$t('blog.mostViewed'),
          orderBy: 'desc',
          column: 'thumbs_ups',
          value: 'mostViewed'
        },
        {
          id: 1,
          text: this.$t('blog.oldest'),
          orderBy: 'asc',
          column: 'created_at',
          value: 'oldest'
        }
      ],
      languages: [
        {
          id: 0,
          text: this.$t('blog.turkish'),
          value: 'tr'
        },
        {
          id: 1,
          text: this.$t('blog.english'),
          value: 'en'
        },
        {
          id: 2,
          text: this.$t('blog.all'),
          value: 'all'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      filters: (state) => state.blog.filters
    }),
    language: {
      set(language) {
        this.setLangFilter(language)
      },
      get() {
        return this.filters.language
      }
    },
    orderBy: {
      set(orderBy) {
        this.setOrderFilter(orderBy)
      },
      get() {
        return this.filters.orderBy
      }
    },
    search: {
      set(search) {
        this.setSearchFilter(search)
      },
      get() {
        return this.filters.search
      }
    }
  },
  methods: {
    ...mapMutations({
      setLangFilter: 'blog/SET_LANG_FILTER',
      setOrderFilter: 'blog/SET_ORDER_FILTER',
      setSearchFilter: 'blog/SET_SEARCH_FILTER'
    }),
    ...mapActions({
      fetchPosts: 'blog/fetchPosts'
    })
  }
}
</script>
