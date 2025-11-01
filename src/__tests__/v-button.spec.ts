import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VButton from '@/components/atoms/v-button.vue';

describe('v-button', () => {
  it('renders with default props', () => {
    const wrapper = mount(VButton, {
      slots: {
        default: 'Click me',
      },
    });
    expect(wrapper.find('.btn').exists()).toBe(true);
    expect(wrapper.text()).toBe('Click me');
  });

  it('renders as button by default', () => {
    const wrapper = mount(VButton);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('applies color classes', () => {
    const colors = ['primary', 'secondary', 'accent', 'success', 'warning', 'error'] as const;

    colors.forEach((color) => {
      const wrapper = mount(VButton, {
        props: { color },
      });
      expect(wrapper.find(`.btn-${color}`).exists()).toBe(true);
    });
  });

  it('applies variant classes', () => {
    const variants = ['outline', 'dash', 'soft', 'ghost', 'link'] as const;

    variants.forEach((variant) => {
      const wrapper = mount(VButton, {
        props: { variant },
      });
      expect(wrapper.find(`.btn-${variant}`).exists()).toBe(true);
    });
  });

  it('applies size classes', () => {
    const sizes = ['xs', 'sm', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      const wrapper = mount(VButton, {
        props: { size },
      });
      expect(wrapper.find(`.btn-${size}`).exists()).toBe(true);
    });
  });

  it('applies wide class', () => {
    const wrapper = mount(VButton, {
      props: {
        wide: true,
      },
    });
    expect(wrapper.find('.btn-wide').exists()).toBe(true);
  });

  it('applies block class', () => {
    const wrapper = mount(VButton, {
      props: {
        block: true,
      },
    });
    expect(wrapper.find('.btn-block').exists()).toBe(true);
  });

  it('applies square class', () => {
    const wrapper = mount(VButton, {
      props: {
        square: true,
      },
    });
    expect(wrapper.find('.btn-square').exists()).toBe(true);
  });

  it('applies circle class', () => {
    const wrapper = mount(VButton, {
      props: {
        circle: true,
      },
    });
    expect(wrapper.find('.btn-circle').exists()).toBe(true);
  });

  it('applies disabled class when disabled', () => {
    const wrapper = mount(VButton, {
      props: {
        disabled: true,
      },
    });
    expect(wrapper.find('.btn-disabled').exists()).toBe(true);
  });

  it('shows loading spinner when loading', () => {
    const wrapper = mount(VButton, {
      props: {
        loading: true,
      },
      slots: {
        default: 'Click me',
      },
    });
    expect(wrapper.find('.loading-spinner').exists()).toBe(true);
    expect(wrapper.text()).not.toContain('Click me');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(VButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(VButton, {
      props: {
        disabled: true,
      },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('does not emit click when loading', async () => {
    const wrapper = mount(VButton, {
      props: {
        loading: true,
      },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('renders as anchor when href is provided', () => {
    const wrapper = mount(VButton, {
      props: {
        href: 'https://example.com',
      },
    });
    expect(wrapper.find('a').exists()).toBe(true);
    expect(wrapper.attributes('href')).toBe('https://example.com');
  });
});
