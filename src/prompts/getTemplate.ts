import chalk from 'chalk';
import prompts from 'prompts';
import { TEMPLATES_OPTIONS, DEFAULT_TEMPLATE_NAME } from '../constants';
import { findTemplatesByLang, onCancel } from '../helpers';
import { PromptFunction } from '../types';

function isValidTemplateOption(template: string): template is keyof typeof TEMPLATES_OPTIONS {
  return template in TEMPLATES_OPTIONS;
}

export const getTemplate: PromptFunction = async function (config) {
  const templatesNames = findTemplatesByLang(config.lang);
  const defaultTemplateIndex = templatesNames.findIndex(
    (templateName) => templateName === DEFAULT_TEMPLATE_NAME,
  );

  const { template } = await prompts(
    {
      type: config.template && templatesNames.includes(config.template) ? null : 'select',
      name: 'template',
      message:
        typeof config.template === 'string' && !templatesNames.includes(config.template)
          ? chalk.white.bold(
              `"${config.template}" isn't a valid template. Please choose from below: `,
            )
          : chalk.white.bold('Select a template:'),
      initial: defaultTemplateIndex === -1 ? 0 : defaultTemplateIndex,
      choices: templatesNames.map((template) => {
        const templateConfig = isValidTemplateOption(template)
          ? TEMPLATES_OPTIONS[template]
          : TEMPLATES_OPTIONS['default'];

        const templateColor = templateConfig.color;
        return {
          title: templateColor(templateConfig.display ?? template),
          value: template,
        };
      }),
    },
    { onCancel },
  );

  return { ...config, template: template || config.template };
};
