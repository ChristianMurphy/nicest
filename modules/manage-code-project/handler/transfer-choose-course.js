'use strict';

/**
 * @module manage-code-project/handler/transfer-choose-course
 */

const Projects = require('../../code-project/model/project');
const Courses = require('../../course/model/course');

/**
 * Present a view where user can select course
 * @param {Projects} projects - metadata for all projects
 * @param {Courses} courses - metadata for courses
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function presentView (projects, courses, reply) {
    const courseWithProjects = [];

    projects.forEach((project) => {
        let index = 0;

        while (index < courses.length) {
            const projectCourseID = JSON.stringify(project.course);

            const courseID = JSON.stringify(courses[index]._id);

            if (projectCourseID === courseID) {
                if (courseWithProjects.indexOf(courses[index]) === -1) {
                    courseWithProjects.push(courses[index]);
                }
            }
            index += 1;
        }
    });

    const viewInfo = {courses: courseWithProjects};

    reply.view('modules/manage-code-project/view/transfer-choose-course', viewInfo);
}

/**
 * Gets all courses in Nicest
 * @param {Projects} projects - all projects in Nicest
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} calls presentView function
 */
function getCourses (projects, reply) {
    Courses
        .find({})
        .then((courses) => {
            presentView(projects, courses, reply);
        });
}

/**
 * Gets all projects in Nicest
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} calls getCourses function
 */
function getProjects (reply) {
    Projects
        .find({})
        .then((projects) => {
            getCourses(projects, reply);
        });
}


 /**
  * Allows user to select a course to transfer a user in
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {Null} responds with HTML page
  */
function chooseUserCourseTransfer (request, reply) {
    getProjects(reply);
}

module.exports = chooseUserCourseTransfer;
