var express = require('express');
var parser  = require('body-parser');

function init(routes) {
    var app = express();
    app.use(parser.json());
    app.use('/api', routes);
    app.listen('80');
    console.log('Server running on port 80');
};

exports.init = init;
