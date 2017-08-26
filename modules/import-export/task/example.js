const fs = require('fs');
const path = require('path');

module.exports.xmlSchema = fs.readFileSync(path.join(__dirname, '..', 'xml', 'schema.xsd'), 'utf-8');
module.exports.xml = fs.readFileSync(path.join(__dirname, '..', 'xml', 'example.xml'), 'utf-8');
