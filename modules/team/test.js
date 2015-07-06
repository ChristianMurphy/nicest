/* eslint max-nested-callbacks: 0 */
'use strict';
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;
const expect = Code.expect;

const mongoose = require('mongoose');
let server;

describe('Team', function () {
    /**
     * Clear all teams before running tests
     */
    before(function (done) {
        server = require('../../lib/server')('test');
        const User = mongoose.models.Team;

        User.remove({}, function (err) {
            if (err) {
                console.log(err);
                return done(err);
            }
            return done();
        });
    });

    /**
     * Disconnect from database after tests
     */
    after(function (done) {
        mongoose.disconnect(function () {
            return done();
        });
    });

    describe('#list(request, reply)', function () {
        it('should have an empty list', function (done) {
            const request = {
                method: 'GET',
                url: '/teams'
            };

            server.inject(request, function (response) {
                expect(response.statusCode).to.equal(200);
                expect(response.result).to.be.an.array();
                expect(response.result).to.have.length(0);
                done();
            });
        });
    });
});
