const fs = require('fs-extra');

function modifyPackageJson(path, cb) {
    const packageJson = require(path);
    const modifiedPackageJson = cb(file);

    fs.writeFileSync(path, JSON.stringify(modifyPackageJson, 0, 4));
}

module.exports = {
    modifyPackageJson,
}