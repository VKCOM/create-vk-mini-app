#!/usr/bin/env node

import path from 'node:path';

import { getLang, getPackageName, getTemplate, getDirectoryName } from './prompts';
import { pipePrompts, buildConfigFromCLIArgs, copyTemplate, showCopySuccessInfo } from './helpers';

async function createVkMiniApp() {
  const initialConfig = buildConfigFromCLIArgs();
  const currentWorkingDir = process.cwd();

  const templateConfig = await pipePrompts(
    getDirectoryName,
    getPackageName,
    getLang,
    getTemplate,
  )(initialConfig);

  if (!templateConfig) return;
  const projectRoot = path.join(currentWorkingDir, templateConfig.directoryName);

  copyTemplate(templateConfig, projectRoot);
  showCopySuccessInfo(projectRoot);
}

createVkMiniApp();
