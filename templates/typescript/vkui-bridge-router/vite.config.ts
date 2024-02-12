import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function handleModuleDirectivesPlugin() {
  return {
    name: 'handle-module-directives-plugin',
    transform(code, id) {
      if (id.includes('@vkontakte/icons')) {
        code = code.replace(/"use-client";?/g, '');
      }
      return { code };
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), handleModuleDirectivesPlugin()],

  build: {
    outDir: 'build',
  },
});
