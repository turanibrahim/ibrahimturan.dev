export const state = () => ({
  locales: ['en', 'tr'],
  locale: 'en'
})

export const getters = {
  //
}

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}

export const actions = {
  //
}
