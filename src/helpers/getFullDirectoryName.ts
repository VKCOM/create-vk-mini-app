import path from 'node:path';

export const getFullDirectoryName = (targetDir: string) => {
  return targetDir === '.' ? path.basename(path.resolve()) : targetDir;
};
