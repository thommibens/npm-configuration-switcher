# NPM Configuration Switcher
A simple tool that allows to have multiple configuration of NPM (based on file `.npmrc` at user home level) and switch between them.

## Install
  ```console
  $ npm install npm-configuration-switcher -g
  ```
The configuration at the moment of the install will be named `default`

## Usage
You can access tool via command line, with `ncs`

### Create a new configuration 
  ```console
  $ ncs new <configuration name>
  ```
 > This command does NOT automatically switch to the new configuration
 
### Get current configuration 
  ```console
  $ ncs current
  ```
  This print the name of the current configuration.
  If you want to print the current configuration content use:
  ```console
  $ ncs current --show
  ```
  
### Get the list of configurations
  ```console
  $ ncs configs
  ```
  This print the list of configurations stored with `ncs`
  
  
### Get the content of a configuration
  ```console
  $ ncs get  <configuration name>
  ```
  This print the content of the configuration corresponding to the given name
  
### Switch configuration
  ```console
  $ ncs switch  <configuration name>
  ```
  This command change the current configuration with the configuration (previously created with `$ ncs new`)
  corresponding to the given name.
 > The previous "current" configuration will be stored as-is so if you changed it by `$ npm config set`, changes will be preserved


  
