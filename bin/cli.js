#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const ui = require('cliui')();

const nicestInit = require('../tasks/init');
const nicestUser = require('../tasks/user');
const nicestStart = require('../tasks/start');
const nicestStop = require('../tasks/stop');
const nicestDev = require('../tasks/dev');
const nicestDoc = require('../tasks/doc');
const nicestLint = require('../tasks/lint');

const commandLocation = 2;
const command = process.argv[commandLocation];

const tasks = [
    nicestInit,
    nicestUser,
    nicestStart,
    nicestStop,
    nicestDev,
    nicestDoc,
    nicestLint
];

const selectedTask = tasks.find((element) => {
    return element.name === command;
});

if (selectedTask) {
    selectedTask();
} else {
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

    for (const task of tasks) {
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
    }

    console.log(ui.toString());
}
