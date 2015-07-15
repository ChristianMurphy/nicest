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
1. Run `npm link` in the nicest folder
2. Run `nicest` from anywhere

### Test the Application
1. Run `npm test`

## Creating a Plugin
Plugins are based off the [Hapi JS plugin system](http://hapijs.com/tutorials/plugins).
Each view can define any of these things
* **model** - data storage or api abstraction shared across plugins.
* **api** - a restful endpoint for plugin
* **view** - a generic template view
* **recipe** - a view specific to setting up learning tools
* **assessment** - a view specific to gauging student progress

A plugin can define any or all of these categories.
The plugin is served through a `plugin.js` file.
The `plugin.js` file attaches the routes to their appropriate endpoints.

For example this plugin defines an api and a recipe.
``` js
'use strict';

module.exports.register = function (server, options, next) {
    const api = server.select('api');
    const recipe = server.select('recipe');
    const model = require(...);

    api.route(
        ...
    );

    recipe.route(
        ...
    );

    server.method('ModelName.functionName', model.functionName);

    next();
};

module.exports.register.attributes = {
    pkg: {
        name: 'my plugin',
        version: '0.1.0'
    }
};
```
**api**, **view**, **recipe** and **assessment** each have their own server module and should be registered to their specific module using `server.select()`.

routes should be defined in a separate file, be exported, and required from the plugin.
The export should either be a valid [Hapi JS route object](http://hapijs.com/tutorials/routing) or an array of route objects.

Plugins use [lout](https://github.com/hapijs/lout) and [JSdoc](https://github.com/jsdoc3/jsdoc) to produce documentation from comments and configuration in the source code.

**Models** should allows wrap async behavior in [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and annotate code with valid JSDoc. Each public function that the Model exposes should be registered as a server method so that other Modules can access them.

E.G. a `User` model wanting to expose an `add` function would register `server.method('User.add', user.add);`, other modules would then be able to access the function by calling `server.method.User.add()`.

 **Apis** should leverage models for any complex behavior, should validate route parameters using [Joi](https://github.com/hapijs/joi), each route should include [lout](http://hapijs.com/tutorials/routing#config) documentation, and each api should use http verbs appropriately.

 **Views**, **Recipes** and **Assessments** should use [Jade](http://jade-lang.com/reference/) for templating, should hide their routes from [lout](https://github.com/hapijs/lout#ignoring-a-route-in-documentation) and should use [Semantic UI](http://semantic-ui.com/) for base styling. Base templates are defined in the `shared-templates` folder that can be extended.

 Plugins can be loaded by registering the plugin in `lib/server.js`.
