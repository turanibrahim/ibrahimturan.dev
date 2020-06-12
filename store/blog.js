export const state = () => ({
  posts: [],
  post: {},
  mdFile: '',
  postMeta: '',
  filters: {
    language: {
      id: 2,
      value: 'all'
    },
    orderBy: {
      id: 0,
      orderBy: 'desc',
      column: 'created_at',
      value: 'latest'
    },
    search: ''
  },
  filteredPostsLoading: false
})

export const getters = {
  //
}

export const mutations = {
  SET_POSTS(state, payload) {
    state.posts = payload
  },
  ADD_POSTS(state, payload) {
    state.posts = state.posts.concat(payload)
  },
  SET_POST(state, payload) {
    state.post = payload
  },
  SET_POST_META(state, payload) {
    state.postMeta = payload
  },
  SET_MD_FILE(state, payload) {
    state.mdFile = payload
  },
  SET_LANG_FILTER(state, payload) {
    state.filters.language = payload
  },
  SET_ORDER_FILTER(state, payload) {
    state.filters.orderBy = payload
  },
  SET_SEARCH_FILTER(state, payload) {
    state.filters.search = payload
  },
  SET_POSTS_LOADING(state, payload) {
    state.postsLoading = payload
  },
  SET_FILTERED_POSTS_LOADING(state, payload) {
    state.filteredPostsLoading = payload
  }
}

export const actions = {
  async fetchPosts({ commit, state }) {
    commit('SET_FILTERED_POSTS_LOADING', true)
    await this.$axios
      .$get(
        `/api/post?page=1&lang=${state.filters.language.value}&orderColumn=${state.filters.orderBy.column}&orderBy=${state.filters.orderBy.orderBy}&search=${state.filters.search}`
      )
      .then((response) => {
        commit('SET_POST_META', response.meta)
        commit('SET_POSTS', response.data)
      })
    commit('SET_FILTERED_POSTS_LOADING', false)
  },
  addPosts({ commit, state }) {
    if (state.postMeta.current_page < state.postMeta.last_page) {
      commit('SET_POSTS_LOADING', true)
      this.$axios
        .$get(
          `/api/post?page=${state.postMeta.current_page + 1}&orderColumn=${
            state.filters.orderBy.column
          }&orderBy=${state.filters.orderBy.orderBy}&search=${
            state.filters.search
          }`
        )
        .then((response) => {
          commit('SET_POST_META', response.meta)
          commit('ADD_POSTS', response.data)
        })
      commit('SET_POSTS_LOADING', false)
    }
  },
  async fetchPost({ commit }, payload) {
    await this.$axios.$get(`/api/post/${payload}`).then((post, err) => {
      return this.$axios
        .$get(`/api/post/getMdFile/${post.data.mdFile}`)
        .then((mdFile) => {
          commit('SET_MD_FILE', mdFile)
          commit('SET_POST', post.data)
        })
    })
  },
  sendReadCount({state}, payload) {
    return this.$axios.$get(`/api/post/${payload}`).then((post, err) => {
      //
    })
  }
}
