import fs from 'node:fs';
import path from 'node:path';
import { LANG } from '../types';

export function findTemplatesByLang(lang: LANG) {
  const templatesNames: string[] = [];
  const templatesFolder = path.resolve(__filename, '../..', 'templates', lang);

  fs.readdirSync(templatesFolder).forEach((file) => {
    templatesNames.push(file);
  });

  return templatesNames;
}
