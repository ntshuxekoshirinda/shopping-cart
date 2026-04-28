import { defineConfig } from 'vite';
import react from '@vitejs/react-bundle'; // or @vitejs/plugin-react
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // Move poolOptions inside the 'test' object
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    setupFiles: './src/setupTests.ts', 
  },
});