import chalk from 'chalk';
import prompts from 'prompts';
import { getFullDirectoryName, onCancel } from '../helpers';
import { PromptFunction } from '../types';

function toValidProjectName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-');
}

function isValidProjectName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

export const getProjectName: PromptFunction = async function (config) {
  const { projectName } = await prompts(
    {
      type: () =>
        isValidProjectName(getFullDirectoryName(config.projectName ?? config.directoryName))
          ? null
          : 'text',
      name: 'projectName',
      message: chalk.white.bold('Project name:'),
      initial: () =>
        toValidProjectName(getFullDirectoryName(config.projectName ?? config.directoryName)),
      validate: (newProjectName) =>
        isValidProjectName(newProjectName) || 'Invalid package.json name',
    },
    { onCancel },
  );
  return { ...config, projectName: projectName || config.projectName };
};
