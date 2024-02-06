import { Config, PromptFunction } from '../types';

async function errorHandledWrapper(
  fn: PromptFunction,
  config: Config,
): Promise<Config | undefined> {
  try {
    return await fn(config);
  } catch (cancelled: any) {
    console.log(cancelled.message);
  }
}

export function pipePrompts(...fns: PromptFunction[]) {
  return async (initialConfid: Config) => {
    let config = initialConfid;
    for (let fn of fns) {
      const newConfig = await errorHandledWrapper(fn, config);
      if (!newConfig) return;
      config = newConfig;
    }
    return config;
  };
}
