#!/usr/bin/env node

var userHome = require('user-home');
var program = require('commander');
var clc = require("cli-color");
const switcher = require('./switch');
const configManager = require('./configManager');
const fs = require('fs');
const path = require('path');
const files = require('./files');

const error=clc.red.bold;
const ok=clc.green.bold;

program.arguments('<name>').action(function (name) {
  if(configManager.isPresent(name)){
    process.stderr.write(error(`A configuration with name "${name}" is already present!\n`));
    process.exit(1);
  }
  else {
        let config = configManager.addConfig(name);
        fs.writeFileSync(path.join(files.configFolder, config.file),``);
        process.stdout.write(ok(`Created a configuration with name "${name}"\n`));
  }
 });

 program.parse(process.argv);
