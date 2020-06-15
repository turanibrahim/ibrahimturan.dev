export const state = () => ({
  experiences: []
})

export const getters = {
  //
}

export const mutations = {
  SET_EXPERIENCES(state, payload) {
    state.experiences = payload
  }
}

export const actions = {
  async fetchExperiences({ commit, rootState }) {
    await this.$axios
      .$get(`/api/experiences/?lang=${rootState.locale}`)
      .then((response) => {
        commit('SET_EXPERIENCES', response.data)
      })
  }
}
