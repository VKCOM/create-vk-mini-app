import prompts from 'prompts';

export type Config = prompts.Answers<'directoryName' | 'projectName' | 'lang' | 'template'>;
export type PromptFunction = (config: Config) => Promise<Config>;

export enum LANG {
  typescript = 'typescript',
  javascript = 'javascript',
}
