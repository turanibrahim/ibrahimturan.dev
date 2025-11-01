import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import FooterSection from '@/components/organisms/footer-section.vue';
import SocialLinks from '@/components/molecules/social-links.vue';

describe('footer-section', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders footer element', () => {
    const wrapper = mount(FooterSection, {
      global: {
        components: {
          SocialLinks,
        },
      },
    });

    expect(wrapper.find('footer').exists()).toBe(true);
  });

  it('displays copyright text', () => {
    const wrapper = mount(FooterSection, {
      global: {
        components: {
          SocialLinks,
        },
      },
    });

    expect(wrapper.text()).toContain('Ibrahim Turan');
    expect(wrapper.text()).toContain('All rights reserved');
  });

  it('displays current year in copyright', () => {
    const currentYear = new Date().getFullYear();
    const wrapper = mount(FooterSection, {
      global: {
        components: {
          SocialLinks,
        },
      },
    });

    expect(wrapper.text()).toContain(currentYear.toString());
  });

  it('renders social links component', () => {
    const wrapper = mount(FooterSection, {
      global: {
        components: {
          SocialLinks,
        },
      },
    });

    expect(wrapper.findComponent(SocialLinks).exists()).toBe(true);
  });

  it('applies bg-base-200 class to footer', () => {
    const wrapper = mount(FooterSection, {
      global: {
        components: {
          SocialLinks,
        },
      },
    });

    expect(wrapper.find('footer').classes()).toContain('bg-base-200');
  });
});
