'use strict';

/**
 * @module manage-code-project/handler/add-choose-course
 */

const Projects = require('../../code-project/model/project');
const Courses = require('../../course/model/course');

/**
 * Present the view for a user to choose a courses
 * @param {Projects} projects - All projects in Nicest
 * @param {Courses} courses - All courses in Nicest
 * @param {Reply} reply - Hapi reply
 * @returns {Null} responds with HTML page to choose course that student will be added
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

    reply.view('modules/manage-code-project/view/add-choose-course', viewInfo);
}

/**
 * Gets all courses in Nicest
 * @param {Projects} projects - All projects in Nicest
 * @param {Reply} reply - Hapi reply
 * @returns {presentView} calls presentView function
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
 * @param {Reply} reply - Hapi reply
 * @returns {getCourses} calls getCourses function
 */
function getProjects (reply) {
    Projects
        .find({})
        .then((projects) => {
            getCourses(projects, reply);
        });
}

 /**
  * Allows user to select course to add student to
  * @param {Request} request - Hapi request
  * @param {Reply} reply - Hapi Reply
  * @returns {Null} responds with HTML page
  */
function chooseUserCourseAdd (request, reply) {
    getProjects(reply);
}

module.exports = chooseUserCourseAdd;
