/* eslint max-nested-callbacks: 0 */
'use strict';
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const beforeEach = lab.beforeEach;
const after = lab.after;
const expect = Code.expect;

const mongoose = require('mongoose');
const server = require('../../../lib/server').setup('test');

describe('Team', () => {
    /*
     * Connect to database when starting tests
     */
    before((done) => {
        mongoose.connect('mongodb://localhost/test', () => {
            done();
        });
    });

    /*
     * Clear all teams before running tests
     */
    beforeEach((done) => {
        mongoose.models.Team
            .find({})
            .remove()
            .exec()
            .then(
                () => {
                    done();
                },
                (error) => {
                    done(error);
                }
            );
    });

    /*
     * Disconnect from database after tests
     */
    after((done) => {
        mongoose.disconnect(() => {
            done();
        });
    });

    describe('#list(request, reply)', () => {
        it('should have an empty list of team ids', (done) => {
            const request = {
                method: 'GET',
                url: '/api/teams'
            };

            server.inject(request, (response) => {
                expect(response.statusCode).to.equal(200);
                expect(response.result).to.be.an.array();
                expect(response.result).to.have.length(0);
                done();
            });
        });
    });

    describe('#create(request, reply)', () => {
        it('should create a new team', (done) => {
            const request = {
                method: 'POST',
                url: '/api/team',
                payload: {
                    name: 'test team',
                    members: [
                        '000000000000000000000000'
                    ],
                    modules: {
                        testModule: 'testing123'
                    }
                }
            };

            server.inject(request, (response) => {
                expect(response.statusCode).to.equal(201);
                expect(response.result.name).to.be.string();
                expect(response.result.members).to.be.array();
                expect(response.result.modules).to.be.an.object();
                done();
            });
        });
    });

    describe('#read(request, reply)', () => {
        it('should error when team does not exist', (done) => {
            const request = {
                method: 'GET',
                url: '/api/team/000000000000000000000000'
            };

            server.inject(request, (response) => {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });

    describe('#update(request, reply)', () => {
        it('should error when team does not exist', (done) => {
            const request = {
                method: 'PUT',
                url: '/api/team/000000000000000000000000'
            };

            server.inject(request, (response) => {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
    });

    describe('#delete(request, reply)', () => {
        it('should be okay when team does not exist', (done) => {
            const request = {
                method: 'DELETE',
                url: '/api/team/000000000000000000000000'
            };

            server.inject(request, (response) => {
                expect(response.statusCode).to.equal(204);
                done();
            });
        });
    });
});
