import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VIcon from '@/components/atoms/v-icon.vue';
import { OhVueIcon } from 'oh-vue-icons';

describe('v-icon', () => {
  it('renders OhVueIcon component', () => {
    const wrapper = mount(VIcon, {
      props: {
        name: 'bi-alarm',
      },
      global: {
        components: {
          OhVueIcon,
        },
      },
    });
    expect(wrapper.findComponent(OhVueIcon).exists()).toBe(true);
  });

  it('passes name prop correctly', () => {
    const wrapper = mount(VIcon, {
      props: {
        name: 'bi-alarm',
      },
      global: {
        components: {
          OhVueIcon,
        },
      },
    });
    expect(wrapper.findComponent(OhVueIcon).props('name')).toBe('bi-alarm');
  });

  it('passes scale prop correctly', () => {
    const wrapper = mount(VIcon, {
      props: {
        name: 'bi-alarm',
        scale: 2,
      },
      global: {
        components: {
          OhVueIcon,
        },
      },
    });
    expect(wrapper.findComponent(OhVueIcon).props('scale')).toBe(2);
  });

  it('passes animation prop correctly', () => {
    const wrapper = mount(VIcon, {
      props: {
        name: 'bi-alarm',
        animation: 'spin',
      },
      global: {
        components: {
          OhVueIcon,
        },
      },
    });
    expect(wrapper.findComponent(OhVueIcon).props('animation')).toBe('spin');
  });

  it('passes flip prop correctly', () => {
    const wrapper = mount(VIcon, {
      props: {
        name: 'bi-alarm',
        flip: 'horizontal',
      },
      global: {
        components: {
          OhVueIcon,
        },
      },
    });
    expect(wrapper.findComponent(OhVueIcon).props('flip')).toBe('horizontal');
  });

  it('passes label prop correctly', () => {
    const wrapper = mount(VIcon, {
      props: {
        name: 'bi-alarm',
        label: 'Alarm Icon',
      },
      global: {
        components: {
          OhVueIcon,
        },
      },
    });
    expect(wrapper.findComponent(OhVueIcon).props('label')).toBe('Alarm Icon');
  });
});
