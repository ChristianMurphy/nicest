/**
 * @module core/tasks/init
 */

/**
 * Writes a server configuration file.
 * @returns {Null} nothing
 */
function init() {
    // eslint-disable-next-line global-require
    const path = require('path');
    // eslint-disable-next-line global-require
    const chalk = require('chalk');
    // eslint-disable-next-line global-require
    const read = require('./helpers/read-promise');
    // eslint-disable-next-line global-require
    const writeFile = require('./helpers/write-file-promise');

    const config = {};

    console.log(chalk.bold('\nNicest Setup Wizard\n'));
    console.log('This utility will walk you through creating a nicest.json file.\n');
    console.log('It only covers the most common items, and tries to guess sensible defaults.\n');
    console.log(chalk.bold('configuration for the nicest server\n'));

    read({
        default: 'localhost',
        prompt: 'hostname:',
    })
        .then((serverHostname) => {
            config.server = {};
            config.server.hostname = serverHostname;

            return read({
                default: 80,
                prompt: 'port number:',
            });
        })
        .then((serverPort) => {
            config.server.port = parseInt(serverPort, 10);

            return read({
                default: '',
                prompt: 'url prefix: ()',
            });
        })
        .then((prefix) => {
            config.server.prefix = prefix;

            console.log(chalk.bold('\nconfiguration for nicest database\n'));

            return read({
                default: 'localhost',
                prompt: 'hostname:',
            });
        })
        .then((databaseHostname) => {
            config.database = {};
            config.database.hostname = databaseHostname;

            return read({
                default: 'nicest',
                prompt: 'database name:',
            });
        })
        .then((databaseName) => {
            config.database.name = databaseName;

            return read({
                default: 27017,
                prompt: 'database port:',
            });
        })
        .then((databasePort) => {
            config.database.port = parseInt(databasePort, 10);

            console.log(chalk.bold('\nconfiguration for nicest security and authentication\n'));

            return read({
                default: 'AReallyReallyLongSuperSecretEncryptionToken',
                prompt: 'cookie encryption token:',
            });
        })
        .then((authenticationSecret) => {
            config.authentication = {};
            config.authentication.token = authenticationSecret;

            return read({
                default: 'false',
                prompt: 'is there an https proxy?:',
            });
        })
        .then((authenticationHttpsProxy) => {
            config.authentication.https = authenticationHttpsProxy === 'true';

            return read({ prompt: 'Github Client ID:' });
        })
        .then((authenticationGithubClientId) => {
            config.authentication.github = {};
            config.authentication.github.client = authenticationGithubClientId;

            return read({ prompt: 'Github Client Secret:' });
        })
        .then((authenticationGithubClientSecret) => {
            config.authentication.github.secret = authenticationGithubClientSecret;
            const jsonIndent = 2;

            writeFile(path.resolve(__dirname, '..', 'nicest.json'), JSON.stringify(config, null, jsonIndent));
        })
        .catch(console.error);
}

init.description = 'Writes a nicest configuration file.';

module.exports = init;
