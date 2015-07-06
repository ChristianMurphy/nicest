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
    /**
     * Clear all users before running tests
     */
    before(function (done) {
        server = require('../../lib/server')('test');
        const User = mongoose.models.User;

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
        it('should have an empty list of user ids', function (done) {
            const request = {
                method: 'GET',
                url: '/users'
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
                url: '/user',
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
                url: '/user/42'
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
                url: '/user/42'
            };

            server.inject(request, function (response) {
                expect(response.statusCode).to.equal(400);
                done();
            });
        });
    });

    describe('#delete(request, reply)', function () {
        it('should be okay when user does not exist', function (done) {
            const request = {
                method: 'DELETE',
                url: '/user/42'
            };

            server.inject(request, function (response) {
                expect(response.statusCode).to.equal(204);
                done();
            });
        });
    });
});
