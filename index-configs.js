const userHome = require('user-home');
const files = require('./files');
const configManager = require('./configManager');
const path = require('path');
var clc = require("cli-color");
var fs = require('fs');
var program = require('commander');


program.action(function () {
    let configurations = configManager.getConfigs();

    console.log(clc.green('Stored configurations:'))
    configurations.forEach(element => {
        console.log(clc.yellow(element.name))
    });
});

program.parse(process.argv);