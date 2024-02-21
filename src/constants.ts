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
  'vkui-bridge-router': {
    display: 'VKUI + Bridge + Router (recommended)',
    color: chalk.hex('#c7c7c7').bold,
    defaultValue: true,
  },
  'vkui-bridge': {
    display: 'VKUI + Bridge',
    color: chalk.hex('#c7c7c7'),
  },
  'vkui-only': {
    display: 'VKUI-only',
    color: chalk.hex('#c7c7c7'),
  },
  'default': {
    display: undefined,
    color: chalk.hex('#c7c7c7'),
  },
};

export const DEFAULT_DIR_NAME = 'mini-app';
export const DEFAULT_TEMPLATE_NAME = 'vkui-bridge-router';
