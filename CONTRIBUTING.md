# Contributing

## Issue

1. Check that the issue has not already been reported ([search here](https://github.com/ChristianMurphy/nicest/issues)).
2. Document the steps that were followed that resulted in an error.
3. Document any error messages that were printed in the server log (`nicest dev` or `pm2 logs`).
4. Document any error messages that were printed in the browser log. ([chrome](https://developers.google.com/web/tools/chrome-devtools/debug/console/console-ui), [firefox](https://www.mozilla.org/en-US/firefox/developer/), [edge](https://dev.windows.com/en-us/microsoft-edge/platform/documentation/f12-devtools-guide/console/)).
5. Ensure any error messages or code snippets are noted with a [fenced code block](https://help.github.com/articles/github-flavored-markdown/#fenced-code-blocks).
6. Screenshots for UI errors are helpful.

## Pull Request

1. Commit code and open a [Pull Request](https://help.github.com/articles/using-pull-requests/)

2. Ensure that code passes tests

   * Test results are reported to [PR status](https://github.com/blog/1935-see-results-from-all-pull-request-status-checks)
   * Tests can be run locally using `npm run lint`

3. Get a code review

   * Reviewers are listed in `.pullapprove.yml`
   * A reviewer can approve a PR by writing a comment starting with `:+1:`, `LGTM`, or `:shipit:`
   * A review can reject a PR by writing a comment starting with `:-1:`

4. Merge

   * Any team member can merge an approved pull request
   * Your code is now part of the project :smile:

## Developer Installation

1. Install [Node JS](https://nodejs.org/)
2. Install [Mongo Db](https://www.mongodb.org/)
3. Install [Node Gyp](https://github.com/nodejs/node-gyp#installation) dependencies
4. Install [Git](https://git-scm.com/)
5. Open a Terminal or Command Line
6. Run `git clone https://github.com/ChristianMurphy/nicest`
7. Open folder `cd nicest`
8. Install and Link `npm link .`
9. [Setup Nicest](README.md#setup)

## How-To

* [Use Git](https://git-scm.com/doc)
* [Use Github Pull Requests](https://help.github.com/articles/using-pull-requests/)
* [Use Javascript](http://www.w3schools.com/js/)
* [Use Node JS](https://nodejs.org/api/documentation.html)
* [Use NPM](https://docs.npmjs.com/)
* [Use Hapi](http://hapijs.com/tutorials)
* [Use ESLint](http://eslint.org)
* [Use Markdown](https://help.github.com/articles/markdown-basics/)
