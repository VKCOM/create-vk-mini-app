const fs = require('fs-extra');
const chalk = require('chalk');

function modifyPackageJson(path, cb) {
  const rawData = fs.readFileSync(path);
  const parsedJson = JSON.parse(rawData);
  const modifiedPackageJson = cb(parsedJson);

  fs.writeFileSync(path, JSON.stringify(modifiedPackageJson, 0, 4));
}

/**
 *
 * @param  {string[]} args
 */
function showErrorWithHelp(...args) {
  console.error(`\n🤬 ${chalk.bold.red(args.join(' '))} \n`);
  showHelp();
}

function showHelp() {
  console.error(`🖖 Usage:
1️⃣ Create VK Mini App with @vkontakte/vk-miniapps-deploy deploy: ${chalk.bold.green(
    'create-vk-mini-app',
  )} ${chalk.bold.cyan('[<app-directory-name>] [--template=<template-type>]')}
2️⃣ Create VK Mini App with Zeit deploy: ${chalk.bold.green('create-vk-mini-app')} ${chalk.bold.cyan(
    '[<app-directory-name>]',
  )} ${chalk.bold.green('--zeit')} ${chalk.bold.cyan('[--template=<template-type>]')}

Template types:
  1) ${chalk.bold.cyan('javascript')}
  2) ${chalk.bold.cyan('typescript')}`);
}

/**
 *
 * @param {number} index
 * @param {string} argumentName
 *
 * @return {string} Argument value
 */
function getArgumentValueAt(index, argumentName) {
  let [, argValue] = process.argv[index].split('=');

  if (!argValue) {
    const nextArg = process.argv[index + 1];

    if (!nextArg || nextArg.startsWith('--')) {
      showErrorWithHelp(`Missing value of argument${argumentName && ` --${argumentName}`}`);
      process.exit(1);
    }

    argValue = nextArg;
  }

  return argValue;
}

module.exports = {
  modifyPackageJson,
  showHelp,
  showErrorWithHelp,
  getArgumentValueAt,
};
