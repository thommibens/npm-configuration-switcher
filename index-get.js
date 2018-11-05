#!/usr/bin/env node

const userHome = require('user-home');
const program = require('commander');
const log = require("./logs").log;
const colors = require("./logs").colors;
const configManager = require('./configManager');
const fs = require('fs');
const path = require('path');
const files = require('./files');





program.arguments('<name>').action(function (name) {
    if(! configManager.isPresent(name)){
        log.error(`No configuration with name ${colors.errorInfo(name)} is present!\n`);
        process.exit();
    }
    let config = configManager.getConfig(name);
    let file = path.join(files.configFolder, config.file);
    let content = fs.readFileSync(file);
    log.ok(`${colors.info(name)} content is :\n\n`);
    log.info(`${content}\n`)
});

program.parse(process.argv);