#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const ui = require('cliui')();

const nicestInit = require('../tasks/init');
const nicestUser = require('../tasks/user');
const nicestStart = require('../tasks/start');
const nicestStop = require('../tasks/stop');
const nicestDev = require('../tasks/dev');

const commandLocation = 2;
const command = process.argv[commandLocation];

const tasks = [
    nicestInit,
    nicestUser,
    nicestStart,
    nicestStop,
    nicestDev
];

const selectedTask = tasks.find((element) => element.name === command);

if (selectedTask) {
    selectedTask();
} else {
    ui.div({
        padding: [1, 0, 1, 0],
        text: chalk.bold('Nicest Command Line Interface')
    });
    ui.div({
        padding: [0, 0, 1, 0],
        text: `${chalk.bold('usage:')} nicest <command>`
    });
    ui.div({
        padding: [0, 0, 1, 0],
        text: chalk.bold('commands')
    });

    for (const task of tasks) {
        ui.div(
            {
                padding: [0, 4, 0, 4],
                text: task.name
            },
            {
                text: task.description,
                width: 60
            }
        );
    }

    console.log(ui.toString());
}
