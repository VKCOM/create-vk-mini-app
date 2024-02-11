import minimist from 'minimist';
import { Config, LANG } from '../types';

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '');
}

export function buildConfigFromCLIArgs(): Config {
  const argv = minimist<{
    t?: string;
    template?: string;
    typescript?: boolean;
  }>(process.argv.slice(2), { string: ['_'] });

  const argTargetDir = formatTargetDir(argv._[0]);
  const argTemplate = argv.template || argv.t;
  const argTypescript = argv.typescript;
  const argProjectName = argv.projectName;

  return {
    lang: argTypescript ? LANG.typescript : undefined,
    template: argTemplate,
    projectName: argProjectName,
    directoryName: argTargetDir,
  };
}
