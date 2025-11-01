import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useUserStore } from '@/stores/user.store';
import HeroSection from '@/components/organisms/hero-section.vue';
import VAvatar from '@/components/atoms/v-avatar.vue';
import VCard from '@/components/atoms/v-card.vue';
import VHeading from '@/components/atoms/v-heading.vue';
import SocialLinks from '@/components/molecules/social-links.vue';

describe('hero-section', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders hero section', () => {
    const wrapper = mount(HeroSection, {
      global: {
        components: {
          VAvatar,
          VCard,
          VHeading,
          SocialLinks,
        },
        stubs: {
          VPrismBackground: true,
          VBlurText: {
            template: '<span><slot></slot></span>',
            props: ['text'],
          },
        },
      },
    });

    expect(wrapper.find('section').exists()).toBe(true);
  });

  it('displays user avatar', () => {
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
      profileImg: 'profile.jpg',
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

    const wrapper = mount(HeroSection, {
      global: {
        components: {
          VAvatar,
          VCard,
          VHeading,
          SocialLinks,
        },
        stubs: {
          VPrismBackground: true,
          VBlurText: {
            template: '<span><slot></slot></span>',
            props: ['text'],
          },
        },
      },
    });

    const avatar = wrapper.findComponent(VAvatar);
    expect(avatar.exists()).toBe(true);
    expect(avatar.props('src')).toBe('profile.jpg');
  });

  it('displays user title', () => {
    const userStore = useUserStore();
    userStore.userInfo = {
      name: 'Test',
      surname: 'User',
      title: 'Senior Developer',
      company: 'Company',
      companyLogo: 'logo.png',
      companyUrl: 'https://company.com',
      introduction: 'Intro',
      email: 'test@example.com',
      github: 'https://github.com/test',
      linkedin: 'https://linkedin.com/in/test',
      devto: 'https://dev.to/test',
      profileImg: 'profile.jpg',
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

    const wrapper = mount(HeroSection, {
      global: {
        components: {
          VAvatar,
          VCard,
          VHeading,
          SocialLinks,
        },
        stubs: {
          VPrismBackground: true,
          VBlurText: {
            template: '<span><slot></slot></span>',
            props: ['text'],
          },
        },
      },
    });

    expect(wrapper.text()).toContain('Senior Developer');
  });

  it('renders social links', () => {
    const wrapper = mount(HeroSection, {
      global: {
        components: {
          VAvatar,
          VCard,
          VHeading,
          SocialLinks,
        },
        stubs: {
          VPrismBackground: true,
          VBlurText: {
            template: '<span><slot></slot></span>',
            props: ['text'],
          },
        },
      },
    });

    expect(wrapper.findComponent(SocialLinks).exists()).toBe(true);
  });

  it('applies relative positioning and overflow-hidden', () => {
    const wrapper = mount(HeroSection, {
      global: {
        components: {
          VAvatar,
          VCard,
          VHeading,
          SocialLinks,
        },
        stubs: {
          VPrismBackground: true,
          VBlurText: {
            template: '<span><slot></slot></span>',
            props: ['text'],
          },
        },
      },
    });

    const section = wrapper.find('section');
    expect(section.classes()).toContain('relative');
    expect(section.classes()).toContain('overflow-hidden');
  });

  it('renders card component', () => {
    const wrapper = mount(HeroSection, {
      global: {
        components: {
          VAvatar,
          VCard,
          VHeading,
          SocialLinks,
        },
        stubs: {
          VPrismBackground: true,
          VBlurText: {
            template: '<span><slot></slot></span>',
            props: ['text'],
          },
        },
      },
    });

    expect(wrapper.findComponent(VCard).exists()).toBe(true);
  });
});
