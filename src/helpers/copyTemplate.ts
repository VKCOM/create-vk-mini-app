import fs from 'node:fs';
import path from 'node:path';
import { Config } from '../types';
import { getFullDirectoryName } from './getFullDirectoryName';

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function writeFile(file: string, templateDir: string, root: string, content?: string) {
  const targetPath = path.join(root, file);
  if (content) {
    fs.writeFileSync(targetPath, content);
  } else {
    copy(path.join(templateDir, file), targetPath);
  }
}

export const copyTemplate = (config: Config, projectRoot: string) => {
  if (!fs.existsSync(projectRoot)) {
    fs.mkdirSync(projectRoot, { recursive: true });
  }

  const templateDir = path.resolve(__filename, '../..', 'templates', config.lang, config.template);

  const files = fs.readdirSync(templateDir);

  for (const file of files.filter((f) => f !== 'package.json')) {
    writeFile(file, templateDir, projectRoot);
  }

  const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'));

  pkg.name = config.projectName || getFullDirectoryName(config.directoryName);

  writeFile('package.json', templateDir, projectRoot, JSON.stringify(pkg, null, 2) + '\n');
};
