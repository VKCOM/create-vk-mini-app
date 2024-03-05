import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { HTMLElement, parse } from 'node-html-parser';

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

/**
 * This plugin is required for a single product build for the odr archive and a build for the site.
 * If you have a complex system and a custom script connection system, we recommend using 2 different configurations
 * for odr and for the site.
 *
 * Details: https://dev.vk.com/ru/mini-apps/development/on-demand-resources
 */
function odrPlugin() {
  return {
    name: 'odr-plugin',
    transformIndexHtml(html) {
      const tags = ['audio', 'video', 'img', 'link', 'script'];
      const dom = parse(html);

      const htmlElementHandlers: Record<string, (element: HTMLElement) => void> = {
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
    plugins: [react(), handleModuleDirectivesPlugin(), mode === 'production' && odrPlugin()],

    build: {
      outDir: 'build',
    },
  });
};
