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

## Architecture
### Core
Core is a Hapi application.
Hapi hosts the API's, recipes, assessments and documentation.
