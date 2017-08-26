/**
 * @module course/handler/list
 */

const Course = require('../model/course');

/**
 * Lists all courses
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function list(request, reply) {
    Course
        .find({})
        .select('_id name')
        .exec()
        .then((courses) => {
            reply.view('modules/course/view/list', { courses });
        });
}

module.exports = list;
