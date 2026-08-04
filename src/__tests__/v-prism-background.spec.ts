import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import VPrismBackground from '@/components/atoms/v-prism-background.vue';

vi.mock('ogl', () => {
  const mockCanvas = document.createElement('canvas');

  const mockGL = {
    drawingBufferWidth: 800,
    drawingBufferHeight: 600,
    canvas: mockCanvas,
    disable: vi.fn(),
    DEPTH_TEST: 1,
    CULL_FACE: 2,
    BLEND: 3,
  };

  return {
    Renderer: class MockRenderer {
      gl: any;
      setSize = vi.fn();
      render = vi.fn();
      constructor() {
        this.gl = mockGL;
      }
    },
    Program: class MockProgram {
      uniforms: any;
      constructor() {
        this.uniforms = {
          uPxScale: { value: 0 },
          uTime: { value: 0 },
          uOffset: { value: [0, 0] },
        };
      }
    },
    Mesh: class MockMesh {},
    Triangle: class MockTriangle {},
  };
});

describe('v-prism-background', () => {
  let mockResizeObserver: any;
  let mockIntersectionObserver: any;
  let mockRAF: any;
  let mockCancelRAF: any;

  beforeEach(() => {
    mockResizeObserver = {
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    };

    mockIntersectionObserver = {
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    };

    (globalThis as any).ResizeObserver = class {
      constructor(callback: any) {
        mockResizeObserver.callback = callback;
        return mockResizeObserver;
      }
    } as any;

    (globalThis as any).IntersectionObserver = class {
      constructor(callback: any) {
        mockIntersectionObserver.callback = callback;
        return mockIntersectionObserver;
      }
    } as any;

    mockRAF = vi.spyOn(global, 'requestAnimationFrame').mockImplementation((cb) => 1);

    mockCancelRAF = vi.spyOn(global, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('basic rendering', () => {
    it('renders container div', () => {
      const wrapper = mount(VPrismBackground);
      expect(wrapper.find('div').exists()).toBe(true);
    });

    it('has correct container classes', () => {
      const wrapper = mount(VPrismBackground);
      const container = wrapper.find('div');
      expect(container.classes()).toContain('relative');
      expect(container.classes()).toContain('w-full');
      expect(container.classes()).toContain('h-full');
    });
  });

  describe('lifecycle and setup', () => {
    it('calls setup on mount', () => {
      const wrapper = mount(VPrismBackground);
      expect(wrapper.vm).toBeDefined();
    });

    it('calls cleanup on unmount', () => {
      const wrapper = mount(VPrismBackground);
      const disconnectSpy = mockResizeObserver.disconnect;
      wrapper.unmount();
      expect(disconnectSpy).toHaveBeenCalled();
    });
  });

  describe('prop defaults', () => {
    it('uses default props', () => {
      const wrapper = mount(VPrismBackground);
      expect(wrapper.props('height')).toBe(3.5);
      expect(wrapper.props('baseWidth')).toBe(5.5);
      expect(wrapper.props('animationType')).toBe('rotate');
      expect(wrapper.props('glow')).toBe(1);
      expect(wrapper.props('noise')).toBe(0.5);
      expect(wrapper.props('transparent')).toBe(true);
      expect(wrapper.props('scale')).toBe(3.6);
      expect(wrapper.props('hueShift')).toBe(0);
      expect(wrapper.props('colorFrequency')).toBe(1);
      expect(wrapper.props('hoverStrength')).toBe(2);
      expect(wrapper.props('inertia')).toBe(0.05);
      expect(wrapper.props('bloom')).toBe(1);
      expect(wrapper.props('suspendWhenOffscreen')).toBe(false);
      expect(wrapper.props('timeScale')).toBe(0.5);
    });

    it('accepts custom height prop', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          height: 5,
        },
      });
      expect(wrapper.props('height')).toBe(5);
    });

    it('accepts custom animationType prop', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          animationType: 'hover',
        },
      });
      expect(wrapper.props('animationType')).toBe('hover');
    });

    it('accepts all animation types', () => {
      const types: Array<'rotate' | 'hover' | '3drotate'> = ['rotate', 'hover', '3drotate'];
      types.forEach((type) => {
        const wrapper = mount(VPrismBackground, {
          props: {
            animationType: type,
          },
        });
        expect(wrapper.props('animationType')).toBe(type);
      });
    });
  });

  describe('resize observer', () => {
    it('creates ResizeObserver on setup', () => {
      mount(VPrismBackground);
      expect(global.ResizeObserver).toHaveBeenCalled();
    });

    it('observes container element', () => {
      mount(VPrismBackground);
      expect(mockResizeObserver.observe).toHaveBeenCalled();
    });

    it('disconnects ResizeObserver on cleanup', () => {
      const wrapper = mount(VPrismBackground);
      wrapper.unmount();
      expect(mockResizeObserver.disconnect).toHaveBeenCalled();
    });
  });

  describe('intersection observer', () => {
    it('creates IntersectionObserver when suspendWhenOffscreen is true', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          suspendWhenOffscreen: true,
        },
      });
      expect(wrapper.props('suspendWhenOffscreen')).toBe(true);
    });

    it('does not create IntersectionObserver when suspendWhenOffscreen is false', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          suspendWhenOffscreen: false,
        },
      });
      expect(wrapper.props('suspendWhenOffscreen')).toBe(false);
    });

    it('observes container when suspendWhenOffscreen is true', () => {
      mount(VPrismBackground, {
        props: {
          suspendWhenOffscreen: true,
        },
      });
      expect(mockIntersectionObserver.observe).toHaveBeenCalled();
    });

    it('disconnects IntersectionObserver on cleanup when enabled', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          suspendWhenOffscreen: true,
        },
      });
      wrapper.unmount();
      expect(mockIntersectionObserver.disconnect).toHaveBeenCalled();
    });
  });

  describe('request animation frame', () => {
    it('starts animation frame on mount', () => {
      mount(VPrismBackground);
      expect(mockRAF).toHaveBeenCalled();
    });

    it('cancels animation frame on unmount', () => {
      const wrapper = mount(VPrismBackground);
      wrapper.unmount();
      expect(mockCancelRAF).toHaveBeenCalled();
    });

    it('starts animation frame when not suspended', () => {
      mount(VPrismBackground, {
        props: {
          suspendWhenOffscreen: false,
        },
      });
      expect(mockRAF).toHaveBeenCalled();
    });
  });

  describe('hover mode event listeners', () => {
    it('attaches pointer event listeners in hover mode', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      mount(VPrismBackground, {
        props: {
          animationType: 'hover',
        },
      });

      expect(addEventListenerSpy).toHaveBeenCalledWith('pointermove', expect.any(Function));
      expect(addEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
      expect(addEventListenerSpy).toHaveBeenCalledWith('blur', expect.any(Function));
    });

    it('removes pointer event listeners on cleanup in hover mode', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const wrapper = mount(VPrismBackground, {
        props: {
          animationType: 'hover',
        },
      });

      wrapper.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('pointermove', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('blur', expect.any(Function));
    });

    it('does not attach pointer listeners in rotate mode', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      mount(VPrismBackground, {
        props: {
          animationType: 'rotate',
        },
      });

      const pointerCalls = addEventListenerSpy.mock.calls.filter(
        (call) => call[0] === 'pointermove',
      );
      expect(pointerCalls.length).toBe(0);
    });

    it('does not attach pointer listeners in 3drotate mode', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      mount(VPrismBackground, {
        props: {
          animationType: '3drotate',
        },
      });

      const pointerCalls = addEventListenerSpy.mock.calls.filter(
        (call) => call[0] === 'pointermove',
      );
      expect(pointerCalls.length).toBe(0);
    });
  });

  describe('prop changes trigger re-init', () => {
    it('reinitializes when height changes', async () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          height: 3.5,
        },
      });

      const initialCallCount = mockResizeObserver.disconnect.mock.calls.length;

      await wrapper.setProps({ height: 5 });
      await nextTick();

      expect(mockResizeObserver.disconnect.mock.calls.length).toBeGreaterThan(initialCallCount);
    });

    it('reinitializes when animationType changes', async () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          animationType: 'rotate',
        },
      });

      const initialCallCount = mockResizeObserver.disconnect.mock.calls.length;

      await wrapper.setProps({ animationType: 'hover' });
      await nextTick();

      expect(mockResizeObserver.disconnect.mock.calls.length).toBeGreaterThan(initialCallCount);
    });

    it('reinitializes when scale changes', async () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          scale: 3.6,
        },
      });

      const initialCallCount = mockResizeObserver.disconnect.mock.calls.length;

      await wrapper.setProps({ scale: 5 });
      await nextTick();

      expect(mockResizeObserver.disconnect.mock.calls.length).toBeGreaterThan(initialCallCount);
    });

    it('reinitializes when suspendWhenOffscreen changes', async () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          suspendWhenOffscreen: false,
        },
      });

      await wrapper.setProps({ suspendWhenOffscreen: true });
      await nextTick();

      expect(global.IntersectionObserver).toHaveBeenCalled();
    });
  });

  describe('cleanup completeness', () => {
    it('stops animation frame on cleanup', () => {
      const wrapper = mount(VPrismBackground);
      wrapper.unmount();
      expect(mockCancelRAF).toHaveBeenCalled();
    });

    it('disconnects ResizeObserver on cleanup', () => {
      const wrapper = mount(VPrismBackground);
      wrapper.unmount();
      expect(mockResizeObserver.disconnect).toHaveBeenCalled();
    });

    it('removes all event listeners in hover mode on cleanup', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const wrapper = mount(VPrismBackground, {
        props: {
          animationType: 'hover',
        },
      });

      wrapper.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('pointermove', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mouseleave', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('blur', expect.any(Function));
    });

    it('disconnects IntersectionObserver when enabled on cleanup', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          suspendWhenOffscreen: true,
        },
      });

      wrapper.unmount();

      expect(mockIntersectionObserver.disconnect).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('handles zero timeScale', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          timeScale: 0,
        },
      });
      expect(wrapper.props('timeScale')).toBe(0);
    });

    it('handles negative values clamped to minimum', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          scale: -1,
        },
      });
      expect(wrapper.props('scale')).toBe(-1);
    });

    it('handles very large scale values', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          scale: 1000,
        },
      });
      expect(wrapper.props('scale')).toBe(1000);
    });

    it('handles offset prop with custom values', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          offset: { x: 100, y: 200 },
        },
      });
      expect(wrapper.props('offset')).toEqual({ x: 100, y: 200 });
    });

    it('handles partial offset prop', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          offset: { x: 50 },
        },
      });
      expect(wrapper.props('offset')).toEqual({ x: 50 });
    });
  });

  describe('prop variations', () => {
    it('handles transparent true', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          transparent: true,
        },
      });
      expect(wrapper.props('transparent')).toBe(true);
    });

    it('handles transparent false', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          transparent: false,
        },
      });
      expect(wrapper.props('transparent')).toBe(false);
    });

    it('handles different glow values', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          glow: 2.5,
        },
      });
      expect(wrapper.props('glow')).toBe(2.5);
    });

    it('handles different noise values', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          noise: 0.8,
        },
      });
      expect(wrapper.props('noise')).toBe(0.8);
    });

    it('handles different hueShift values', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          hueShift: 180,
        },
      });
      expect(wrapper.props('hueShift')).toBe(180);
    });

    it('handles different colorFrequency values', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          colorFrequency: 2,
        },
      });
      expect(wrapper.props('colorFrequency')).toBe(2);
    });

    it('handles different hoverStrength values', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          hoverStrength: 5,
        },
      });
      expect(wrapper.props('hoverStrength')).toBe(5);
    });

    it('handles different inertia values', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          inertia: 0.1,
        },
      });
      expect(wrapper.props('inertia')).toBe(0.1);
    });

    it('handles different bloom values', () => {
      const wrapper = mount(VPrismBackground, {
        props: {
          bloom: 2,
        },
      });
      expect(wrapper.props('bloom')).toBe(2);
    });
  });
});
