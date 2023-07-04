import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default {
  plugins: [react()],
  resolve: {
    alias: {
      'react-pixi': '@pixi/react',
      'pixi.js': 'pixi.js',
    },
  },
};
