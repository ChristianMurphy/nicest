/* eslint-env mocha */
/* eslint max-nested-callbacks: 0 */
'use strict';
const expect = require('chai').expect;
const mongoose = require('mongoose');
const server = require('../../lib/server')('test');

describe('User', function () {
    /**
     * Clear all users before running each test
     */
    beforeEach(function (done) {
        const User = mongoose.models.User;

        User.remove({}, function (err) {
            if (err) {
                console.log(err);
                return done(err);
            }
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
                expect(response.result).to.be.an.instanceof(Array);
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
                    username: 'test user',
                    modules: {
                        testModule: 'testing123'
                    }
                }
            };

            server.inject(request, function (response) {
                expect(response.statusCode).to.equal(201);
                expect(response.result).to.be.an.instanceof(Object);
                expect(response.result).to.have.property('username');
                expect(response.result.username).to.be.a('string');
                expect(response.result).to.have.property('modules');
                expect(response.result.modules).to.be.a('object');
                done();
            });
        });
    });

    describe('#get(request, reply)', function () {
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

    describe('#put(request, reply)', function () {
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
