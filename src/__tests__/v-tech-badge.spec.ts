import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VTechBadge from '@/components/molecules/v-tech-badge.vue';
import VBadge from '@/components/atoms/v-badge.vue';
import VIcon from '@/components/atoms/v-icon.vue';
import type { Technology } from '@/types';

describe('v-tech-badge', () => {
  const mockTechnology: Technology = {
    id: '1',
    name: 'Vue.js',
    icon: 'co-vue',
  };

  it('renders technology badge', () => {
    const wrapper = mount(VTechBadge, {
      props: {
        technology: mockTechnology,
      },
      global: {
        components: {
          VBadge,
          VIcon,
        },
      },
    });
    expect(wrapper.findComponent(VBadge).exists()).toBe(true);
  });

  it('displays technology name', () => {
    const wrapper = mount(VTechBadge, {
      props: {
        technology: mockTechnology,
      },
      global: {
        components: {
          VBadge,
          VIcon,
        },
      },
    });
    expect(wrapper.text()).toContain('Vue.js');
  });

  it('renders technology icon', () => {
    const wrapper = mount(VTechBadge, {
      props: {
        technology: mockTechnology,
      },
      global: {
        components: {
          VBadge,
          VIcon,
        },
      },
    });
    const icon = wrapper.findComponent(VIcon);
    expect(icon.exists()).toBe(true);
    expect(icon.props('name')).toBe('co-vue');
  });

  it('applies dash variant to badge', () => {
    const wrapper = mount(VTechBadge, {
      props: {
        technology: mockTechnology,
      },
      global: {
        components: {
          VBadge,
          VIcon,
        },
      },
    });
    expect(wrapper.findComponent(VBadge).props('variant')).toBe('dash');
  });

  it('applies secondary color to badge', () => {
    const wrapper = mount(VTechBadge, {
      props: {
        technology: mockTechnology,
      },
      global: {
        components: {
          VBadge,
          VIcon,
        },
      },
    });
    expect(wrapper.findComponent(VBadge).props('color')).toBe('secondary');
  });
});
