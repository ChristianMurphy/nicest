'use strict';

const boom = require('boom');
const mongoose = require('mongoose');
const _ = require('lodash');
const schema = require('./schema');

// create team model from schema
const Team = mongoose.model('Team', schema);

module.exports = {
    list: function (request, reply) {
        Team
            .find({})
            .select('_id')
            .exec(function (err, userids) {
                if (err) {
                    reply(boom.notFound('not found'));
                } else {
                    reply(_.pluck(userids, '_id'));
                }
            });
    }
};
