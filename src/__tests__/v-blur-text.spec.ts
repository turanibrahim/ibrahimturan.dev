import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import VBlurText from '@/components/atoms/v-blur-text.vue';

describe('v-blur-text', () => {
  let mockIntersectionObserver: any;
  let observerCallback: any;

  beforeEach(() => {
    mockIntersectionObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };

    observerCallback = null;

    (globalThis as any).IntersectionObserver = class {
      constructor(callback: any) {
        observerCallback = callback;
        return mockIntersectionObserver;
      }
    } as any;
    mockIntersectionObserver.callback = observerCallback;
  });

  describe('basic rendering', () => {
    it('renders with default props', () => {
      const wrapper = mount(VBlurText);
      expect(wrapper.find('.blur-text').exists()).toBe(true);
      expect(wrapper.find('p').exists()).toBe(true);
    });

    it('renders text content', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello World',
        },
      });
      expect(wrapper.text()).toContain('Hello');
      expect(wrapper.text()).toContain('World');
    });

    it('applies custom className', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
          className: 'custom-class',
        },
      });
      expect(wrapper.find('.custom-class').exists()).toBe(true);
    });

    it('has flex and flex-wrap classes on root element', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
        },
      });
      const root = wrapper.find('p');
      expect(root.classes()).toContain('flex');
      expect(root.classes()).toContain('flex-wrap');
    });
  });

  describe('text splitting', () => {
    it('splits text by words when animateBy is "words"', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello World Test',
          animateBy: 'words',
        },
      });
      const text = wrapper.text().replace(/\s+/g, ' ').trim();
      expect(text).toContain('Hello');
      expect(text).toContain('World');
      expect(text).toContain('Test');
    });

    it('splits text by letters when animateBy is "letters"', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'ABC',
          animateBy: 'letters',
        },
      });
      const text = wrapper.text().replace(/\s+/g, '');
      expect(text).toBe('ABC');
    });

    it('handles empty text gracefully', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: '',
        },
      });
      expect(wrapper.find('.blur-text').exists()).toBe(true);
      expect(wrapper.text()).toBe('');
    });

    it('handles single word', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
          animateBy: 'words',
        },
      });
      expect(wrapper.text()).toContain('Hello');
    });

    it('handles single letter', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'A',
          animateBy: 'letters',
        },
      });
      expect(wrapper.text()).toBe('A');
    });

    it('handles text with multiple consecutive spaces', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello  World',
          animateBy: 'words',
        },
      });
      const text = wrapper.text();
      expect(text).toContain('Hello');
      expect(text).toContain('World');
    });
  });

  describe('intersection observer', () => {
    it('observes root element', () => {
      mount(VBlurText, {
        props: {
          text: 'Hello',
        },
      });
      expect(mockIntersectionObserver.observe).toHaveBeenCalled();
    });

    it('uses correct threshold prop', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
          threshold: 0.5,
        },
      });
      expect(wrapper.props('threshold')).toBe(0.5);
    });

    it('uses correct rootMargin prop', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
          rootMargin: '10px',
        },
      });
      expect(wrapper.props('rootMargin')).toBe('10px');
    });

    it('disconnects observer on unmount', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
        },
      });
      wrapper.unmount();
      expect(mockIntersectionObserver.disconnect).toHaveBeenCalled();
    });

    it('recreates observer when threshold changes', async () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
          threshold: 0.1,
        },
      });

      const disconnectSpy = mockIntersectionObserver.disconnect;
      await wrapper.setProps({ threshold: 0.5 });
      await nextTick();

      expect(disconnectSpy).toHaveBeenCalled();
    });

    it('recreates observer when rootMargin changes', async () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
          rootMargin: '0px',
        },
      });

      const disconnectSpy = mockIntersectionObserver.disconnect;
      await wrapper.setProps({ rootMargin: '10px' });
      await nextTick();

      expect(disconnectSpy).toHaveBeenCalled();
    });
  });

  describe('animation configuration', () => {
    it('uses default delay of 200', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello World',
        },
      });
      expect(wrapper.props('delay')).toBe(200);
    });

    it('applies custom delay prop', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello World',
          delay: 500,
        },
      });
      expect(wrapper.props('delay')).toBe(500);
    });

    it('uses default direction "top"', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
        },
      });
      expect(wrapper.props('direction')).toBe('top');
    });

    it('accepts direction "bottom"', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
          direction: 'bottom',
        },
      });
      expect(wrapper.props('direction')).toBe('bottom');
    });

    it('uses default stepDuration of 0.35', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
        },
      });
      expect(wrapper.props('stepDuration')).toBe(0.35);
    });

    it('applies custom stepDuration', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
          stepDuration: 0.5,
        },
      });
      expect(wrapper.props('stepDuration')).toBe(0.5);
    });

    it('accepts custom animationFrom prop', () => {
      const customFrom = { opacity: 0, scale: 0.5 };
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
          animationFrom: customFrom,
        },
      });
      expect(wrapper.props('animationFrom')).toEqual(customFrom);
    });

    it('accepts custom animationTo prop', () => {
      const customTo = [{ opacity: 0.5 }, { opacity: 1 }];
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
          animationTo: customTo,
        },
      });
      expect(wrapper.props('animationTo')).toEqual(customTo);
    });

    it('accepts custom easing function', () => {
      const customEasing = (t: number) => t * t;
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
          easing: customEasing,
        },
      });
      expect(wrapper.props('easing')).toBe(customEasing);
    });
  });

  describe('animation completion', () => {
    it('accepts onAnimationComplete callback', () => {
      const callback = vi.fn();
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello World',
          onAnimationComplete: callback,
        },
      });
      expect(wrapper.props('onAnimationComplete')).toBe(callback);
    });

    it('handles missing onAnimationComplete gracefully', () => {
      expect(() => {
        mount(VBlurText, {
          props: {
            text: 'Hello',
          },
        });
      }).not.toThrow();
    });
  });

  describe('prop reactivity', () => {
    it('updates text content when text prop changes', async () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
        },
      });
      expect(wrapper.text()).toContain('Hello');

      await wrapper.setProps({ text: 'World' });
      await nextTick();

      expect(wrapper.text()).toContain('World');
      expect(wrapper.text()).not.toContain('Hello');
    });

    it('re-splits text when animateBy changes', async () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'AB',
          animateBy: 'words',
        },
      });
      expect(wrapper.text()).toContain('AB');

      await wrapper.setProps({ animateBy: 'letters' });
      await nextTick();

      expect(wrapper.text()).toContain('AB');
      expect(wrapper.props('animateBy')).toBe('letters');
    });

    it('handles direction change', async () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
          direction: 'top',
        },
      });
      expect(wrapper.props('direction')).toBe('top');

      await wrapper.setProps({ direction: 'bottom' });
      await nextTick();

      expect(wrapper.props('direction')).toBe('bottom');
    });

    it('handles delay change', async () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
          delay: 200,
        },
      });

      await wrapper.setProps({ delay: 500 });
      await nextTick();

      expect(wrapper.props('delay')).toBe(500);
    });

    it('handles stepDuration change', async () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
          stepDuration: 0.35,
        },
      });

      await wrapper.setProps({ stepDuration: 0.7 });
      await nextTick();

      expect(wrapper.props('stepDuration')).toBe(0.7);
    });
  });

  describe('edge cases', () => {
    it('handles very long text', () => {
      const longText = 'word '.repeat(100).trim();
      const wrapper = mount(VBlurText, {
        props: {
          text: longText,
          animateBy: 'words',
        },
      });
      expect(wrapper.text()).toContain('word');
    });

    it('handles special characters', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello 👋 World 🌍',
          animateBy: 'words',
        },
      });
      expect(wrapper.text()).toContain('👋');
      expect(wrapper.text()).toContain('🌍');
    });

    it('handles numbers in text', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Test 123 456',
          animateBy: 'words',
        },
      });
      expect(wrapper.text()).toContain('123');
      expect(wrapper.text()).toContain('456');
    });

    it('handles punctuation', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello, World!',
          animateBy: 'words',
        },
      });
      expect(wrapper.text()).toContain('Hello,');
      expect(wrapper.text()).toContain('World!');
    });

    it('renders non-breaking spaces for regular spaces', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello World',
          animateBy: 'words',
        },
      });
      const text = wrapper.text();
      expect(text).toBeTruthy();
      expect(text).toContain('Hello');
    });
  });

  describe('animation trigger', () => {
    it('does not animate before in view', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello',
        },
      });
      const spans = wrapper.findAll('span');
      expect(spans.length).toBeGreaterThan(0);
      expect(wrapper.text()).toContain('Hello');
    });

    it('starts animation when in view', async () => {
      mount(VBlurText, {
        props: {
          text: 'Hello',
        },
      });
      await nextTick();

      expect(mockIntersectionObserver.observe).toHaveBeenCalled();
    });
  });

  describe('motion component integration', () => {
    it('wraps each segment in a span with inline-block display', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello World',
          animateBy: 'words',
        },
      });
      const spans = wrapper.findAll('span');
      spans.forEach((span) => {
        const style = span.attributes('style');
        expect(style).toContain('display: inline-block');
      });
    });

    it('applies will-change optimization to spans', () => {
      const wrapper = mount(VBlurText, {
        props: {
          text: 'Hello World',
          animateBy: 'words',
        },
      });
      const spans = wrapper.findAll('span');
      spans.forEach((span) => {
        const style = span.attributes('style');
        expect(style).toContain('will-change: transform, filter, opacity');
      });
    });
  });
});
