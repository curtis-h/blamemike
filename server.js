var config  = require('./config');
var express = require('express');
var parser  = require('body-parser');

function init(routes) {
    var app = express();
    app.use(parser.json());
    app.use('/api', routes);
    app.listen(config.port);
    console.log('Server running on port '+config.port);
};

exports.init = init;
