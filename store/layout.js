export const state = () => ({
  pageTitle: '',
  menuItems: [
    {
      id: 0,
      title: 'About',
      icon: 'mdi-file-document-edit-outline',
      link: '/about',
      color: ''
    },
    {
      id: 1,
      title: 'Experience',
      icon: 'mdi-file-code-outline',
      link: '/experience',
      color: ''
    },
    {
      id: 4,
      title: 'Contact',
      icon: 'mdi-pencil-outline ',
      link: '/contact',
      color: ''
    },
    {
      id: 5,
      title: 'Blog',
      icon: 'mdi-post-outline',
      link: '/blog',
      color: ''
    }
  ],
  menuSocialMedia: [
    {
      id: 0,
      icon: 'mdi-instagram',
      link: 'https://www.instagram.com/_ibrahimturan',
      color: '#E4405F'
    },
    {
      id: 1,
      icon: 'mdi-twitter',
      link: 'https://www.twitter.com/_ibrahimturan',
      color: '#1DA1F2'
    },
    {
      id: 2,
      icon: 'mdi-github',
      link: 'https://www.github.com/turanibrahim',
      color: ''
    },
    {
      id: 3,
      icon: 'mdi-linkedin',
      link: 'https://www.linkedin.com/in/ibrahimturann/',
      color: '#0077B5'
    }
  ]
})

export const getters = {
  //
}

export const mutations = {
  setPageTitle(state, payload) {
    state.pageTitle = payload.title
  }
}

export const actions = {
  //
}
