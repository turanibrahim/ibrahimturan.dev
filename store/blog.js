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
  },
  INCREASE_POST_VIEW(state) {
    state.post.viewCount++
  },
  INCREASE_POST_VOTE(state, payload) {
    if (payload === 1) {
      state.post.thumbsUps++
    }
    if (payload === 2) {
      state.post.thumbsDowns++
    }
    if (payload === 3) {
      state.post.hearts++
    }
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
        `/api/posts?page=${
          payload.nextPage ? nextPage : page
        }&lang=${lang}&orderColumn=${orderColumn}&orderBy=${orderBy}&search=${search}`
      )
      .then((response) => {
        commit('SET_POST_META', response.meta)
        commit('SET_POSTS', response.data)
      })
  },
  async fetchPost({ commit }, payload) {
    await this.$axios.$get(`/api/posts/${payload}`).then((post) => {
      return this.$axios
        .$get(`api/posts/mdfile/${post.data.mdFile}`)
        .then((mdFile) => {
          commit('SET_MD_FILE', mdFile)
          commit('SET_POST', post.data)
        })
    })
  },
  async sendPostView({ commit }, payload) {
    const ipAddress = await this.$axios.$get(
      'https://api.ipify.org?format=json'
    )
    const data = {
      ipAddress: ipAddress.ip,
      postId: payload
    }
    return this.$axios.$post(`/api/posts/${payload}/views`, data).then(() => {
      commit('SET_POSTS', [])
      commit('INCREASE_POST_VIEW')
    })
  },
  async sendPostVote({ commit }, payload) {
    const ipAddress = await this.$axios.$get(
      'https://api.ipify.org?format=json'
    )
    const data = {
      ipAddress: ipAddress.ip,
      postId: payload.postId,
      voteType: payload.voteType
    }
    return await this.$axios
      .$post(`/api/posts/${payload.postId}/votes`, data)
      .then((response) => {
        if (response.data.updated) {
          commit('SET_POSTS', [])
          commit('INCREASE_POST_VOTE', payload.voteType)
        }
      })
  }
}
