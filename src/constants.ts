import chalk from 'chalk';
import { LANG } from './types';

export const LANGS = [
  {
    name: LANG.typescript,
    display: 'TypeScript',
    color: chalk.hex('#c7c7c7'),
  },
  {
    name: LANG.javascript,
    display: 'JavaScript',
    color: chalk.hex('#c7c7c7'),
  },
];

export const TEMPLATES_OPTIONS = {
  'vkapp-router-bridge-ui': {
    display: 'VKUI + Bridge + Router (recommended)',
    color: chalk.hex('#c7c7c7').bold,
    defaultValue: true,
  },
  'vkapp-bridge-ui': {
    display: 'VKUI + Bridge',
    color: chalk.hex('#c7c7c7'),
  },
  'vkapp-ui': {
    display: 'VKUI-only',
    color: chalk.hex('#c7c7c7'),
  },
  'default': {
    display: undefined,
    color: chalk.hex('#c7c7c7'),
  },
};

export const DEFAULT_DIR_NAME = 'mini-app';
export const DEFAULT_TEMPLATE_NAME = 'vkapp-router-bridge-ui';
