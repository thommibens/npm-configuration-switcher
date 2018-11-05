const userHome = require('user-home');
const files = require('./files');
const configManager = require('./configManager');
const path = require('path');
const log = require("./logs").log;
const colors = require("./logs").colors;
const fs = require('fs');
const program = require('commander');


program.action(function () {
    let configurations = configManager.getConfigs();

    log.ok('Stored configurations:\n');
    configurations.forEach(element => {
        log.info(`${element.name}\n`);
    });
});

program.parse(process.argv);