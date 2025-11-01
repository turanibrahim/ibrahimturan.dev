import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { UserInfo } from '@/types/user';
import type { Experience } from '@/types/experience';
import userInfoData from '@/data/userInfo.json';
import experiencesData from '@/data/experiences.json';

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo>(userInfoData.userInfo);
  const experiences = ref<Experience[]>(experiencesData.experiences);

  const education = computed(() => userInfo.value.education || {});

  return {
    userInfo,
    experiences,
    education,
  };
});
