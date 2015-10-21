#!/usr/bin/env node
'use strict';

const _ = require('lodash');
const chalk = require('chalk');
const ui = require('cliui')();

const nicestInit = require('../tasks/init');
const nicestStart = require('../tasks/start');
const nicestStop = require('../tasks/stop');
const nicestDoc = require('../tasks/doc');
const nicestDev = require('../tasks/dev');
const nicestLint = require('../tasks/lint');

const command = process.argv.slice(2)[0];

const tasks = [
    nicestInit,
    nicestStart,
    nicestStop,
    nicestDoc,
    nicestDev,
    nicestLint
];

const task = _.find(tasks, function (task) {
    return task.name === command;
});

if (typeof task === 'undefined') {
    ui.div({
        text: chalk.bold('Nicest Command Line Interface'),
        padding: [1, 0, 1, 0]
    });
    ui.div({
        text: `${chalk.bold('usage:')} nicest <command>`,
        padding: [0, 0, 1, 0]
    });
    ui.div({
        text: chalk.bold('commands'),
        padding: [0, 0, 1, 0]
    });

    _.forEach(tasks, function (task) {
        ui.div(
            {
                text: task.name,
                padding: [0, 4, 0, 4]
            },
            {
                text: task.description,
                width: 60
            }
        );
    });

    console.log(ui.toString());
} else {
    task();
}
