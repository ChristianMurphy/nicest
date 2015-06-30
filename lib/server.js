'use strict';

module.exports = function (argv) {
    let defaults;

    if (argv === 'test') {
        defaults = {
            port: 3000,
            database: 'mongodb://localhost/test'
        };
    } else {
        defaults = argv;
    }

    // Setup mongoose
    const mongoose = require('mongoose');
    mongoose.connect(defaults.database);

    // Setup HAPI
    const Hapi = require('hapi');
    const server = new Hapi.Server();

    server.connection({
        port: defaults.port
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
    server.route(require('../modules/user/route'));
    server.route(require('../modules/team/route'));

    return server;
};
