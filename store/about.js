export const state = () => ({
  sections: []
})

export const getters = {
  //
}

export const mutations = {
  SET_SECTIONS(state, payload) {
    state.sections = payload
  }
}

export const actions = {
  async fetchSections({ commit, rootState }) {
    await this.$axios
      .$get(`/api/aboutSection/?lang=${rootState.locale}`)
      .then((response) => {
        commit('SET_SECTIONS', response.data)
      })
  }
}
