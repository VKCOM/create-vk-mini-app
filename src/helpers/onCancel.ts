import chalk from 'chalk';

export const onCancel = () => {
  throw new Error(chalk.hex('#c91b01')('✖') + chalk.bold(' Operation cancelled'));
};
