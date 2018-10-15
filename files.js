#!/usr/bin/env node --harmony
var userHome = require('user-home');
var exports = module.exports = {};
const path = require('path');

exports.npmrc = path.join(userHome, '.npmrc');
exports.configFolder = path.join(userHome, '.nec');
exports.configJson = path.join(exports.configFolder, 'config.json')

