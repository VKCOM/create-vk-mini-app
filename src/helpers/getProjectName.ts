import path from 'node:path';

export const getProjectName = (targetDir: string) => {
  return targetDir === '.' ? path.basename(path.resolve()) : targetDir;
};
