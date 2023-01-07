import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {},
    experiences: [],
  }),
  getters: {
    education() {
      return this.userInfo.education || {};
    },
  },
  actions: {
    async fetchUserInfo() {
      const { default: data } = await import('../data/userInfo.json');

      this.userInfo = data.userInfo;
    },
    async fetchUserExperience() {
      const { default: data } = await import('../data/experiences.json');

      this.experiences = data.experiences;
    },
  },
});
