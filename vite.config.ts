import { defineConfig } from 'vitest/config'; // Import from vitest
import react from '@vitejs/plugin-react';    // Corrected package name

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    setupFiles: './src/setupTests.ts',
  },
});