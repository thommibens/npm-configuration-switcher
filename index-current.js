#!/usr/bin/env node

const userHome = require('user-home');
const files = require('./files');
const configManager = require('./configManager');
const path = require('path');
var clc = require("cli-color");
var fs = require('fs');
var program = require('commander');

const error=clc.red.bold;

program
.option("-s --show", "Show current config")
.arguments('[options]')
.action((cmd, options) => {
    let current = configManager.getCurrentConfig();
    process.stdout.write(clc.green('Current NPM  config is: ') + clc.yellow(current)+'\n');
    if(options && options.show){
        var conf = fs.readFileSync(files.npmrc);
        process.stdout.write('\n');
        process.stdout.write(clc.green('Configuration content: \n'));
        process.stdout.write(clc.yellow(conf));
        process.stdout.write('\n');
    }
});

program.parse(process.argv);





