#!/usr/bin/env node

const userHome = require('user-home');
const files = require('./files');
const configManager = require('./configManager');
const path = require('path');
const log = require("./logs").log;
const colors = require("./logs").colors;
const fs = require('fs');
const program = require('commander');

var exports = module.exports = {};

program.arguments('<name>').action(function (name) {
    switchConfig(name)
});

program.parse(process.argv);

function switchConfig ( configName ) {
    if(configManager.getCurrentConfig() !== configName){
        if(! configManager.isPresent(configName)){
            log.error(`No configuration with name ${colors.errorInfo(configName)} found \n`);
            process.exit(1)
        }

        var config = configManager.getConfig(configName);
        var oldConfig = configManager.getConfig(configManager.getCurrentConfig())
        var fileToLoad = path.join(files.configFolder, config.file);
        var fileToUnload =  path.join(files.configFolder, oldConfig.file);

        var current = '';
        if(fs.existsSync(files.npmrc))
            current = fs.readFileSync(files.npmrc);

        var toLoad = fs.readFileSync(fileToLoad);

        fs.writeFileSync(fileToUnload, current);
        fs.writeFileSync(files.npmrc, toLoad);

        configManager.setCurrentConfig(configName);

        log.ok(`Npm configuration switched to `);
        log.info(`${configName} \n`);
    }
}

exports.switcher = switchConfig;