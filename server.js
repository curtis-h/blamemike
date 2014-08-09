var config  = require('./config');
var express = require('express');
var parser  = require('body-parser');

function init() {
    var app  = express();
    var api  = require('./routes/api');
    var base = require('./routes/base');
    
    app.use(parser.json());
    app.use('/api', api);
    app.use('/', base);
    app.listen(config.port);
    console.log('Server running on port '+config.port);
};

exports.init = init;