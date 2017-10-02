/**
 * @module recipe/handler/list
 */

const Recipe = require('../model/recipe');

/**
 * Displays a list of all the Recipe plugins
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function list(request, reply) {
    reply.view('modules/recipe/view/list', { recipes: Recipe.list() });
}

module.exports = list;
