import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    // Switch pool from 'threads' to 'forks'
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true, // Run everything in one process
      },
    },
    testTimeout: 15000, // Increase slightly more for safety
  },
});