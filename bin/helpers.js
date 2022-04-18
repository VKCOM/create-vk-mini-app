const fs = require('fs-extra');

function modifyPackageJson(path, cb) {
  const rawData = fs.readFileSync(path);
  const parsedJson = JSON.parse(rawData);
  const modifiedPackageJson = cb(parsedJson);

  fs.writeFileSync(path, JSON.stringify(modifiedPackageJson, 0, 4));
}

module.exports = {
  modifyPackageJson,
}