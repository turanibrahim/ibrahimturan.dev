import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VHeading from '@/components/atoms/v-heading.vue';

describe('v-heading', () => {
  it('renders with default props', () => {
    const wrapper = mount(VHeading, {
      slots: {
        default: 'Heading',
      },
    });
    expect(wrapper.find('h2').exists()).toBe(true);
    expect(wrapper.text()).toBe('Heading');
  });

  it('renders correct heading level', () => {
    const levels = ['1', '2', '3', '4', '5', '6'] as const;

    levels.forEach((level) => {
      const wrapper = mount(VHeading, {
        props: { level },
        slots: {
          default: 'Heading',
        },
      });
      expect(wrapper.find(`h${level}`).exists()).toBe(true);
    });
  });

  it('applies correct size classes', () => {
    const levels = ['1', '2', '3', '4', '5', '6'] as const;
    const sizeClasses = ['text-5xl', 'text-4xl', 'text-3xl', 'text-2xl', 'text-xl', 'text-lg'];

    levels.forEach((level, index) => {
      const wrapper = mount(VHeading, {
        props: { level },
        slots: {
          default: 'Heading',
        },
      });
      expect(wrapper.find(`.${sizeClasses[index]}`).exists()).toBe(true);
    });
  });

  it('applies weight classes', () => {
    const weights = ['normal', 'medium', 'semibold', 'bold', 'black'] as const;
    const weightClasses = [
      'font-normal',
      'font-medium',
      'font-semibold',
      'font-bold',
      'font-black',
    ];

    weights.forEach((weight, index) => {
      const wrapper = mount(VHeading, {
        props: { weight },
        slots: {
          default: 'Heading',
        },
      });
      expect(wrapper.find(`.${weightClasses[index]}`).exists()).toBe(true);
    });
  });

  it('applies alignment classes', () => {
    const aligns = ['left', 'center', 'right'] as const;
    const alignClasses = ['text-left', 'text-center', 'text-right'];

    aligns.forEach((align, index) => {
      const wrapper = mount(VHeading, {
        props: { align },
        slots: {
          default: 'Heading',
        },
      });
      expect(wrapper.find(`.${alignClasses[index]}`).exists()).toBe(true);
    });
  });

  it('renders custom tag when provided', () => {
    const wrapper = mount(VHeading, {
      props: {
        level: '3',
        tag: 'h1',
      },
      slots: {
        default: 'Heading',
      },
    });
    expect(wrapper.find('h1').exists()).toBe(true);
    expect(wrapper.find('h3').exists()).toBe(false);
  });

  it('renders slot content', () => {
    const wrapper = mount(VHeading, {
      slots: {
        default: '<span>Custom Content</span>',
      },
    });
    expect(wrapper.html()).toContain('<span>Custom Content</span>');
  });
});
