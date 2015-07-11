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

describe('User', function () {
    /*
     * Clear all users before running tests
     */
    before(function (done) {
        server = require('../../../lib/server')('test');

        mongoose.models.User
            .find({})
            .remove()
            .exec()
            .then(
                function () {
                    done();
                },
                function (error) {
                    done(error);
                }
            );
    });

    /*
     * Disconnect from database after tests
     */
    after(function (done) {
        mongoose.disconnect(function () {
            return done();
        });
    });

    describe('#list(request, reply)', function () {
        it('should have an empty list of user ids', function (done) {
            const request = {
                method: 'GET',
                url: '/api/users'
            };

            server.inject(request, function (response) {
                expect(response.statusCode).to.equal(200);
                expect(response.result).to.be.an.array();
                expect(response.result).to.have.length(0);
                done();
            });
        });
    });

    describe('#create(request, reply)', function () {
        it('should create a new user', function (done) {
            const request = {
                method: 'POST',
                url: '/api/user',
                payload: {
                    name: 'test user',
                    modules: {
                        testModule: 'testing123'
                    }
                }
            };

            server.inject(request, function (response) {
                expect(response.statusCode).to.equal(201);
                expect(response.result.name).to.be.string();
                expect(response.result.modules).to.be.an.object();
                done();
            });
        });
    });

    describe('#read(request, reply)', function () {
        it('should error when user does not exist', function (done) {
            const request = {
                method: 'GET',
                url: '/api/user/000000000000000000000000'
            };

            server.inject(request, function (response) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });

    describe('#update(request, reply)', function () {
        it('should error when user does not exist', function (done) {
            const request = {
                method: 'PUT',
                url: '/api/user/000000000000000000000000'
            };

            server.inject(request, function (response) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });

    describe('#delete(request, reply)', function () {
        it('should be okay when user does not exist', function (done) {
            const request = {
                method: 'DELETE',
                url: '/api/user/000000000000000000000000'
            };

            server.inject(request, function (response) {
                expect(response.statusCode).to.equal(204);
                done();
            });
        });
    });
});
