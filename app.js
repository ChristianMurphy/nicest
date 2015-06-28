'use strict';

// Get options from terminal
const argv = require('yargs')
    .usage('node app [options]')
    .option('p', {
        alias: 'port',
        default: 3000,
        describe: 'port to run server on'
    })
    .help('help')
    .argv;

// Setup HAPI
const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
    port: argv.port
});

// Api Documentation Service
server.register({
        register: require('lout')
    },
    function (err) {
        if (err) {
            console.log(err);
        }
    }
);

// Load modules
server.route(require('./modules/user/route'));
server.route(require('./modules/team/route'));

// Start server
server.start(function () {
    console.log('Server running at:', server.info.uri);
    console.log('Documentation:', server.info.uri + '/docs');
});
