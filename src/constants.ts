import chalk from 'chalk';
import { LANG } from './types';

export const LANGS = [
  {
    name: LANG.typescript,
    color: chalk.hex('#057acc'),
  },
  {
    name: LANG.javascript,
    color: chalk.hex('#f7e01c'),
  },
];

export const TEMPLATES_OPTIONS = {
  'vkapp-router-bridge-ui': {
    display: 'vkapp-router-bridge-ui (recommended)',
    color: chalk.green.bold,
  },
  'vkapp-bridge-ui': {
    display: 'vkapp-bridge-ui',
    color: chalk.hex('#c7c7c7'),
  },
  'vkapp-ui': {
    display: 'vkapp-ui',
    color: chalk.hex('#c7c7c7'),
  },
  'default': {
    display: undefined,
    color: chalk.hex('#c7c7c7'),
  },
};

export const DEFAULT_DIR_NAME = 'mini-app';
