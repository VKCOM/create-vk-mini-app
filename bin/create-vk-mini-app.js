#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const { modifyPackageJson, showHelp, getArgumentValueAt, showErrorWithHelp } = require('./helpers');

const packageRoot = path.join(__dirname, '..');

const JAVASCRIPT_TEMPLATE = 'javascript';
const TYPESCRIPT_TEMPLATE = 'typescript';
const templates = new Set([JAVASCRIPT_TEMPLATE, TYPESCRIPT_TEMPLATE]);

const needHelp = ~process.argv.indexOf('--help');
const useZeit = ~process.argv.indexOf('--zeit');

const miniAppDirectory =
  process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'mini-app';

const templateIndex = process.argv.indexOf('--template');
const useTemplate = ~templateIndex;

if (needHelp) {
  showHelp();
  process.exit(0);
}

const template = useTemplate && getArgumentValueAt(templateIndex, 'template');

if (template && !templates.has(template)) {
  showErrorWithHelp('Wrong template type:', template);
  process.exit(1);
}

console.log('🎬 Creating project...');
fs.mkdirSync(miniAppDirectory);
console.log('⏱ Copying VK Mini App source and configuration files..');

fs.copySync(path.join(packageRoot, 'templates', template || JAVASCRIPT_TEMPLATE), miniAppDirectory);
fs.copySync(path.join(packageRoot, 'README.md'), path.join(miniAppDirectory, 'README.md'));

if (useZeit) {
  fs.copySync(path.join(packageRoot, 'zeit', 'now.json'), path.join(miniAppDirectory, 'now.json'));
}

console.log(`🖼 VK Mini App source and configuration files are copied`);

const scriptsToAdd = {};

if (useZeit) {
  scriptsToAdd['now-build'] = 'react-scripts build';
}

if (Object.keys(scriptsToAdd).length) {
  const packageJsonPath = path.join(miniAppDirectory, 'package.json');

  modifyPackageJson(packageJsonPath, function (packageJson) {
    packageJson.scripts = {
      ...packageJson.scripts,
      ...scriptsToAdd,
    };

    return packageJson;
  });
}

console.log('⏱ Installing project dependencies — it might take a few minutes..');

try {
  execSync(`cd ${miniAppDirectory} && npm ci`);
} catch (npmErr) {
  console.error(`😳 npm error:\n${npmErr}`);
  process.exit(1);
}

console.log('✅ Dependencies are installed');

console.log(
  `✌️ VK Mini App is ready to start in ${miniAppDirectory} folder. \n🧐 Check README.MD for brief instructrions.\n💻 Happy Coding!`,
);
