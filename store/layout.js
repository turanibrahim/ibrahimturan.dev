export const state = () => ({
  pageTitle: '',
  menuItems: [
    {
      id: 0,
      title: 'links.about',
      icon: 'mdi-file-document-edit-outline',
      link: 'about',
      color: ''
    },
    {
      id: 1,
      title: 'links.experience',
      icon: 'mdi-file-code-outline',
      link: 'experience',
      color: ''
    },
    {
      id: 4,
      title: 'links.contact',
      icon: 'mdi-pencil-outline ',
      link: 'contact',
      color: ''
    },
    {
      id: 5,
      title: 'links.blog',
      icon: 'mdi-post-outline',
      link: 'blog',
      color: ''
    }
  ],
  socialMedias: [],
  loading: false,
  metaData: {
    title: 'İbrahim Turan',
    name: '',
    description: '',
    hid: ''
  },
  isMiniVariant: false,
  showSideBar: false
})

export const getters = {
  //
}

export const mutations = {
  setPageTitle(state, payload) {
    state.pageTitle = payload.title
  },
  SET_SOCIAL_MEDIAS(state, payload) {
    state.socialMedias = payload
  },
  SET_LOADING(state, payload) {
    state.loading = payload
  },
  SET_META_DATA(state, payload) {
    state.metaData = payload
  },
  SET_MINIVARIANT(state, payload) {
    state.isMiniVariant = payload
  },
  SET_SIDEBAR_VISIBILITY(state, payload) {
    state.showSideBar = payload
  }
}

export const actions = {
  async fetchSocialMedias({ commit }) {
    await this.$axios
      .$get('/api/socialMedia')
      .then((response) => {
        commit('SET_SOCIAL_MEDIAS', response.data)
      })
      .catch((err) => {
        commit('SET_SOCIAL_MEDIAS', err)
      })
  },
  sendContactForm({ commit }, payload) {
    return this.$axios.$post('/api/contactForm/', payload)
  },
  async fetchMetaData({ commit }, payload) {
    await this.$axios
      .$get(`/api/meta/${payload.path}/${payload.lang}`)
      .then((response) => {
        commit('SET_META_DATA', response.data)
      })
  }
}
