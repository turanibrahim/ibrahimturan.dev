export const state = () => ({
  sections: [],
  loading: false
})

export const getters = {
  //
}

export const mutations = {
  SET_SECTIONS(state, payload) {
    state.sections = payload
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  }
}

export const actions = {
  async fetchSections({ commit, rootState }) {
    commit('SET_LOADING', true)
    await this.$axios
      .$get(`/api/aboutSection/?lang=${rootState.locale}`)
      .then((response) => {
        commit('SET_SECTIONS', response.data)
        commit('SET_LOADING', false)
      })
  }
}
