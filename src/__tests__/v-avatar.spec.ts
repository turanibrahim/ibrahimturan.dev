import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VAvatar from '@/components/atoms/v-avatar.vue';

describe('v-avatar', () => {
  it('renders with default props', () => {
    const wrapper = mount(VAvatar);
    expect(wrapper.find('.avatar').exists()).toBe(true);
    expect(wrapper.find('.w-16').exists()).toBe(true);
  });

  it('renders image when src is provided', () => {
    const wrapper = mount(VAvatar, {
      props: {
        src: 'test.jpg',
        alt: 'test avatar',
      },
    });
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('test.jpg');
    expect(img.attributes('alt')).toBe('test avatar');
  });

  it('renders text when src is not provided', () => {
    const wrapper = mount(VAvatar, {
      props: {
        text: 'AB',
      },
    });
    expect(wrapper.find('span').text()).toBe('AB');
    expect(wrapper.find('img').exists()).toBe(false);
  });

  it('applies correct size classes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const sizeClasses = ['w-8', 'w-12', 'w-16', 'w-24', 'w-64'];

    sizes.forEach((size, index) => {
      const wrapper = mount(VAvatar, {
        props: { size },
      });
      expect(wrapper.find(`.${sizeClasses[index]}`).exists()).toBe(true);
    });
  });

  it('applies online status', () => {
    const wrapper = mount(VAvatar, {
      props: {
        online: true,
      },
    });
    expect(wrapper.find('.avatar-online').exists()).toBe(true);
  });

  it('applies offline status', () => {
    const wrapper = mount(VAvatar, {
      props: {
        offline: true,
      },
    });
    expect(wrapper.find('.avatar-offline').exists()).toBe(true);
  });

  it('applies ring styling', () => {
    const wrapper = mount(VAvatar, {
      props: {
        ring: true,
      },
    });
    expect(wrapper.find('.ring-2').exists()).toBe(true);
  });

  it('applies placeholder class when no src provided', () => {
    const wrapper = mount(VAvatar, {
      props: {
        text: 'AB',
      },
    });
    expect(wrapper.find('.avatar-placeholder').exists()).toBe(true);
  });

  it('applies shape classes', () => {
    const wrapper = mount(VAvatar, {
      props: {
        shape: 'rounded-full',
      },
    });
    expect(wrapper.find('.rounded-full').exists()).toBe(true);
  });
});
