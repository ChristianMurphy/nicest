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
1. Run `npm run lint`

## Creating a Plugin
Plug-ins are based off the [Hapi JS plug-in system](http://hapijs.com/tutorials/plugins).
Each view can define any of these things
* **model** - data storage or api abstraction shared across plugins.
* **api** - a restful endpoint for plugin
* **view** - a generic template view
* **recipe** - a view specific to setting up learning tools

A plug-in can define any or all of these categories.
The plug-in is served through a `plugin.js` file.
The `plugin.js` file attaches the routes to their appropriate endpoints.

For example this plugin defines an api and a recipe.
``` js
'use strict';
const model = require(...);

/**
 * Registers the Example plugin
 * @param {Object} server - Hapi Server object
 * @param {Object} options - Plugin specific options
 * @param {Fuction} next - Callback to confirm plugin registration
 * @returns {Null} nothing
 */
function example (server, options, next) {
    server.route([
        ...
    ]);

    server.expose(model);

    next();
};

exports.register = example;

exports.register.attributes = {
    pkg: {
        name: 'example',
        version: '0.1.0'
    }
};
```

routes should be defined in a separate file, be exported, and required from the plugin.
The export should either be a valid [Hapi JS route object](http://hapijs.com/tutorials/routing) or an array of route objects.

Plugins use [lout](https://github.com/hapijs/lout) and [JSdoc](https://github.com/jsdoc3/jsdoc) to produce documentation from comments and configuration in the source code.

**Models** should allows wrap async behavior in [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and annotate code with valid JSDoc. Models should be exposed using [Hapi JS's plugin expose method](http://hapijs.com/api#serverexposeobj) .

E.G. a `User` model `let user = {add: function (newUser) {...}}` would register using `server.expose(user);`, other modules would then be able to access the function by calling `server.plugin.user.add()`.

 **Apis** should leverage models for any complex behavior, should validate route parameters using [Joi](https://github.com/hapijs/joi), each route should include [lout](http://hapijs.com/tutorials/routing#config) documentation, and each api should use http verbs appropriately.

 **Views** and **Recipes** should use [Jade](http://jade-lang.com/reference/) for templating, should hide their routes from [lout](https://github.com/hapijs/lout#ignoring-a-route-in-documentation) and should use [Semantic UI](http://semantic-ui.com/) for base styling. Base templates are defined in the `shared-templates` folder that can be extended.

 **Recipes** should define an entry point using the HTTP `GET` verb and the `/recipe/{name}` replacing {name} with the actual name of the recipe. Recipes should have all lowercase names, and separate multiple words with a dash. E.G. `/recipe/user-management`. The entry point should add a `config` attribute with a `description` sub-attribute that should give a short description of the plug-in, this will be shown on the recipe listing. E.G. `config: {description: 'User Management'}`.

 Plug-ins can be loaded by registering the plug-in in `lib/server.js`.
