# Plugins

## About

Nicest plugins are built on [Hapi Plugins](http://hapijs.com/tutorials/plugins).

## Suggested Structure

*   `plugin.js` entry point file of the plugin
*   `model` folder mongoose models.
*   `api` folder for restful endpoints
*   `handler` folder for view business logic
*   `view` folder for view templates

## Example plugin.js

``` js
'use strict';

/**
 * Registers the Example plugin
 * @param {Object} server - Hapi Server object
 * @param {Object} options - Plugin specific options
 * @param {Function} next - Callback to confirm plugin registration
 * @returns {Null} nothing
 */
function example (server, options, next) {
    server.route([
        ...
    ]);

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

## General Notes

Routes should be defined in a separate file, be exported, and required from the plugin.
The export should either be a valid [Hapi JS route object](http://hapijs.com/tutorials/routing)
or an array of route objects.

Plugins use [lout](https://github.com/hapijs/lout) and [JSdoc](https://github.com/jsdoc3/jsdoc)
to produce documentation from comments and configuration in the source code.

**Apis** should leverage models for any complex behavior, should validate route parameters using
[Joi](https://github.com/hapijs/joi), each route should include [lout](http://hapijs.com/tutorials/routing#config)
documentation, and each api should use http verbs appropriately.

**Views** and **Recipes** should use [Pug](http://jade-lang.com/reference/) for templating, should use
[Semantic UI](http://semantic-ui.com/) for base styling. There is a base templates that is defined in the
`shared-templates` folder that can be extended.

**Recipes** should define an entry point using the HTTP `GET` verb and the `/recipe/{name}` replacing {name} with the
actual name of the recipe. Recipes should have all lowercase names, and separate multiple words with a dash. E.G.
`/recipe/user-management`. The entry point should add a `config` attribute with a `description` sub-attribute that
should give a short description of the plug-in, this will be shown on the recipe listing. E.G.
`config: {description: 'User Management'}`.

Plug-ins can be loaded by registering the plug-in in `lib/server.js`.
