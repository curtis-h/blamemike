var db = require('../database');
var fs = require('fs-extra');

exports.save = function(file) {
    console.log('saveing'+file.name);
    
    /*
     * TODO
     * save to DB
     * randomize file name
     * add validation
     */
    
    /* Temporary location of our uploaded file */
    var temp_path = file.path;
    /* The file name of the uploaded file */
    var file_name = file.name;
    /* Location where we want to copy the uploaded file */
    var new_location = 'uploads/';

    fs.copy(temp_path, new_location + file_name, function(err) {
        if (err) {
            console.log('upload fail');
            console.error(err);
        }
        else {
            console.log("upload success!");
        }
    });
};