#!/usr/bin/env node
'use strict';

// Get options from terminal
const argv = require('yargs')
    .usage('nicest [options]')
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
    .option('host', {
        default: require('os').hostname,
        describe: 'server hostname'
    })
    .help('help')
    .alias('h', 'help')
    .version(require('../package.json').version)
    .alias('v', 'version')
    .argv;

const database = require('../lib/database');
const server = require('../lib/server').setup(argv);

database(argv.database);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
