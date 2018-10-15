#!/usr/bin/env node --harmony

const userHome = require('user-home');
const files = require('./files');
const configManager = require('./configManager');
const path = require('path');
var clc = require("cli-color");
var fs = require('fs');
var program = require('commander');

const error = clc.red.bold;
const ok = clc.green.bold
const info = clc.yellow.bold
const errorInfo = clc.red.bold.bgYellow;

var exports = module.exports = {};

program.arguments('<name>').action(function (name) {
    switchConfig(name)
});

program.parse(process.argv);

function switchConfig ( configName ) {
    if(configManager.getCurrentConfig() !== configName){
        if(! configManager.isPresent(configName)){
            process.stderr.write(error(`No configuration with name ${errorInfo(configName)} found \n`));
            process.exit(1)
        }

        var config = configManager.getConfig(configName);
        var oldConfig = configManager.getConfig(configManager.getCurrentConfig())
        var fileToLoad = path.join(files.configFolder, config.file);
        var fileToUnload =  path.join(files.configFolder, oldConfig.file);


        var current = fs.readFileSync(files.npmrc);
        var toLoad = fs.readFileSync(fileToLoad);

        fs.writeFileSync(fileToUnload, current);
        fs.writeFileSync(files.npmrc, toLoad);

        configManager.setCurrentConfig(configName);

        process.stdout.write(ok(`Npm configuration switched to `));
        process.stdout.write(info(`${configName} \n`))
    }
}

exports.switcher = switchConfig;