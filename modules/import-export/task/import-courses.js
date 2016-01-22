'use strict';

const Course = require('../../course/model/course');

/**
 * Adds Courses to Mongoose
 * @param {Object} documentAndMapping - XML document, User ObjectId mappings, and Team ObjectId mappings
 * @returns {Object} XML Document, User ObjectId mapping, and Team ObjectId mapping
 */
function importCourses (documentAndMapping) {
    // find all the teams
    const courses = documentAndMapping.document.find('//course');
    const promises = [];

    // for each team
    for (const currentCourse of courses) {
        // gather all instructors, students and teams for course
        const courseInstructors = currentCourse.find('instructor');
        const courseStudents = currentCourse.find('student');
        const courseTeams = currentCourse.find('group');
        const courseMetadata = {
            name: currentCourse.get('name').text(),
            instructors: [],
            students: [],
            teams: []
        };

        // get each of the instructors' ids
        for (const instructor of courseInstructors) {
            const memberXmlId = instructor.attr('id').value();
            const memberMongoId = documentAndMapping
                .mapping
                .find((element) => {
                    return element.xmlId === memberXmlId;
                })
                .databaseId;

            courseMetadata.instructors.push(memberMongoId);
        }

        // get each of the students' ids
        for (const student of courseStudents) {
            const memberXmlId = student.attr('id').value();
            const memberMongoId = documentAndMapping
                .mapping
                .find((element) => {
                    return element.xmlId === memberXmlId;
                })
                .databaseId;

            courseMetadata.students.push(memberMongoId);
        }

        // get each of the teams' ids
        for (const team of courseTeams) {
            const memberXmlId = team.attr('id').value();
            const memberMongoId = documentAndMapping
                .mapping
                .find((element) => {
                    return element.xmlId === memberXmlId;
                })
                .databaseId;

            courseMetadata.teams.push(memberMongoId);
        }

        // copy the course to Mongoose
        promises.push(
            Course.create(courseMetadata)
        );
    }

    // wait for all courses to be created
    return Promise.all(promises).then(() => {
        return documentAndMapping;
    });
}

module.exports = importCourses;
