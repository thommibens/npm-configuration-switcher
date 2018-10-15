#!/usr/bin/env node

var userHome = require('user-home');
var program = require('commander');
var clc = require("cli-color");
const configManager = require('./configManager');
const fs = require('fs');
const path = require('path');
const files = require('./files');

const error = clc.red.bold;
const ok = clc.green.bold
const info = clc.yellow.bold
const errorInfo = clc.red.bold.bgYellow;



program.arguments('<name>').action(function (name) {
    if(! configManager.isPresent(name)){
        process.stderr.write(error(`No configuration with name ${errorInfo(name)} is present!\n`));
        process.exit();
    }
    let config = configManager.getConfig(name);
    let file = path.join(files.configFolder, config.file);
    let content = fs.readFileSync(file);
    process.stdout.write(ok(`${info(name)} content is :\n\n`));
    process.stdout.write(`${info(content)}\n`)
});

program.parse(process.argv);