/**
 * @module code-project/handler/choose-course
 */

const Course = require('../../course/model/course');

/**
 * View to allow instructor to select course for project
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function chooseCourse(request, reply) {
    Course
        .find({})
        .then((courses) => {
            reply.view('modules/code-project/view/choose-course', { courses });
        });
}

module.exports = chooseCourse;
