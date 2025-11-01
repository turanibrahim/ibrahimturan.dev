import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VCompanyLogo from '@/components/atoms/v-company-logo.vue';

describe('v-company-logo', () => {
  it('renders with required props', () => {
    const wrapper = mount(VCompanyLogo, {
      props: {
        src: 'logo.png',
        alt: 'Company Logo',
      },
    });
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('logo.png');
    expect(img.attributes('alt')).toBe('Company Logo');
  });

  it('applies default size classes', () => {
    const wrapper = mount(VCompanyLogo, {
      props: {
        src: 'logo.png',
        alt: 'Company Logo',
      },
    });
    expect(wrapper.find('.w-16').exists()).toBe(true);
    expect(wrapper.find('.h-16').exists()).toBe(true);
  });

  it('applies size classes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    const sizeClasses = [
      ['w-12', 'h-12'],
      ['w-16', 'h-16'],
      ['w-20', 'h-20'],
    ];

    sizes.forEach((size, index) => {
      const wrapper = mount(VCompanyLogo, {
        props: {
          src: 'logo.png',
          alt: 'Company Logo',
          size,
        },
      });
      const classes = sizeClasses[index];
      if (classes) {
        expect(wrapper.find(`.${classes[0]}`).exists()).toBe(true);
        expect(wrapper.find(`.${classes[1]}`).exists()).toBe(true);
      }
    });
  });

  it('applies rounded classes', () => {
    const rounded = ['sm', 'md', 'lg', 'full'] as const;
    const roundedClasses = ['rounded', 'rounded-md', 'rounded-lg', 'rounded-full'];

    rounded.forEach((roundedValue, index) => {
      const wrapper = mount(VCompanyLogo, {
        props: {
          src: 'logo.png',
          alt: 'Company Logo',
          rounded: roundedValue,
        },
      });
      expect(wrapper.find(`.${roundedClasses[index]}`).exists()).toBe(true);
    });
  });

  it('applies background when background is true', () => {
    const wrapper = mount(VCompanyLogo, {
      props: {
        src: 'logo.png',
        alt: 'Company Logo',
        background: true,
      },
    });
    expect(wrapper.find('.bg-white').exists()).toBe(true);
    expect(wrapper.find('.p-2').exists()).toBe(true);
  });

  it('does not apply background when background is false', () => {
    const wrapper = mount(VCompanyLogo, {
      props: {
        src: 'logo.png',
        alt: 'Company Logo',
        background: false,
      },
    });
    expect(wrapper.find('.bg-white').exists()).toBe(false);
  });

  it('applies object-contain class', () => {
    const wrapper = mount(VCompanyLogo, {
      props: {
        src: 'logo.png',
        alt: 'Company Logo',
      },
    });
    expect(wrapper.find('.object-contain').exists()).toBe(true);
  });
});
