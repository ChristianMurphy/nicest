'use strict';

const path = require('path');
const chalk = require('chalk');

const read = require('./helpers/read-promise');
const writeFile = require('./helpers/write-file-promise');

/**
 * Writes a server configuration file.
 * @returns {Null} nothing
 */
function init () {
    const config = {};

    console.log(chalk.bold('\nNicest Setup Wizard\n'));
    console.log('This utility will walk you through creating a nicest.json file.\n');
    console.log('It only covers the most common items, and tries to guess sensible defaults.\n');
    console.log(chalk.bold('configuration for the nicest server\n'));

    read({
        prompt: 'hostname:',
        default: 'localhost'
    })
    .then(function (serverHostname) {
        config.server = {};
        config.server.hostname = serverHostname;

        return read({
            prompt: 'port number:',
            default: 80
        });
    })
    .then(function (serverPort) {
        config.server.port = parseInt(serverPort, 10);

        return read({
            prompt: 'url prefix: ()',
            default: ''
        });
    })
    .then(function (prefix) {
        config.server.prefix = prefix;

        console.log(chalk.bold('\nconfiguration for nicest database\n'));

        return read({
            prompt: 'hostname:',
            default: 'localhost'
        });
    })
    .then(function (databaseHostname) {
        config.database = {};
        config.database.hostname = databaseHostname;

        return read({
            prompt: 'database name:',
            default: 'nicest'
        });
    })
    .then(function (databaseName) {
        config.database.name = databaseName;

        return read({
            prompt: 'database port:',
            default: 27017
        });
    })
    .then(function (databasePort) {
        config.database.port = parseInt(databasePort, 10);

        console.log(chalk.bold('\nconfiguration for nicest security and authentication\n'));

        return read({
            prompt: 'cookie encryption token:',
            default: 'secret'
        });
    })
    .then(function (authenticationSecret) {
        config.authentication = {};
        config.authentication.token = authenticationSecret;

        return read({
            prompt: 'is there an https proxy?:',
            default: 'false'
        });
    })
    .then(function (authenticationHttpsProxy) {
        config.authentication.https = authenticationHttpsProxy === 'true';

        return read({
            prompt: 'Github Client ID:'
        });
    })
    .then(function (authenticationGithubClientId) {
        config.authentication.github = {};
        config.authentication.github.client = authenticationGithubClientId;

        return read({
            prompt: 'Github Client Secret:'
        });
    })
    .then(function (authenticationGithubClientSecret) {
        config.authentication.github.secret = authenticationGithubClientSecret;

        writeFile(path.resolve(__dirname, '..', 'nicest.json'), JSON.stringify(config, null, 2));
    })
    .then();
}

init.description = 'Writes a nicest configuration file.';

module.exports = init;
