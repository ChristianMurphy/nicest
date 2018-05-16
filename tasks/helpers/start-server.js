'use strict';

const database = require('../../lib/database');
const nicest = require('../../lib/server');
const configuration = require('../../nicest.json');

module.exports = async () => {
    try {
        await database(configuration);
    } catch (err) {
        console.error(err);
    }

    const server = await nicest(configuration);

    await server.start();
};

if (require.main === module) {
    module.exports();
}
