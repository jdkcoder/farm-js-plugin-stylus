import { defineConfig } from "@farmfe/core";
import vue from '@vitejs/plugin-vue'
import stylusPlugin from 'farm-js-plugin-stylus'

export default defineConfig({
  compilation: {
    input: {
      index: "./index.html",
    },
    persistentCache: false,
    progress: false,
  },
  vitePlugins: [vue()],
  plugins: [
    stylusPlugin()
  ],
});
