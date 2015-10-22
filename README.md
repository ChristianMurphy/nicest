# nicest

[![npm version](https://img.shields.io/npm/v/nicest.svg)](https://www.npmjs.com/package/nicest)
[![Build Status](https://travis-ci.org/ChristianMurphy/nicest.svg?branch=master)](https://travis-ci.org/ChristianMurphy/nicest)
[![Dependency Status](https://david-dm.org/ChristianMurphy/nicest.svg)](https://david-dm.org/ChristianMurphy/nicest)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/ChristianMurphy/nicest/master/LICENSE)

nicely integrating complex education software together

## Installation
1. Install [Node JS 4](https://nodejs.org/)
2. Install [MongoDb](https://www.mongodb.org/)
3. Run `npm install -g nicest`

## Setup
1. Create a [Github account](https://github.com/) (an existing account can also be used)
2. [Register nicest](https://github.com/settings/applications/new) as an application
  * 'Application Name', 'Homepage URL', and 'Application Description' can be anything
  * 'Authorization callback URL' must be the Host name or IP address of your computer/server
  * E.G. 'Authorization callback URL' could be 'example.com/login', 'localhost:3000/login' or '11.11.11.11/login'
  * After creating the application be sure to copy down the client id and secret token
3. Run `nicest init` to configure nicest
4. Run `nicest admin` to create an admin

## Start
1. Run `nicest start`

### Stop
1. Run `nicest stop`

### Having Issues Starting Nicest?
1. Run `nicest dev`
