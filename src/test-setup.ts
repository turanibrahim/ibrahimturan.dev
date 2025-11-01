import { config } from '@vue/test-utils';
import { vi } from 'vitest';

config.global.mocks = {
  $t: (key: string) => key,
};

globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
