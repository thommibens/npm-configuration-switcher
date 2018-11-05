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
  if(configManager.isPresent(name)){
    log.error(`A configuration with name "${colors.errorInfo(name)}" is already present!\n`);
    process.exit(1);
  }
  else {
        let config = configManager.addConfig(name);
        fs.writeFileSync(path.join(files.configFolder, config.file),``);
        log.ok(`Created a configuration with name "${colors.info(name)}"\n`);
  }
 });

 program.parse(process.argv);
