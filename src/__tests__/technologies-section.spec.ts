import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import TechnologiesSection from '@/components/organisms/technologies-section.vue';
import VTechBadge from '@/components/molecules/v-tech-badge.vue';
import VSection from '@/components/atoms/v-section.vue';
import VHeading from '@/components/atoms/v-heading.vue';

vi.mock('@/data/technologies.json', () => ({
  default: [
    {
      id: '1',
      name: 'Vue.js',
      icon: 'co-vue',
    },
    {
      id: '2',
      name: 'TypeScript',
      icon: 'co-typescript',
    },
    {
      id: '3',
      name: 'Node.js',
      icon: 'co-node-js',
    },
  ],
}));

describe('technologies-section', () => {
  it('renders technologies section', () => {
    const wrapper = mount(TechnologiesSection, {
      global: {
        components: {
          VTechBadge,
          VSection,
          VHeading,
        },
      },
    });

    expect(wrapper.findComponent(VSection).exists()).toBe(true);
  });

  it('displays Technologies heading', () => {
    const wrapper = mount(TechnologiesSection, {
      global: {
        components: {
          VTechBadge,
          VSection,
          VHeading,
        },
      },
    });

    expect(wrapper.text()).toContain('Technologies');
  });

  it('renders technology badges', () => {
    const wrapper = mount(TechnologiesSection, {
      global: {
        components: {
          VTechBadge,
          VSection,
          VHeading,
        },
      },
    });

    const badges = wrapper.findAllComponents(VTechBadge);
    expect(badges.length).toBe(3);
  });

  it('passes technology data to badges', () => {
    const wrapper = mount(TechnologiesSection, {
      global: {
        components: {
          VTechBadge,
          VSection,
          VHeading,
        },
      },
    });

    const badges = wrapper.findAllComponents(VTechBadge);
    expect(badges[0]?.props('technology')).toEqual({
      id: '1',
      name: 'Vue.js',
      icon: 'co-vue',
    });
  });

  it('renders badges in flex container', () => {
    const wrapper = mount(TechnologiesSection, {
      global: {
        components: {
          VTechBadge,
          VSection,
          VHeading,
        },
      },
    });

    const container = wrapper.find('.flex.flex-wrap');
    expect(container.exists()).toBe(true);
  });
});
