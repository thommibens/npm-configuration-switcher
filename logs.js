#!/usr/bin/env node --harmony
const clc = require("cli-color");

var exports = module.exports = {};

const colors = {
    ok: clc.green.bold,
    info: clc.yellow.bold,
    error: clc.red.bold,
    errorInfo: clc.red.bold.bgYellow
}

const log = {
    error: (message) => {process.stderr.write(colors.error(message))},
    ok: (message) => {process.stdout.write(colors.ok(message))},
    info: (message) => {process.stdout.write(colors.info(message))},
}

exports.log = log;
exports.colors = colors;
