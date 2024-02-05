import chalk from 'chalk';
import prompts from 'prompts';
import { getProjectName, onCancel } from '../helpers';
import { PromptFunction } from '../types';

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-');
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

export const getPackageName: PromptFunction = async function (config) {
  const { packageName } = await prompts(
    {
      type: () =>
        isValidPackageName(getProjectName(config.packageName ?? config.directoryName))
          ? null
          : 'text',
      name: 'packageName',
      message: chalk.white.bold('Package name:'),
      initial: () => toValidPackageName(getProjectName(config.packageName ?? config.directoryName)),
      validate: (newPackageName) =>
        isValidPackageName(newPackageName) || 'Invalid package.json name',
    },
    { onCancel },
  );
  return { ...config, packageName: packageName || config.packageName };
};
