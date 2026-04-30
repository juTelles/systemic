import { beforeEach, afterEach, vi } from 'vitest';

// Mock global Date.now() para testes consistentes
beforeEach(() => {
  // Usar timestamp fixo para testes de initialState e engine
  vi.useFakeTimers();
  vi.setSystemTime(new Date(1000000));
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});
