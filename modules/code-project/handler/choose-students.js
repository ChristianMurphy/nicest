'use strict';

/**
 * @module code-project/handler
 */

const Course = require('../../course/model/course');
const User = require('../../user/model/user');
const Team = require('../../team/model/team');

/**
 * View to allow instructor to select students or teams for a project
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function chooseStudents (request, reply) {
    if (request.query.type === 'team' && request.query.course) {
        request.yar.set({
            'code-project-student-type': 'team'
        });
        Promise.all([
            Course
                .find({})
                .select('_id name')
                .exec(),
            Course
                .findOne({
                    _id: request.query.course
                })
                .select('teams')
                .populate('teams')
                .exec()
        ])
        .then((data) => {
            const courseIndex = 0;
            const teamIndex = 1;
            const courses = data[courseIndex];
            const teams = data[teamIndex].teams;

            reply.view('modules/code-project/view/choose-students', {
                courses,
                list: teams,
                listType: 'team'
            });
        });
    } else if (request.query.type === 'team') {
        request.yar.set({
            'code-project-student-type': 'individual'
        });
        Promise.all([
            Course
                .find({})
                .select('_id name')
                .exec(),
            Team
                .find({})
                .select('_id name')
                .exec()
        ])
        .then((data) => {
            const courseIndex = 0;
            const teamIndex = 1;
            const courses = data[courseIndex];
            const teams = data[teamIndex];

            reply.view('modules/code-project/view/choose-students', {
                courses,
                list: teams,
                listType: 'team'
            });
        });
    } else if (request.query.type === 'individual' && request.query.course) {
        Promise.all([
            Course
                .find({})
                .select('_id name')
                .exec(),
            Course
                .findOne({
                    _id: request.query.course
                })
                .select('students')
                .populate('students')
                .exec()
        ])
        .then((data) => {
            const courseIndex = 0;
            const userIndex = 1;
            const courses = data[courseIndex];
            const users = data[userIndex].students;

            reply.view('modules/code-project/view/choose-students', {
                courses,
                list: users,
                listType: 'individual'
            });
        });
    } else {
        request.yar.set({
            'code-project-student-type': 'indvidual'
        });
        Promise.all([
            Course
                .find({})
                .select('_id name')
                .exec(),
            User
                .find({})
                .select('_id name')
                .exec()
        ])
        .then((data) => {
            const courseIndex = 0;
            const userIndex = 1;
            const courses = data[courseIndex];
            const users = data[userIndex];

            reply.view('modules/code-project/view/choose-students', {
                courses,
                list: users,
                listType: 'individual'
            });
        });
    }
}

module.exports = chooseStudents;
