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
  }
})

export const getters = {
  //
}

export const mutations = {
  SET_POSTS(state, payload) {
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
  }
}

export const actions = {
  async fetchPosts({ commit, state }, payload) {
    const page = state.postMeta.current_page ? state.postMeta.current_page : 1
    const nextPage =
      state.postMeta.current_page < state.postMeta.last_page
        ? state.postMeta.current_page + 1
        : null
    const orderColumn = state.filters.orderBy.column
    const orderBy = state.filters.orderBy.orderBy
    const search = state.filters.search
    const lang = state.filters.language.value

    await this.$axios
      .$get(
        `/api/post?page=${
          payload.nextPage ? nextPage : page
        }&lang=${lang}&orderColumn=${orderColumn}&orderBy=${orderBy}&search=${search}`
      )
      .then((response) => {
        commit('SET_POST_META', response.meta)
        commit('SET_POSTS', response.data)
      })
  },
  async fetchPost({ commit }, payload) {
    await this.$axios.$get(`/api/post/${payload}`).then((post) => {
      return this.$axios
        .$get(`/api/post/getMdFile/${post.data.mdFile}`)
        .then((mdFile) => {
          commit('SET_MD_FILE', mdFile)
          commit('SET_POST', post.data)
        })
    })
  },
  async sendReadCount({ commit, dispatch }, payload) {
    const ipAddress = await this.$axios.$get(
      'https://api.ipify.org?format=json'
    )
    const data = {
      ipAddress: ipAddress.ip,
      postId: payload
    }
    return this.$axios.$post('/api/postView/increase', { data }).then(() => {
      commit('SET_POSTS', [])
    })
  }
}
