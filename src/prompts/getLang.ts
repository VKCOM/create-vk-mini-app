import chalk from 'chalk';
import prompts from 'prompts';
import { LANGS } from '../constants';
import { onCancel } from '../helpers';
import { PromptFunction } from '../types';

export const getLang: PromptFunction = async function (config) {
  const { lang } = await prompts(
    {
      type: config.lang ? null : 'select',
      name: 'lang',
      message: chalk.white.bold('Select a lang:'),
      choices: LANGS.map((lang) => {
        return {
          title: lang.color(lang.display),
          value: lang.name,
        };
      }),
    },
    { onCancel },
  );

  return { ...config, lang: lang || config.lang };
};
