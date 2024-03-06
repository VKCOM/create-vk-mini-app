import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import { parse } from 'node-html-parser';

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

function threatJsFilesAsJsx() {
  return {
    name: 'treat-js-files-as-jsx',
    async transform(code, id) {
      if (!id.match(/src\/.*\.js$/)) return null;

      return transformWithEsbuild(code, id, {
        loader: 'jsx',
        jsx: 'automatic',
      });
    },
  };
}

function odrPlugin() {
  return {
    name: 'odr-plugin',
    transformIndexHtml(html) {
      const tags = ['audio', 'video', 'img', 'link', 'script'];
      const dom = parse(html);

      const htmlElementHandlers = {
        removeCrossorigin: (element) => {
          element.removeAttribute('crossorigin');
        },

        changeSrc: (element) => {
          let value = element.getAttribute('src');

          if (String(value).startsWith('/')) {
            value && element.setAttribute('src', '.' + value);
          }

          value = element.getAttribute('href');

          if (String(value).startsWith('/')) {
            value && element.setAttribute('href', '.' + value);
          }
        },

        removeScriptType: (element) => {
          element.removeAttribute('type');
        },

        changeScriptLoadToDefer: (element) => {
          element.setAttribute('defer', 'defer');
        },
      };

      tags.forEach((tag) => {
        dom.getElementsByTagName(tag).forEach((element) => {
          htmlElementHandlers.changeSrc(element);
          htmlElementHandlers.removeCrossorigin(element);

          if (element.tagName === 'script'.toUpperCase()) {
            htmlElementHandlers.removeScriptType(element);
            htmlElementHandlers.changeScriptLoadToDefer(element);
          }
        });
      });

      return dom.toString();
    },
  };
}

export default ({ mode }) => {
  return defineConfig({
    plugins: [
      react(),
      threatJsFilesAsJsx(),
      handleModuleDirectivesPlugin(),
      mode === 'production' && odrPlugin(),
    ],

    optimizeDeps: {
      force: true,
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },

    build: {
      outDir: 'build',
    },
  });
};
