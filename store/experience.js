export const state = () => ({
  experiences: [],
  loading: false
})

export const getters = {
  //
}

export const mutations = {
  SET_EXPERIENCES(state, payload) {
    state.experiences = payload
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  }
}

export const actions = {
  async fetchExperiences({ commit, rootState }) {
    commit('SET_LOADING', true)
    await this.$axios
      .$get(`/api/experience/?lang=${rootState.locale}`)
      .then((response) => {
        commit('SET_EXPERIENCES', response.data)
        commit('SET_LOADING', false)
      })
      .catch((err) => {
        commit('SET_EXPERIENCES', err)
      })
  }
}
