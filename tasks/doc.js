'use strict';

const npm = require('npm');
const npmPackage = require('../package.json');

/**
 * Turns documentation comments into viewable wep pages.
 * @function doc
 * @returns {Null} nothing
 */
function doc () {
    npm.load(npmPackage, function (err) {
        if (err) {
            console.log(err);
        }
        npm.commands.runScript(['documentation'], function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
}

doc.description = 'Turns documentation comments into viewable web pages.';

module.exports = doc;
