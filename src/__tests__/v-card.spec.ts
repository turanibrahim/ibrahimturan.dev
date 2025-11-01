import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VCard from '@/components/atoms/v-card.vue';

describe('v-card', () => {
  it('renders with default props', () => {
    const wrapper = mount(VCard);
    expect(wrapper.find('.card').exists()).toBe(true);
    expect(wrapper.find('.card-body').exists()).toBe(true);
  });

  it('renders title when provided', () => {
    const wrapper = mount(VCard, {
      props: {
        title: 'Test Card',
      },
    });
    expect(wrapper.find('.card-title').text()).toBe('Test Card');
  });

  it('renders default slot content', () => {
    const wrapper = mount(VCard, {
      slots: {
        default: 'Card content',
      },
    });
    expect(wrapper.text()).toContain('Card content');
  });

  it('renders image when imageSrc is provided', () => {
    const wrapper = mount(VCard, {
      props: {
        imageSrc: 'test.jpg',
        imageAlt: 'test image',
      },
    });
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('test.jpg');
    expect(img.attributes('alt')).toBe('test image');
  });

  it('applies bordered class', () => {
    const wrapper = mount(VCard, {
      props: {
        bordered: true,
      },
    });
    expect(wrapper.find('.card-border').exists()).toBe(true);
  });

  it('applies dashed class', () => {
    const wrapper = mount(VCard, {
      props: {
        dashed: true,
      },
    });
    expect(wrapper.find('.card-dash').exists()).toBe(true);
  });

  it('applies side class', () => {
    const wrapper = mount(VCard, {
      props: {
        side: true,
      },
    });
    expect(wrapper.find('.card-side').exists()).toBe(true);
  });

  it('applies image-full class', () => {
    const wrapper = mount(VCard, {
      props: {
        imageFull: true,
      },
    });
    expect(wrapper.find('.image-full').exists()).toBe(true);
  });

  it('applies size classes', () => {
    const sizes = ['xs', 'sm', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      const wrapper = mount(VCard, {
        props: { size },
      });
      expect(wrapper.find(`.card-${size}`).exists()).toBe(true);
    });
  });

  it('centers content when centered is true', () => {
    const wrapper = mount(VCard, {
      props: {
        centered: true,
      },
    });
    expect(wrapper.find('.items-center.text-center').exists()).toBe(true);
  });

  it('renders image at bottom when imageBottom is true', () => {
    const wrapper = mount(VCard, {
      props: {
        imageSrc: 'test.jpg',
        imageBottom: true,
      },
    });
    const figures = wrapper.findAll('figure');
    expect(figures.length).toBe(1);
    expect(wrapper.html()).toMatch(/card-body[\s\S]*<figure/);
  });

  it('renders actions slot', () => {
    const wrapper = mount(VCard, {
      slots: {
        actions: '<button>Action</button>',
      },
    });
    expect(wrapper.find('.card-actions').exists()).toBe(true);
    expect(wrapper.text()).toContain('Action');
  });

  it('applies custom color class', () => {
    const wrapper = mount(VCard, {
      props: {
        color: 'bg-primary',
      },
    });
    expect(wrapper.find('.bg-primary').exists()).toBe(true);
  });

  it('applies responsive class', () => {
    const wrapper = mount(VCard, {
      props: {
        responsive: true,
      },
    });
    expect(wrapper.find('.lg\\:card-side').exists()).toBe(true);
  });
});
