/**
 * @module code-project/handler/login-view
 */

/**
 * Allow user to login to Taiga
 * @param {Request} request - Hapi request
 * @param {Reply} reply - Hapi Reply
 * @returns {Null} responds with HTML page
 */
function loginView(request, reply) {
    reply.view('modules/code-project/view/taiga-login');
}

module.exports = loginView;
