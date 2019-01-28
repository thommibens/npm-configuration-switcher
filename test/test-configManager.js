const assert = require('assert');
const rewire = require('rewire');
const fs = require('fs')
const rimraf = require("rimraf");

const configManager = rewire('../configManager');
const files = require('./test_utility/test-files')


beforeEach("Mock file system", function(){
    configManager.__set__("files", files);
});

afterEach("Restore file system", function(){
    if(fs.existsSync(files.npmrc)) fs.unlinkSync(files.npmrc);
    if(fs.existsSync(files.configFolder)) rimraf.sync(files.configFolder)
    
})

describe('Test ConfigManager', function() {
    describe('#ConfigManager.getCurrentCOnfig()', function() {   

      it('shuld create configs directory', function() {
        configManager.getCurrentConfig();
        assert.equal(fs.existsSync(files.configFolder), true);
      });

      it('shuld create configs json', function() {
        configManager.getCurrentConfig();
        assert.equal(fs.existsSync(files.configJson),true);
      });

      it('shuld initialize configs json', function() {
        let expected = {
          current : 'default',
          configurations : [{name : 'default', file: 'default'}]
        };

        configManager.getCurrentConfig();
        let result = JSON.parse(fs.readFileSync(files.configJson, 'utf8'));
    
        assert.deepEqual(expected, result);
      });

      it('shuld return "default"', function() {
        let expected = "default"
        
        let result = configManager.getCurrentConfig();
    
        assert.equal(expected, result);
      });
    });

    describe('#ConfigManager.isPresent()', function() {   

      it('shuld create configs directory', function() {
        configManager.isPresent();
        assert.equal(fs.existsSync(files.configFolder), true);
      });

      it('shuld create configs json', function() {
        configManager.isPresent();
        assert.equal(fs.existsSync(files.configJson),true);
      });

      it('shuld initialize configs json', function() {
        let expected = {
          current : 'default',
          configurations : [{name : 'default', file: 'default'}]
        };

        configManager.isPresent();
        let result = JSON.parse(fs.readFileSync(files.configJson, 'utf8'));
    
        assert.deepEqual(expected, result);
      });

      it('shuld return true', function() {
        let givenCondifgName = "default"
        
        let result = configManager.isPresent(givenCondifgName);
    
        assert.equal(true, result);
      });

    });

    describe('#ConfigManager.getConfigs()', function() {   

      it('shuld create configs directory', function() {
        configManager.getConfigs();
        assert.equal(fs.existsSync(files.configFolder), true);
      });

      it('shuld create configs json', function() {
        configManager.getConfigs();
        assert.equal(fs.existsSync(files.configJson),true);
      });

      it('shuld initialize configs json', function() {
        let expected = {
          current : 'default',
          configurations : [{name : 'default', file: 'default'}]
        };

        configManager.getConfigs();
        let result = JSON.parse(fs.readFileSync(files.configJson, 'utf8'));
    
        assert.deepEqual(expected, result);
      });

      it('shuld return return one configuration with name default', function() {
       
        let result = configManager.getConfigs();
    
        assert.equal(result.length, 1);
        assert.equal(result[0].name, 'default');
      });
    });
});