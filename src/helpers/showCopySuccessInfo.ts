import path from 'node:path';
import chalk from 'chalk';

function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

export const showCopySuccessInfo = (root: string) => {
  console.log(
    chalk.blue(
      '\n' +
        ' __ __ _____    _____ _ _____ _ _____ _____ _____  ' +
        chalk.green(' _____ _____ _____ ____  __ __ \n') +
        '|  |  |  |  |  |     | |   | | |  _  |  _  |  _  | ' +
        chalk.green('| __  |   __|  _  |    \\|  |  | \n') +
        '|  |  |    -|  | | | | | | | | |     |   __|   __| ' +
        chalk.green('|    -|   __|     |  |  |_   _| \n') +
        ' \\___/|__|__|  |_|_|_|_|_|___|_|__|__|__|  |__| ' +
        chalk.green('   |__|__|_____|__|__|____/  |_|   \n') +
        '\n',
    ),
  );

  const cdProjectName = path.relative(process.cwd(), root);
  console.log(chalk.green.bold(`\nDone. Now run:\n`));
  if (root !== process.cwd()) {
    console.log(`1) cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`);
  }

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm';

  switch (pkgManager) {
    case 'yarn':
      console.log('2) yarn');
      console.log('3) yarn start');
      break;
    default:
      console.log(`2) ${pkgManager} install`);
      console.log(`3) ${pkgManager} run start`);
      break;
  }
};
