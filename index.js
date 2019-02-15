#!/usr/bin/env node

const userHome = require('user-home');
const program = require('commander');
const colors = require("./logs").colors;
const log = require("./logs").log;
const configManager = require('./configManager');


program
  .version('0.2.2');

// index-switch.js
program
    .command("switch [name]","switch NPM configuration to the configuration with the given name");


// index-current.js
program
    .command("current [options]",'show the current NPM configuration name');

// index-new.js
program
    .command("new [name] [options]",'create a new confuguration with the sepcified name');

// index-get.js
program
    .command("get [name]",'show the content of the specified configuration');

// index-configs.js
program
    .command("configs",'show all stored configurations');


// Check if the given args are present
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
                log.error(`No ${colors.errorInfo(argsNames[i])} parameter given.\n`);
            }
        }
        if(! ok){
            process.exit(1);
        }
    };
};
program.parse(process.argv);



