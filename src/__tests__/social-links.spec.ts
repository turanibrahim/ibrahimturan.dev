import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useUserStore } from '@/stores/user.store';
import SocialLinks from '@/components/molecules/social-links.vue';
import VButton from '@/components/atoms/v-button.vue';
import VIcon from '@/components/atoms/v-icon.vue';

describe('social-links', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders social link buttons', () => {
    const userStore = useUserStore();
    userStore.userInfo = {
      name: 'Test',
      surname: 'User',
      title: 'Developer',
      company: 'Company',
      companyLogo: 'logo.png',
      companyUrl: 'https://company.com',
      introduction: 'Intro',
      email: 'test@example.com',
      github: 'https://github.com/test',
      linkedin: 'https://linkedin.com/in/test',
      devto: 'https://dev.to/test',
      profileImg: 'avatar.jpg',
      location: 'Location',
      twitter: 'https://twitter.com/test',
      education: {
        university: 'University',
        department: 'CS',
        startYear: '2018',
        endYear: '2022',
        location: 'City',
      },
    };

    const wrapper = mount(SocialLinks, {
      global: {
        components: {
          VButton,
          VIcon,
        },
      },
    });

    const buttons = wrapper.findAllComponents(VButton);
    expect(buttons.length).toBe(3);
  });

  it('renders github link', () => {
    const userStore = useUserStore();
    userStore.userInfo = {
      name: 'Test',
      surname: 'User',
      title: 'Developer',
      company: 'Company',
      companyLogo: 'logo.png',
      companyUrl: 'https://company.com',
      introduction: 'Intro',
      email: 'test@example.com',
      github: 'https://github.com/test',
      linkedin: 'https://linkedin.com/in/test',
      devto: 'https://dev.to/test',
      profileImg: 'avatar.jpg',
      location: 'Location',
      twitter: 'https://twitter.com/test',
      education: {
        university: 'University',
        department: 'CS',
        startYear: '2018',
        endYear: '2022',
        location: 'City',
      },
    };

    const wrapper = mount(SocialLinks, {
      global: {
        components: {
          VButton,
          VIcon,
        },
      },
    });

    const buttons = wrapper.findAllComponents(VButton);
    expect(buttons[0]?.props('href')).toBe('https://github.com/test');
  });

  it('applies circle variant to buttons', () => {
    const userStore = useUserStore();
    userStore.userInfo = {
      name: 'Test',
      surname: 'User',
      title: 'Developer',
      company: 'Company',
      companyLogo: 'logo.png',
      companyUrl: 'https://company.com',
      introduction: 'Intro',
      email: 'test@example.com',
      github: 'https://github.com/test',
      linkedin: 'https://linkedin.com/in/test',
      devto: 'https://dev.to/test',
      profileImg: 'avatar.jpg',
      location: 'Location',
      twitter: 'https://twitter.com/test',
      education: {
        university: 'University',
        department: 'CS',
        startYear: '2018',
        endYear: '2022',
        location: 'City',
      },
    };

    const wrapper = mount(SocialLinks, {
      global: {
        components: {
          VButton,
          VIcon,
        },
      },
    });

    const buttons = wrapper.findAllComponents(VButton);
    buttons.forEach((button) => {
      expect(button.props('circle')).toBe(true);
      expect(button.props('variant')).toBe('ghost');
    });
  });

  it('renders correct icons', () => {
    const userStore = useUserStore();
    userStore.userInfo = {
      name: 'Test',
      surname: 'User',
      title: 'Developer',
      company: 'Company',
      companyLogo: 'logo.png',
      companyUrl: 'https://company.com',
      introduction: 'Intro',
      email: 'test@example.com',
      github: 'https://github.com/test',
      linkedin: 'https://linkedin.com/in/test',
      devto: 'https://dev.to/test',
      profileImg: 'avatar.jpg',
      location: 'Location',
      twitter: 'https://twitter.com/test',
      education: {
        university: 'University',
        department: 'CS',
        startYear: '2018',
        endYear: '2022',
        location: 'City',
      },
    };

    const wrapper = mount(SocialLinks, {
      global: {
        components: {
          VButton,
          VIcon,
        },
      },
    });

    const icons = wrapper.findAllComponents(VIcon);
    expect(icons[0]?.props('name')).toBe('fa-github');
    expect(icons[1]?.props('name')).toBe('fa-linkedin');
    expect(icons[2]?.props('name')).toBe('fa-dev');
  });
});
