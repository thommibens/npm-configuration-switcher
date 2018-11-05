#!/usr/bin/env node

const userHome = require('user-home');
const files = require('./files');
const configManager = require('./configManager');
const path = require('path');
const fs = require('fs');
const program = require('commander');
const log = require("./logs").log;
const colors = require("./logs").colors;


program
.option("-s --show", "Show current config")
.arguments('[options]')
.action((cmd, options) => {
    let current = configManager.getCurrentConfig();
    log.ok(`Current NPM  config is: ${colors.info(current)}\n`);
    if(options && options.show){
        var conf = fs.readFileSync(files.npmrc);
        log.info('\n');
        log.ok('Configuration content: \n');
        log.info(conf);
        log.info('\n');
    }
});

program.parse(process.argv);





