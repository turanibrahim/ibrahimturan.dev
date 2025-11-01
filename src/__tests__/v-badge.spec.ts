import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VBadge from '@/components/atoms/v-badge.vue';

describe('v-badge', () => {
  it('renders with default props', () => {
    const wrapper = mount(VBadge, {
      slots: {
        default: 'Badge',
      },
    });
    expect(wrapper.find('.badge').exists()).toBe(true);
    expect(wrapper.text()).toBe('Badge');
  });

  it('renders with custom tag', () => {
    const wrapper = mount(VBadge, {
      props: {
        tag: 'div',
      },
      slots: {
        default: 'Badge',
      },
    });
    expect(wrapper.find('div.badge').exists()).toBe(true);
  });

  it('applies color classes', () => {
    const colors = ['primary', 'secondary', 'accent', 'success', 'warning', 'error'] as const;

    colors.forEach((color) => {
      const wrapper = mount(VBadge, {
        props: { color },
        slots: {
          default: 'Badge',
        },
      });
      expect(wrapper.find(`.badge-${color}`).exists()).toBe(true);
    });
  });

  it('applies variant classes', () => {
    const variants = ['outline', 'dash', 'soft', 'ghost'] as const;

    variants.forEach((variant) => {
      const wrapper = mount(VBadge, {
        props: { variant },
        slots: {
          default: 'Badge',
        },
      });
      expect(wrapper.find(`.badge-${variant}`).exists()).toBe(true);
    });
  });

  it('applies size classes', () => {
    const sizes = ['xs', 'sm', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      const wrapper = mount(VBadge, {
        props: { size },
        slots: {
          default: 'Badge',
        },
      });
      expect(wrapper.find(`.badge-${size}`).exists()).toBe(true);
    });
  });

  it('does not apply size class for md size', () => {
    const wrapper = mount(VBadge, {
      props: {
        size: 'md',
      },
      slots: {
        default: 'Badge',
      },
    });
    expect(wrapper.find('.badge-md').exists()).toBe(false);
    expect(wrapper.find('.badge').exists()).toBe(true);
  });
});
