var files = require('./files')
var uuid = require('uuid');
var fs = require('fs');

module.exports = {
    getCurrentConfig: () => {
        initializConfig();
        return loadConfig(files.configJson).current;
    },

    setCurrentConfig: (configName) => {
        initializConfig();
        let  config =  loadConfig(files.configJson);
        config.current = configName;
        writeConfig(config, files.configJson);
    },

    getConfigs: () => {
        initializConfig();
        return  loadConfig(files.configJson).configurations;
    },

    getConfig: (configName) => {
        initializConfig();
        let configs = loadConfig(files.configJson).configurations.filter((currentConfig) => currentConfig.name === configName );
        return configs.length > 0 ? configs[0] : null;
    },

    addConfig: (configName) => {
        initializConfig();
        let config =  loadConfig(files.configJson);
        let configuration = {
            name: configName,
            file: uuid()
        }
        config.configurations.push(configuration);
        writeConfig(config, files.configJson);
        return configuration;
    },

    removeConfig: (configName) => {
        initializConfig();
        let config =  loadConfig(files.configJson);
        config.configurations = config.configurations.filter((currentConfig) => currentConfig.name !== configName );
        writeConfig(config, files.configJson);
    },

    isPresent: (configName) => {
        initializConfig();
        let config =  loadConfig(files.configJson);
        return config.configurations.filter((currentConfig) => currentConfig.name === configName ).length > 0;
    },

    
};

function initializConfig () {
        checkAndCreateDir(files.configFolder);
        let defaultConfig = {
            current : 'default',
            configurations : [{name : 'default', file: 'default'}]
        };
        checkAndCreatefile(files.configJson, defaultConfig);    
}

function loadConfig(file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));  
}

function writeConfig(config, file) {
    fs.writeFileSync(file, JSON.stringify(config), 'utf8');
}

function checkAndCreateDir(dir) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

function checkAndCreatefile(file, obj) {
    if (!fs.existsSync(file)){
        fs.writeFileSync(file, JSON.stringify(obj), 'utf8');
    }
}
