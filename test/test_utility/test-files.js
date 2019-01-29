
const path = require('path');
const userHome = "./test/testfs";

var exports = module.exports = {};

exports.npmrc = path.resolve(path.join(userHome, '.npmrc'));
exports.configFolder = path.resolve(path.join(userHome, '.nec'));
exports.configJson = path.resolve(path.join(exports.configFolder, 'config.json'));