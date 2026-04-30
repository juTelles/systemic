import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['__tests__/**/*.test.js'],
    exclude: ['node_modules', 'dist'],
    setupFiles: ['__tests__/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.js'],
      exclude: [
        'src/api/**',
        'src/index.js',
        'src/game/decisions/**',
      ],
    },
  },
});
