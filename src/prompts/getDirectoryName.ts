import fs from 'node:fs';
import chalk from 'chalk';
import prompts from 'prompts';
import { onCancel } from '../helpers';
import { DEFAULT_DIR_NAME } from '../constants';
import { PromptFunction } from '../types';

function isEmpty(path: string) {
  if (!fs.existsSync(path)) return true;
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

export const getDirectoryName: PromptFunction = async function (config) {
  const { directoryName } = await prompts(
    {
      type: config.directoryName && isEmpty(config.directoryName) ? null : 'text',
      name: 'directoryName',
      message: chalk.white.bold('Directory name:'),
      initial: DEFAULT_DIR_NAME,
      validate: (dir) => isEmpty(dir) || 'This directory is NOT EMPTY',
    },
    { onCancel },
  );

  return { ...config, directoryName: directoryName || config.directoryName };
};
