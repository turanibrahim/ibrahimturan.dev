import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VNavbar from '@/components/atoms/v-navbar.vue';

describe('v-navbar', () => {
  it('renders with default structure', () => {
    const wrapper = mount(VNavbar);
    expect(wrapper.find('.navbar').exists()).toBe(true);
    expect(wrapper.find('.navbar-start').exists()).toBe(true);
    expect(wrapper.find('.navbar-center').exists()).toBe(true);
    expect(wrapper.find('.navbar-end').exists()).toBe(true);
  });

  it('renders start slot content', () => {
    const wrapper = mount(VNavbar, {
      slots: {
        start: '<div class="start-content">Start</div>',
        center: '',
        end: '',
      },
    });
    expect(wrapper.find('.navbar-start .start-content').exists()).toBe(true);
    expect(wrapper.find('.navbar-start').text()).toBe('Start');
  });

  it('renders center slot content', () => {
    const wrapper = mount(VNavbar, {
      slots: {
        start: '',
        center: '<div class="center-content">Center</div>',
        end: '',
      },
    });
    expect(wrapper.find('.navbar-center .center-content').exists()).toBe(true);
    expect(wrapper.find('.navbar-center').text()).toBe('Center');
  });

  it('renders end slot content', () => {
    const wrapper = mount(VNavbar, {
      slots: {
        start: '',
        center: '',
        end: '<div class="end-content">End</div>',
      },
    });
    expect(wrapper.find('.navbar-end .end-content').exists()).toBe(true);
    expect(wrapper.find('.navbar-end').text()).toBe('End');
  });

  it('renders all slots together', () => {
    const wrapper = mount(VNavbar, {
      slots: {
        start: 'Start',
        center: 'Center',
        end: 'End',
      },
    });
    expect(wrapper.find('.navbar-start').text()).toBe('Start');
    expect(wrapper.find('.navbar-center').text()).toBe('Center');
    expect(wrapper.find('.navbar-end').text()).toBe('End');
  });
});
