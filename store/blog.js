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
  postsLoading: false,
  newCommentBottomSheet: false,
  commentsLoading: false,
  comments: [],
  commentsMeta: {
    current_page: 0
  },
  commentId: '',
  commentSending: false,
  showSuccessMessage: false
})

export const getters = {
  getCommentById: (state) => {
    return state.comments
      ? state.comments.find((comment) => comment.id === state.commentId)
      : null
  }
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
  },
  RESET_POSTS(state) {
    state.posts = []
  },
  SET_POSTS_LOADING(state, payload) {
    state.postsLoading = payload
  },
  SET_NEW_COMMENT_BOTTOM_SHEET(state, payload) {
    state.newCommentBottomSheet = payload
  },
  SET_COMMENTS(state, payload) {
    state.comments = state.comments.concat(payload)
  },
  SET_COMMENTS_META(state, payload) {
    state.commentsMeta = payload
  },
  SET_COMMENTS_LOADING(state, payload) {
    state.commentsLoading = payload
  },
  SET_COMMENT_ID(state, payload) {
    state.commentId = payload
  },
  SET_COMMENT_SENDING(state, payload) {
    state.commentSending = payload
  },
  SET_SUCCESS_MESSAGE(state, payload) {
    state.showSuccessMessage = payload
  },
  RESET_COMMENTS(state) {
    state.comments = []
    state.commentsMeta = ''
  }
}

export const actions = {
  async fetchPosts({ commit, state }, payload) {
    let page = 1
    const orderColumn = state.filters.orderBy.column
    const orderBy = state.filters.orderBy.orderBy
    const search = state.filters.search
    const lang = state.filters.language.value

    if (state.postMeta.current_page) {
      page = state.postMeta.current_page
    }
    if (
      payload.nextPage &&
      state.postMeta.current_page < state.postMeta.last_page
    ) {
      page = state.postMeta.current_page + 1
    }
    if (payload.filter) {
      page = 1
      commit('RESET_POSTS')
    }
    commit('SET_POSTS_LOADING', true)
    return await this.$axios
      .$get(
        `/api/posts?page=${page}&lang=${lang}&orderColumn=${orderColumn}&orderBy=${orderBy}&search=${search}`
      )
      .then((response) => {
        commit('SET_POST_META', response.meta)
        commit('SET_POSTS', response.data)
        commit('SET_POSTS_LOADING', false)
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
    return this.$axios
      .$post(`/api/posts/${payload}/views`, data)
      .then((response) => {
        if (response.updated) {
          commit('SET_POSTS', [])
          commit('INCREASE_POST_VOTE', payload.voteType)
        }
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
        if (response.updated) {
          commit('SET_POSTS', [])
          commit('INCREASE_POST_VOTE', payload.voteType)
        }
      })
  },
  async fetchComments({ commit, state }, payload) {
    commit('SET_COMMENTS_LOADING', true)
    return await this.$axios
      .$get(
        `/api/posts/${state.post.id}/comments?page=${state.commentsMeta
          .current_page + 1}`
      )
      .then((comments) => {
        commit('SET_COMMENTS_META', comments.meta)
        commit('SET_COMMENTS', comments.data)
        commit('SET_COMMENTS_LOADING', false)
      })
  },
  async sendComment({ commit, state }, payload) {
    commit('SET_COMMENT_SENDING', true)
    return await new Promise((resolve, reject) => {
      this.$axios
        .$post(`/api/posts/${state.post.id}/comments/`, payload)
        .then((response) => {
          if (response.data) {
            commit('SET_NEW_COMMENT_BOTTOM_SHEET', false)
            commit('SET_COMMENT_SENDING', false)
            resolve({ success: true })
          }
        })
    })
  }
}
