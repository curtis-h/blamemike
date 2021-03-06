var config  = require('./config');
var express = require('express');
var parser  = require('body-parser');

function init() {
    var app  = express();
    var api  = require('./routes/api');
    
    app.use(parser.json());
    app.use('/memes', api);
    app.use('/', express.static(__dirname+'/public'));
    app.listen(config.port);
    console.log('Server running on port '+config.port);
};

exports.init = init;