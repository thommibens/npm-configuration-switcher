var files = require('./files')
var uuid = require('uuid');
var fs = require('fs');

module.exports = {

    /**
     * Return the current configuration name
     */
    getCurrentConfig: () => {
        initializConfig();
        return loadConfig(files.configJson).current;
    },

    /**
     * set the current configuration name with the given configuration
     */
    setCurrentConfig: (configName) => {
        initializConfig();
        let  config =  loadConfig(files.configJson);
        config.current = configName;
        writeConfig(config, files.configJson);
    },


    /**
     * Return all stored configuration names
     */
    getConfigs: () => {
        initializConfig();
        return  loadConfig(files.configJson).configurations;
    },

    /**
     * return the content of .nprc for the given configuration
     */
    getConfig: (configName) => {
        initializConfig();
        let configs = loadConfig(files.configJson).configurations.filter((currentConfig) => currentConfig.name === configName );
        return configs.length > 0 ? configs[0] : null;
    },

    /**
     * Store a new cofiguration
     */
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

    /**
     * Remove the given configuration from the stored list
     */
    removeConfig: (configName) => {
        initializConfig();
        let config =  loadConfig(files.configJson);
        config.configurations = config.configurations.filter((currentConfig) => currentConfig.name !== configName );
        writeConfig(config, files.configJson);
    },

    /**
     * return true if the given configuration is stored otherwise return false
     */
    isPresent: (configName) => {
        initializConfig();
        let config =  loadConfig(files.configJson);
        return config.configurations.filter((currentConfig) => currentConfig.name === configName ).length > 0;
    },

    
};

/**
 * If the configuration folder is not present create it,
 * if the configuration json is not present create and initialize it
 */
function initializConfig () {
        checkAndCreateDir(files.configFolder);
        let defaultConfig = {
            current : 'default',
            configurations : [{name : 'default', file: 'default'}]
        };
        checkAndCreatefile(files.configJson, defaultConfig);    
}

/**
 * Resturn the content of the given file parsed from Json
 * @param {*} file - file to load
 */
function loadConfig(file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));  
}
/**
 * Write the given config parsed to json into the given file
 * @param {*} file - file to load
 */
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
