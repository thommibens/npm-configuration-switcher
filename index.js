#!/usr/bin/env node

var userHome = require('user-home');
var program = require('commander');
var clc = require("cli-color");
//const switcher = require('./switch').switcher;
const configManager = require('./configManager');

const error=clc.red.bold;

const err = process.stderr.write;
const errorInfo = clc.red.bold.bgYellow;

program
  .version('0.5.0');

// index-switch.js
program
    .command("switch [name]","switch NPM configuration to the configuration with the given name");


// index-current.js
program
    .command("current [options]",'show the current NPM configuration name');

// index-new.js
program
    .command("new [name] [options]",'create a new confuguration with the sepcified name');

program
    .command("get [name]",'show the content of the specified configuration');

program
    .command("configs",'show all stored configurations');

function checkMandatoryArgFn (...argsNames) {
    let getOrNull = (list,index) => {
        if( index >= list.length)
            return null;
        return list[index];
    }
    return (commandStr, ...args) => {
        let ok = true;
        for(let i = 0; i < argsNames.length; i++){
            let param = getOrNull(args, i);
            if(null === param || typeof "" !== typeof param){
                ok = false;
                process.stderr.write(error(`No ${errorInfo(argsNames[i])} parameter given.\n`))
            }
        }
        if(! ok){
            process.exit(1);
        }
    };
};
program.parse(process.argv);



