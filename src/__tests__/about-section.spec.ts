import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useUserStore } from '@/stores/user.store';
import AboutSection from '@/components/organisms/about-section.vue';
import VSection from '@/components/atoms/v-section.vue';
import VHeading from '@/components/atoms/v-heading.vue';

describe('about-section', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders about section', () => {
    const userStore = useUserStore();
    userStore.userInfo = {
      name: 'Test',
      surname: 'User',
      title: 'Developer',
      company: 'Test Company',
      companyLogo: 'logo.png',
      companyUrl: 'https://company.com',
      introduction: 'Test introduction',
      email: 'test@example.com',
      github: 'https://github.com/test',
      linkedin: 'https://linkedin.com/in/test',
      devto: 'https://dev.to/test',
      profileImg: 'avatar.jpg',
      location: 'Test Location',
      twitter: 'https://twitter.com/test',
      education: {
        university: 'Test University',
        department: 'Computer Science',
        startYear: '2018',
        endYear: '2022',
        location: 'Test City',
      },
    };

    const wrapper = mount(AboutSection, {
      global: {
        components: {
          VSection,
          VHeading,
        },
      },
    });

    expect(wrapper.findComponent(VSection).exists()).toBe(true);
  });

  it('displays About Me heading', () => {
    const wrapper = mount(AboutSection, {
      global: {
        components: {
          VSection,
          VHeading,
        },
      },
    });

    expect(wrapper.text()).toContain('About Me');
  });

  it('displays user introduction', () => {
    const userStore = useUserStore();
    userStore.userInfo = {
      name: 'Test',
      surname: 'User',
      title: 'Developer',
      company: 'Test Company',
      companyLogo: 'logo.png',
      companyUrl: 'https://company.com',
      introduction: 'Test introduction text',
      email: 'test@example.com',
      github: 'https://github.com/test',
      linkedin: 'https://linkedin.com/in/test',
      devto: 'https://dev.to/test',
      profileImg: 'avatar.jpg',
      location: 'Test Location',
      twitter: 'https://twitter.com/test',
      education: {
        university: 'Test University',
        department: 'Computer Science',
        startYear: '2018',
        endYear: '2022',
        location: 'Test City',
      },
    };

    const wrapper = mount(AboutSection, {
      global: {
        components: {
          VSection,
          VHeading,
        },
      },
    });

    expect(wrapper.text()).toContain('Test introduction text');
  });

  it('displays current position information', () => {
    const userStore = useUserStore();
    userStore.userInfo = {
      name: 'Test',
      surname: 'User',
      title: 'Senior Developer',
      company: 'Test Company',
      companyLogo: 'logo.png',
      companyUrl: 'https://company.com',
      introduction: 'Test introduction',
      email: 'test@example.com',
      github: 'https://github.com/test',
      linkedin: 'https://linkedin.com/in/test',
      devto: 'https://dev.to/test',
      profileImg: 'avatar.jpg',
      location: 'Remote',
      twitter: 'https://twitter.com/test',
      education: {
        university: 'Test University',
        department: 'Computer Science',
        startYear: '2018',
        endYear: '2022',
        location: 'Test City',
      },
    };

    const wrapper = mount(AboutSection, {
      global: {
        components: {
          VSection,
          VHeading,
        },
      },
    });

    expect(wrapper.text()).toContain('Senior Developer');
    expect(wrapper.text()).toContain('Remote');
  });

  it('displays education information', () => {
    const userStore = useUserStore();
    userStore.userInfo = {
      name: 'Test',
      surname: 'User',
      title: 'Developer',
      company: 'Test Company',
      companyLogo: 'logo.png',
      companyUrl: 'https://company.com',
      introduction: 'Test introduction',
      email: 'test@example.com',
      github: 'https://github.com/test',
      linkedin: 'https://linkedin.com/in/test',
      devto: 'https://dev.to/test',
      profileImg: 'avatar.jpg',
      location: 'Test Location',
      twitter: 'https://twitter.com/test',
      education: {
        university: 'Test University',
        department: 'Computer Science',
        startYear: '2018',
        endYear: '2022',
        location: 'Test City',
      },
    };

    const wrapper = mount(AboutSection, {
      global: {
        components: {
          VSection,
          VHeading,
        },
      },
    });

    expect(wrapper.text()).toContain('Test University');
    expect(wrapper.text()).toContain('Computer Science');
    expect(wrapper.text()).toContain('2018 - 2022');
  });
});
