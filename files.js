#!/usr/bin/env node --harmony

//Global constants containing paths to used files

const userHome = require('user-home');
const path = require('path');

var exports = module.exports = {};

exports.npmrc = path.join(userHome, '.npmrc');
exports.configFolder = path.join(userHome, '.nec');
exports.configJson = path.join(exports.configFolder, 'config.json')

