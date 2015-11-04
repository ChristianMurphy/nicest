/**
 * @module ConfigureCaDashboard
 */
'use strict';

const mongoose = require('mongoose');

const Members = new mongoose.Schema({
    name: String,
    'github-username': String,
    email: String
});

const project = new mongoose.Schema({
    name: String,
    'github-url': String,
    'taiga-slug': String,
    members: [Members]
});

const connection = mongoose.createConnection('mongodb://localhost/NicestDashboard');

const integration = connection.model('integration', project);

module.exports = function (metaData) {
    integration.collection.insert(metaData, () => {
        return;
    });
};
