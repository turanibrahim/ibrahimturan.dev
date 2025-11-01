import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VSection from '@/components/atoms/v-section.vue';

describe('v-section', () => {
  it('renders with default props', () => {
    const wrapper = mount(VSection);
    expect(wrapper.find('section').exists()).toBe(true);
    expect(wrapper.find('.container').exists()).toBe(true);
  });

  it('renders slot content', () => {
    const wrapper = mount(VSection, {
      slots: {
        default: '<div>Section Content</div>',
      },
    });
    expect(wrapper.text()).toContain('Section Content');
  });

  it('applies padding classes', () => {
    const paddings = ['sm', 'md', 'lg', 'xl'] as const;
    const paddingClasses = ['py-6', 'py-10', 'py-16', 'py-24'];

    paddings.forEach((paddingY, index) => {
      const wrapper = mount(VSection, {
        props: { paddingY },
      });
      expect(wrapper.find(`.${paddingClasses[index]}`).exists()).toBe(true);
    });
  });

  it('applies background classes', () => {
    const backgrounds = ['base-100', 'base-200', 'base-300'] as const;

    backgrounds.forEach((background) => {
      const wrapper = mount(VSection, {
        props: { background },
      });
      expect(wrapper.find(`.bg-${background}`).exists()).toBe(true);
    });
  });

  it('does not render container when container is false', () => {
    const wrapper = mount(VSection, {
      props: {
        container: false,
      },
      slots: {
        default: '<div>Content</div>',
      },
    });
    expect(wrapper.find('.container').exists()).toBe(false);
    expect(wrapper.text()).toContain('Content');
  });

  it('applies relative class', () => {
    const wrapper = mount(VSection);
    expect(wrapper.find('.relative').exists()).toBe(true);
  });

  it('renders content inside container by default', () => {
    const wrapper = mount(VSection, {
      slots: {
        default: '<div class="test-content">Test</div>',
      },
    });
    expect(wrapper.find('.container .test-content').exists()).toBe(true);
  });
});
