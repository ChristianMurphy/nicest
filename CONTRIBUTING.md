# Contributing

## Prerequisites

### Overall
* Familiarity with how to use [Github Pull Requests](https://help.github.com/articles/using-pull-requests/).
* Knowledge of [Markdown](https://help.github.com/articles/markdown-basics/) for editing `.md` documents

### For Code Contributors
* Familiarity with [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* Knowledge of [Node JS](https://nodejs.org/documentation/) and [NPM](https://docs.npmjs.com/)

## Pull Requests
* Code in pull requests must have Mocha unit tests

## Running Nicest Locally
### Run Developer Application
1. Run `node bin/cli` and add `--help` flag to see all the available options

### Test the Application
1. Run `npm test`

### API Documentation
1. Start app
2. Follow `Documentation` link printed on app startup

## Architecture
### Core
Core is a Hapi application, that uses Mongoose to manage storage.
It hosts the modules and recipes.

### Core Modules
The User, Project, Course and Team modules are the building block for other modules.
Each of these offer a special `module` field in their Mongoose schema.
Any module can write to its own property in the `module` field to store custom information.

### Modules
Modules server as connectors and abstractions to external services.
Each module exposes a restful API, that recipes can interact with.

### Recipes
Recipes use the API's provided by modules to connect services together.
For example a `generate random teams` recipe could read all the `User`s from a `Course` to create arbitrarily sized `Team`s.
