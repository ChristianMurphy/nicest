#!/usr/bin/env node
'use strict';

// Get options from terminal
const argv = require('yargs')
    .usage('node app [options]')
    .option('p', {
        alias: 'port',
        default: 3000,
        describe: 'port to run server on'
    })
    .option('db', {
        alias: 'database',
        default: 'mongodb://localhost/nicest',
        describe: 'mongo database connection'
    })
    .help('help')
    .alias('h', 'help')
    .version(require('./package.json').version)
    .alias('v', 'version')
    .argv;

const server = require('./server')(argv);

server.start(function () {
    console.log('Server running at:', server.info.uri);
    console.log('Documentation:', server.info.uri + '/docs');
});
